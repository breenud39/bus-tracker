const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User{
username: String
email:String
password:String
}

  type TripPlanner {
    user:User
    name: String
  }

  type BusRoot {
    BusNumber: String
    BusId: Int
    Stops: String
    buyTicket: [BuyTicket]
    tripPlanner:[TripPlanner]  
  }

  type BuyTicket {
    quantity: Int
    price:Int
    busRoot: [BusRoot]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    tripPlanner: [TripPlanner]
    busRoot: [BusRoot]
    buyTicket: BuyTicket
    user: User
    checkout(buyTicket: [ID]!): Checkout
  }

  type Mutation {
    addUser(username: String, email: String, password: String): Auth
    addTrip( name: String): TripPlanner
    updateTrip(_id: ID!): TripPlanner
    updateUser(username: String, email: String, password: String): User
    login(email: String, password: String): Auth
  }
`;

module.exports = typeDefs;
