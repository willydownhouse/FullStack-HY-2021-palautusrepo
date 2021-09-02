require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const resolvers = require("./graphQLServer/resolvers");
const typeDefs = require("./graphQLServer/typeDefs");

const db = process.env.DB_CONNECTION.replace(
  "<password>",
  process.env.DB_PASSWORD
);

mongoose
  .connect(db)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Problem connectig to DB");
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const port = 4000;
server.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
