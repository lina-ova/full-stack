import { gql } from "@apollo/client";

export const ALL = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
    allBooks {
      title
      published
      id
      author {
        name
      }
      genres
    }
    me {
      favoriteGenre
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`;

export const EDIT_YEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const FIND_BY_GENRE = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      published
      genres
      author {
        name
      }
    }
  }
`;

export const FAVORITE_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;
