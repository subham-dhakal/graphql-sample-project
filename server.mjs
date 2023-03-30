import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import './model/associations.js';

import sequelize from './sequelize.js';

import  resolvers  from './graphql/resolvers.js';
import  typeDefs  from './graphql/schema.js';


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(` Server ready at ${url}`);

sequelize.authenticate().then(() => {
    console.log(`Database Connected`);
  })
  .catch((err)=> {
    console.log("Error: " + err);
    console.log("!!!! SERVER MAY NOT HAVE STARTED !!!!");
  });