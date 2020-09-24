import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';

require('dotenv').config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('DB connect'))
  .catch((err) => console.log(err));

const Recipe = require('./models/Recipe');
const User = require('./models/User');
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    Recipe,
    User,
  },
});

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  )
);
