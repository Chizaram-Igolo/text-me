import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Register(
    $firstname: String!
    $lastname: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstname: $firstname
      lastname: $lastname
      username: $username
      email: $email
      password: $password
    ) {
      _id
      firstname
      lastname
      username
      email
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      firstname
      lastname
      username
      email
      token
    }
  }
`;

export const GET_BOOKS = gql`
  query {
    books {
      _id
      title
      author
      description
      publishedDate
    }
  }
`;

export const ADD_BOOK = gql`
  mutation (
    $title: String!
    $author: String!
    $description: String!
    $publishedDate: String!
  ) {
    addBook(
      title: $title
      author: $author
      description: $description
      publishedDate: $publishedDate
    ) {
      _id
      title
      author
      description
      publishedDate
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation (
    $id: ID!
    $title: String
    $author: String
    $description: String
    $publishedDate: String
  ) {
    updateBook(
      id: $id
      title: $title
      author: $author
      description: $description
      publishedDate: $publishedDate
    ) {
      _id
      title
      author
      description
      publishedDate
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation ($id: ID!) {
    deleteBook(id: $id) {
      _id
    }
  }
`;
