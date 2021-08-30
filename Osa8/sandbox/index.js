const { ApolloServer, gql } = require("apollo-server");

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: "3d599470-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: "3d599471-3436-11e9-bc57-8b80ba54c431",
  },
];

const typeDefs = gql`
  type Address {
    street: String
    city: String
  }
  type Person {
    name: String!
    phone: String!
    address: Address
    id: ID!
  }

  type Query {
    allPersons: [Person]
    findPerson(name: String): Person
    firstPerson: Person
  }
`;

const resolvers = {
  Query: {
    allPersons: () => persons,
    findPerson: (root, args) =>
      persons.find((person) => person.name === args.name),
    firstPerson: () => persons[0],
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const port = 4000;
server.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
