const db = require('./connection');
const { User, BuyTicket, BusRoot } = require('../models');

db.once('open', async () => {
  await BusRoot.deleteMany();

  const busRoots = await BusRoot.insertMany([
    { name: '5' },
    { name: '2' },
    { name: '9' },
    { name: '3' },
    { name: '1' }
  ]);

  console.log('busRoots seeded');

  await BuyTicket.deleteMany();

  const buyTickets = await BuyTicket.insertMany([
    {
    name: 'Online ticket ',
    price: 2.99,
    busRoot: busRoots[0]._id, 
    },
    {
    name: 'Online ticket',
    price: 3.99,
    busRoot: busRoots[0]._id,
    },
    {
     name: 'Online ticket',
     price: 2.49,
     busRoot: busRoots[1]._id,
    },
    {
    name: 'Online ticket',
    price: 2.79,
    busRoot: busRoots[2]._id, 
    },
    {
     name: 'Online ticket',
     price: 2.49,
     busRoot: busRoots[2]._id,
    },
    {
     name: 'Online ticket',
     price: 2.49,
     busRoot: busRoots[3]._id,
    },
    {
     name: 'Online ticket',
     price: 2.79,
     busRoot: busRoots[4]._id,
    },
    {
      name: 'Online ticket',
      price: 2.49,
      busRoot: busRoots[1]._id,
     
    },
    {
      name: 'Online ticket',
      price: 2.49,
      busRoot: busRoots[3]._id,
     
    }
   
   
  ]);

  console.log('buyTickets seeded');

  await User.deleteMany();

  await User.create({
    name: 'Jhon Doe',
    email: 'jhon@testmail.com',
    password: 'password12345',
    orders: [
      {
       buyTickets: [buyTickets[0]._id,buyTickets[0]._id, buyTickets[1]._id]
      }
    ]
  });

  await User.create({
    name: 'Tim Black',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});