// importing gql from the Apollo
const { gql } = require("apollo-server-express");

// The GraphQL schema
const typeDefs = gql`
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
module.exports = typeDefs;