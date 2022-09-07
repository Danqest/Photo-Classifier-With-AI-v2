import { gql } from "@apollo/client";

export const QUERY_USER_COLLECTIONS = gql`
  query userCollections($collectionOwner: String!) {
    userCollections(collectionOwner: $collectionOwner) {
      _id
      collectionTitle
      subfolders {
        _id
        subfolderName
      }
    }
  }
`;

export const QUERY_SINGLE_COLLECTION = gql`
  query getSingleCollection($collectionId: ID!) {
    collection(collectionId: $collectionId) {
      _id
      collectionTitle
      collectionOwner
      subfolders {
        _id
        subfolderName
      }
    }
  }
`;

export const QUERY_SUBFOLDERS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_IMAGES = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
