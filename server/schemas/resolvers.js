const { AuthenticationError } = require('apollo-server-express');
<<<<<<< HEAD
<<<<<<< HEAD
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
=======
const { User, buyTicket, busRoot, Order } = require('../models');
const { signToken } = require('../utils/auth');

=======
const { User, buyTicket, busRoot, Order } = require('../models');
const { signToken } = require('../utils/auth');

>>>>>>> 61154fa (add authn and buy ticket)
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await busRoot.find();
<<<<<<< HEAD
    },
    buyTicket: async (parent, { busRoot, name }) => {
      const params = {};

      if (busRoot) {
        params.busRoot = busRoot;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await buyTicket.find(params).populate('busRoot');
    },
    buyTicket: async (parent, { _id }) => {
      return await buyTicket.findById(_id).populate('busRoot');
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
>>>>>>> 61154fa (add authn and buy ticket)
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
<<<<<<< HEAD
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products').execPopulate();

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

=======
    // stripe checkout query
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
>>>>>>> 61154fa (add authn and buy ticket)
        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

<<<<<<< HEAD
=======
      /*
      Line itmes array will be used to generate a Stripe
      checkout session.
      The checkout session ID is the only data the resolver needs,
      so we can return it
      */
>>>>>>> 61154fa (add authn and buy ticket)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });
<<<<<<< HEAD

=======
      
>>>>>>> 61154fa (add authn and buy ticket)
      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
<<<<<<< HEAD
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });
=======
=======
    },
    buyTicket: async (parent, { busRoot, name }) => {
      const params = {};

      if (busRoot) {
        params.busRoot = busRoot;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await buyTicket.find(params).populate('busRoot');
    },
    buyTicket: async (parent, { _id }) => {
      return await buyTicket.findById(_id).populate('busRoot');
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
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
>>>>>>> 61154fa (add authn and buy ticket)
    addOrder: async (parent, { buyTickets }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ buyTickets });
<<<<<<< HEAD
>>>>>>> 61154fa (add authn and buy ticket)
=======
>>>>>>> 61154fa (add authn and buy ticket)

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
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
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
