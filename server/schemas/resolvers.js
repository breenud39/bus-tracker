const { AuthenticationError } = require('apollo-server-express');
const { User, TripPlanner, BusRoot, BuyTicket} = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    tripPlanner: async () => {
      return await TripPlanner.find();
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'buyTicket.userSavedBusRoute',
          populate: 'tripPlanner'
        });

        user.buyTicket.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    /*userSavedBusRoute: async (parent, { trip, origin, destination }) => {
      const params = {};

      if (trip) {
        params.origin = origin;
        params.destination = destination;
      }

      /*if (name) {
        params.name = {
          $regex: name
        };
      }*/

     /* return await BusRoot.find(params).populate('trip');
    },*/
    busRoot: async (parent, { _id }) => {
      return await BusRoot.findById(_id).populate('trip');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'buyTicket.busRoot',
          populate: 'trip'
        });

        user.buyTicket.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    buyTicket: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'buyTicket.busRoot',
          populate: 'trip'
        });

        return user.buyTicket.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    }
  },

  /*checkout: async (parent, args, context) => {
    const url = new URL(context.headers.referer).origin;
    const buyTicket = new BuyTicket({ busRoot: args.busRoot });
    const line_items = [];

    const { busRoot } = await buyTicket.populate('busRoot').execPopulate();

    for (let i = 0; i < busRoot.length; i++) {
      const busRoot = await stripe.busRoot.create({
        name: busRoot[i].name,
       // description: products[i].description,
       // images: [`${url}/images/${products[i].image}`]
      });

      const price = await stripe.prices.create({
        busRoot: buyTicket.id,
        unit_amount: buyTicket[i].price * 100,
        currency: 'cad',
      });

      line_items.push({
        price: price.id,
        quantity: 1
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/`
    });

    return { session: session.id };
  
},*/
checkout: async (parent, args, context) => {
      // parse out referring URL
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ buyTickets: args.buyTickets });
      const { buyTickets } = await order.populate('buyTicket').execPopulate();

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
          currency: 'usd',
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
    
    
  },
Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addTrip: async (parent, { tripPlanner }, context) => {
      console.log(context);
      if (context.user) {
        const trip = new TripPlanner({ tripPlanner });

        await User.findByIdAndUpdate(context.user._id, { $push: { trip: tripPlanner } });

        return trip;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateTrip: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await TripPlanner.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
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
