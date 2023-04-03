import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import './model/associations.js';
import booksRoutes from './routes/books.routes.js';
import authorRoutes from './routes/author.routes.js';

import sequelize from './sequelize.js';

import  resolvers  from './graphql/resolvers.js';
import  typeDefs  from './graphql/schema.js';


// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// const { url } = await startStandaloneServer(server);
// console.log(` Server ready at ${url}`);


// Apollo Server's built-in Express middleware
const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

// app.get("/", (_, res) => {
// res.send("Hello API");
// });

app.use("/books", booksRoutes);
app.use("/author", authorRoutes);

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);



await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);

sequelize.authenticate().then(() => {
    console.log(`Database Connected`);
  })
  .catch((err)=> {
    console.log("Error: " + err);
    console.log("!!!! SERVER MAY NOT HAVE STARTED !!!!");
  });