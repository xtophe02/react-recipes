import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';

import { getUser } from './utils/getUser';
const Recipe = require('./models/Recipe');
const User = require('./models/User');
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { getUserId } from './utils/getUserId';
import cors from 'cors';

require('dotenv').config();

const app = express();
// app.use((req, res, next) => {
//   res.header('Access-Control-Expose-Headers', 'ETag');
//   res.setHeader('teste', 'teste');
//   next();
// });
// const corsOptions = {
//   origin: ['http://localhost:3000', 'http://react-recipes-client:3000'],
//   credentials: true, // <-- REQUIRED backend setting
// };
// app.use(cors(corsOptions));
mongoose
  .connect(process.env.MONGO_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('DB connect'))
  .catch((err) => console.log(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }: any) => {
    // const user = getUser(req);
    // console.log(req.headers);
    const user = await getUserId(req);
    // console.log(user);

    return {
      res,
      user,
      Recipe,
      User,
    };
  },
});

server.applyMiddleware({
  app,
  cors: {
    origin: ['http://localhost:3000', 'http://react-recipes-client:3000'],
    credentials: true, // <-- REQUIRED backend setting
  },
});

app.listen({ port: process.env.PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  )
);
