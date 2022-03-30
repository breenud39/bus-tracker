// importing gql from the Apollo
const { gql } = require("apollo-server-express");

// The GraphQL schema
const typeDefs = gql`
type BusRoot {
  _id: ID
  name: String
}
type BuyTicket {
  _id: ID
  name: String
  price: Float
  busRoot: BusRoot
}
type Order {
  _id: ID
  purchaseDate: String
  buyTickets: [BuyTicket]
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
  buyTickets(busRoot: ID, root: Int): [BuyTicket]
  buyTicket(_id: ID!): BuyTicket
  user: User
  order(_id: ID!): Order
  checkout(buyTicket: [ID]!): Checkout
}
type Mutation {
  addUser(name: String!, email: String!, password: String!): Auth
  addOrder(buyTickets: [ID]!): Order
  updateUser(name: String, email: String, password: String): User
  updateBuyTicket(_id: ID!, quantity: Int!): BuyTicket
  login(email: String!, password: String!): Auth
}
  
type Checkout {
    session: ID
  }
`;
// export the typeDefs
module.exports = typeDefs;