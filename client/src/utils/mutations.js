import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_COLLECTION = gql`
  mutation addCollection($collectionTitle: String!) {
    addCollection(collectionTitle: $collectionTitle) {
      _id
      collectionTitle
      subfolders {
        _id
        subfolderName
      }
    }
  }
`;

export const DELETE_COLLECTION = gql`
  mutation deleteCollection($collectionId: ID!) {
    removeCollection(collectionId: $collectionId) {
      _id
      collectionTitle
      collectionOwner
    }
  }
`;

export const DELETE_SUBFOLDER = gql`
  mutation deleteSubfolder($subfolderId: ID!) {
    removeSubfolder(subfolderId: $subfolderId) {
      _id
      subfolderName
    }
  }
`;
