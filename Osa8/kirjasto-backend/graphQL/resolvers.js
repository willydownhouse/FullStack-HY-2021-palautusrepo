const Book = require("../models/bookModel");
const Author = require("../models/authorModel");
const User = require("../models/userModel");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

exports.resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log(args);
      const { author, genre } = args;

      if (author && genre) {
        //tää kuntoon
        return await Book.find();
      }

      if (author) {
        //tää pitää viel korjaa
        return await Book.find().populate("author");
      }
      if (genre) {
        return await Book.find().where("genres").in(genre).populate("author");
      }
      return await Book.find().populate("author");
    },

    allAuthors: async () => await Author.find(),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: async (root) => {
      const result = await Book.find();

      return result
        .map((book) => book.author.toString() === root.id.toString())
        .reduce((acc, val) => acc + val);
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError(
          "Please log in before executing this action"
        );
      }
      const book = { ...args };
      let newBook;
      let newAuthor;

      const author = await Author.findOne({ name: book.author });

      if (!author) {
        try {
          newAuthor = await Author.create({
            name: book.author,
          });
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: book.author,
          });
        }

        try {
          newBook = await Book.create({ ...args, author: newAuthor.id });
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          });
        }
      } else {
        try {
          newBook = await Book.create({
            ...args,
            author: author.id,
          });
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          });
        }
      }

      return newBook;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError(
          "Please log in before executing this action"
        );
      }
      const { name, setBornTo } = args;

      const author = await Author.findOne({ name });

      if (!author) return null;

      author.born = setBornTo;

      try {
        await author.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }

      return user;
    },

    login: async (root, args) => {
      const { username, password } = args;

      const user = await User.findOne({ username }).select("+password");

      if (
        !user ||
        !(await user.checkCorrectPassword(password, user.password))
      ) {
        throw new UserInputError("Wrong username or password");
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        process.env.JWT_SECRET
      );

      return {
        value: token,
      };
    },
  },
};
