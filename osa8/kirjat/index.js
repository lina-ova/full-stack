const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author') 
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`

  type Book {
    title: String!, 
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]!
  }

  type Author {
    name: String!,
    born: Int
    id: ID!,
    bookCount: Int!
  }


  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
    
      // if (args.author && args.genre) {
      //   return books.filter( book => book.author == args.author && book.genres.includes(args.genre) )
      // }
      // if (args.author ) {
      //   return books.filter(book => book.author === args.author)
      // }
      // if (args.genre) {
      //   return books.filter( book => book.genres.includes(args.genre))
      // }
      return Book.find({})
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: (root) => {
      const authorBooks = books.filter((book) => book.author === root.name)
      return authorBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({name: args.author})
      if (!author) {
        author = await new Author({name: args.author, born: null}).save()
      }

      const book = new Book({
        title: args.title,
        author,
        published: args.published,
        genres: args.genres 
      })
      return book.save()
    },
      editAuthor(root, args) {
        const author = authors.find(author => author.name === args.name)
        if (!author) {
          return null
        }
        const updatedAuthor = { ...author, born: args.setBornTo }
        authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
        return updatedAuthor
      }
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})