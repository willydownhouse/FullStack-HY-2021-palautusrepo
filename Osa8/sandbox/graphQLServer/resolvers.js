const { UserInputError } = require("apollo-server");
const User = require("../models/userModel");

const resolvers = {
  Query: {
    findAll: async () => await User.find(),
    findOne: async (root, args) => {
      const { id } = args;

      const user = await User.findById(id);

      return user;
    },
  },
  Mutation: {
    createOne: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (err) {
        throw new UserInputError(err.message);
      }

      return user;
    },
    updateOne: (root, args) => 1,
    deleteOne: (root, args) => 1,
  },
};

module.exports = resolvers;
