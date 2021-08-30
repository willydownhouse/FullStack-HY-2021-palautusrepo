const { ApolloServer, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");
let { books } = require("./dev-data/books");
let { authors } = require("./dev-data/authors");

const typeDefs = gql`
  type Book {
    title: String
    published: Int
    author: String
    id: ID
    genres: [String]
  }

  type Author {
    name: String
    id: ID
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String]
    ): Book

    editAuthor(name: String, setBornTo: Int): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      const { author, genre } = args;

      if (author && genre) {
        return books.filter(
          (book) => book.author === author && book.genres.includes(genre)
        );
      }

      if (author) {
        return books.filter((book) => book.author === author);
      }

      if (genre) {
        return books.filter((book) => book.genres.includes(genre));
      }

      return books;
    },

    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) =>
      books
        .map((book) => book.author === root.name)
        .reduce((acc, val) => acc + val),
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() };
      books = books.concat(book);

      if (!authors.map((author) => author.name).includes(book.author)) {
        authors = authors.concat({
          name: book.author,
          id: uuid(),
        });
      }

      return book;
    },
    editAuthor: (root, args) => {
      const { name, setBornTo } = args;

      const author = authors.find((a) => a.name === name);

      if (!author) return null;

      const updatedAuthor = { ...author, born: setBornTo };

      authors = authors.filter((a) => a.id !== author.id).concat(updatedAuthor);

      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`App listening port ${url}`);
});
