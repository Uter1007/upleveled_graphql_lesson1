const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: Int
    title: String
    author: String
    createdAt: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    book(id: Int): Book
  }
`;

const booksSource = [
  {
    id: 1,
    title: 'The Awakening',
    author: 'Kate Chopin',
    created_at: 458295425,
  },
  {
    id: 2,
    title: 'City of Glass',
    author: 'Paul Auster',
    created_at: 650276225,
  },
  {
    id: 3,
    title: 'IT',
    author: 'Stephen King',
    created_at: 713434625,
  },
  {
    id: 4,
    title: 'Clean Code',
    author: 'Uncle BOB',
    created_at: 3243463441253,
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => {
      return booksSource;
    },
    book: (parent, args, context, info) => {
      return booksSource.find((x) => x.id === args.id);
    },
  },

  Book: {
    createdAt: (parent) => {
      return new Date(parent.created_at).toISOString();
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen({ port: 3334 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
