const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    collections: [Collection]
  }

  type Collection {
    _id: ID
    collectionTitle: String
    subfolders: [Subfolder]
  }

  type Subfolder {
    _id: ID
    subfolderName: String
    images: [Image]
  }

  type Query {
    users: [User]
    collections: [Collection]
    subfolders: [Subfolder]
    collections(id: ID!): Collection
  }

  type Mutation {
    addCollection(collectionTitle: String!): Collection
    addSubfolder(subfolderName: String!): Subfolder
    # Define the required parameters for updating a class
    updateClass(id: ID!, building: String!): Class
    # Define the required parameters for updating a collection
    updateCollection(id: ID!, collectionTitle: String!): Class
    # Define the required parameters for updating a subfolder
    updateSubfolder(id: ID!, subfolderName: String!): Class
  }
`;

module.exports = typeDefs;
