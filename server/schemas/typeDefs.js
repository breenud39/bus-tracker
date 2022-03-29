<<<<<<< HEAD
<<<<<<< HEAD
const { gql } = require('apollo-server-express');
=======
// importing gql from the Apollo
const { gql } = require("apollo-server-express");
>>>>>>> 61154fa (add authn and buy ticket)
=======
// importing gql from the Apollo
const { gql } = require("apollo-server-express");
>>>>>>> 61154fa (add authn and buy ticket)

const typeDefs = gql`
<<<<<<< HEAD
<<<<<<< HEAD
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
=======
=======
>>>>>>> 61154fa (add authn and buy ticket)
type busRoot {
  _id: ID
  name: String
}
type buyTicket {
  _id: ID
  name: String
  description: String
  image: String
  quantity: Int
  price: Float
  busRoot: BusRoot
}
type Order {
  _id: ID
  purchaseDate: String
  busTicket: [BusTicket]
}
type User {
  _id: ID
  name: String
  email: String
  orders: [Order]
}
type Auth {
  token: ID
  user: User
}
type Query {
  busRoots: [BusRoot]
  buyTickets(busRoot: ID, name: Int): [BusTicket]
  busTicket(_id: ID!): PbusTicket
  user: User
  order(_id: ID!): Order
  checkout(busTicketss: [ID]!): Checkout
}
type Mutation {
  addUser(name: String!, email: String!, password: String!): Auth
  addOrder(buyTickets: [ID]!): Order
  updateUser(name: String, email: String, password: String): User
  updatebuyTicket(_id: ID!, quantity: Int!): BuyTicket
  login(email: String!, password: String!): Auth
}

  
`;
// export the typeDefs
<<<<<<< HEAD
module.exports = typeDefs;
>>>>>>> 61154fa (add authn and buy ticket)
=======
module.exports = typeDefs;
>>>>>>> 61154fa (add authn and buy ticket)
