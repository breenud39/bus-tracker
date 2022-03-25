const { ApolloServer, gql } = require('apollo-server');


// A map of functions which return data for the schema.
const resolvers = {
    Query: {
      hello: () => 'world',
    },
  };