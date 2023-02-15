const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
require("dotenv").config();

const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find();

      if (args.genre) {
        books = books.filter((book) => book.genres.includes(args.genre));
      }
      return books;
    },
    allAuthors: async () => Author.find(),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      return {
        id: author.id,
        name: author.name,
        born: author.born,
      };
    },
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id });
      return books.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author, born: null });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError(
            "Saving author failed, because name is too short",
            {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
                error,
              },
            }
          );
        }
      }

      const book = new Book({
        title: args.title,
        author,
        published: args.published,
        genres: args.genres,
      });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(
          "Saving book failed, because title is too short",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          }
        );
      }
      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error: "author was not found",
          },
        });
      }
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id).populate(
        "favoriteGenre"
      );
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
