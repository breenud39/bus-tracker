const { AuthenticationError } = require('apollo-server-express');
const { User, BuyTicket, BusRoot, Order } = require('../models');
const { signToken } = require('../utils/auth');

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    busRoots: async () => {
      return await BusRoot.find();
    },
    buyTicket: async (parent, { busRoot, number }) => {
      const params = {};

      if (busRoot) {
        params.busRoot = busRoot;
      }

      if (number) {
        params.number = {
          $regex: number
        };
      }

      return await BuyTicket.find(params).populate('busRoot');
    },
    buyTicket: async (parent, { _id }) => {
      return await BuyTicket.findById(_id).populate('busRoot');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.buyTickets',
          populate: 'busRoot'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.buyTickets',
          populate: 'busRoot'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    // stripe checkout query
    checkout: async (parent, args, context) => {
      // parse out referring URL
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ buyTickets: args.buyTickets });
      const { buyTickets } = await order.populate('buyTickets').execPopulate();

      const line_items = [];

      for (let i = 0; i < buyTickets.length; i++) {
        // generate product id
        const buyTicket = await stripe.buyTickets.create({
          name: buyTickets[i].name,
          description: buyTickets[i].description,
          /*
          Because we have access to the referring URL, 
          we can also provide an image thumbnail when 
          creating the product ID.
          This is to pass the images to the stripe products array
          */
          images: [`${url}/images/${buyTickets[i].image}`]
        });

        // generate price id using the product id
        const price = await stripe.prices.create({
            buyTicket: buyTicket.id,
          // multiple by 100 since price ammount is in cents
          unit_amount: buyTickets[i].price * 100,
          currency: 'cad',
        });

        // add price id to the line items array
        // why is qty 1 here?
        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      /*
      Line itmes array will be used to generate a Stripe
      checkout session.
      The checkout session ID is the only data the resolver needs,
      so we can return it
      */
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });
      
      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { buyTickets }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ buyTickets });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateBuyTicket: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await BuyTicket.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
