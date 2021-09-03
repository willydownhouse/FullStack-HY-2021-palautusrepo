const Book = require("../models/bookModel");
const Author = require("../models/authorModel");
const User = require("../models/userModel");
const {
  UserInputError,
  AuthenticationError,
  PubSub,
} = require("apollo-server");
const jwt = require("jsonwebtoken");

const pubsub = new PubSub();

exports.resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args;

      if (author && genre) {
        const auth = await Author.findOne({ name: author });

        return await Book.find({ author: auth._id })
          .where("genres")
          .in(genre)
          .populate("author");
      }

      if (author) {
        const auth = await Author.findOne({ name: author });

        return await Book.find({ author: auth._id }).populate("author");
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
    bookCount: (root) => root.books.length,
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

      //IF AUTHOR EXISTS
      const author = await Author.findOne({ name: book.author });

      //AUTHOR DOES NOT EXIST -> CREATE NEW AUTHOR
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
        //AFTER NEW AUTHOR -> NEW BOOK
        try {
          newBook = await Book.create({ ...args, author: newAuthor.id });
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          });
        }
        //UPDATE NEW AUTHOR books -> WITH NEWBOOK ID
        try {
          const a = await Author.findById(newAuthor._id);

          a.books = [newBook._id];

          await a.save();
        } catch (err) {
          console.log(err.message);
        }
        // AUTHOR ALREADY EXISTS
      } else {
        try {
          newBook = await Book.create({
            ...args,
            author: author.id,
          });

          // UPDATE AUTHORS BOOKS ARRAY
          author.books = [...author.books, newBook._id];

          await author.save();
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          });
        }
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

      return newBook;
    },
    editAuthor: async (root, args, context) => {
      console.log("halloo");
      if (!context.currentUser) {
        throw new AuthenticationError(
          "Please log in before executing this action"
        );
      }
      const { name, setBornTo } = args;

      console.log(name, setBornTo);

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
        user: user._id,
        favoriteGenre: user.favoriteGenre,
      };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};
