const Book = require("../models/bookModel");
const Author = require("../models/authorModel");

exports.resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log(args);
      return await Book.find({}).populate("author", { name: 1, born: 1 });
    },

    allAuthors: async () => await Author.find(),
  },

  // Author: {
  //   bookCount: (root) =>
  //     books
  //       .map((book) => book.author === root.name)
  //       .reduce((acc, val) => acc + val),
  // },
  // Mutation: {
  //   addBook: (root, args) => {
  //     const book = { ...args, id: uuid() };
  //     books = books.concat(book);

  //     if (!authors.map((author) => author.name).includes(book.author)) {
  //       authors = authors.concat({
  //         name: book.author,
  //         id: uuid(),
  //       });
  //     }

  //     return book;
  //   },
  //   editAuthor: (root, args) => {
  //     const { name, setBornTo } = args;

  //     const author = authors.find((a) => a.name === name);

  //     if (!author) return null;

  //     const updatedAuthor = { ...author, born: setBornTo };

  //     authors = authors.filter((a) => a.id !== author.id).concat(updatedAuthor);

  //     return updatedAuthor;
  //   },
  // },
};
