import express from 'express';
import path from 'path';
import db from './config/connection.js';
import typeDefs from './typeDefs/schema.js';
const { ApolloServer, gql } = require('apollo-server');

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  const PORT = process.env.PORT || 3001;

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${PORT}`);
  });