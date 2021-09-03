require("dotenv").config();
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server");
const jwt = require("jsonwebtoken");

const { typeDefs } = require("./graphQL/typeDefs");
const { resolvers } = require("./graphQL/resolvers");
const User = require("./models/userModel");

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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.startsWith("Bearer")) {
      const decoded = jwt.verify(auth.substring(7), process.env.JWT_SECRET);

      const currentUser = await User.findById(decoded.id);

      return {
        currentUser,
      };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`App listening port ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
