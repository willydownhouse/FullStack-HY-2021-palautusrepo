const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server");
require("dotenv").config();

const { typeDefs } = require("./graphQL/typeDefs");
const { resolvers } = require("./graphQL/resolvers");

const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);

//DB
mongoose
  .connect(DB)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`App listening port ${url}`);
});
