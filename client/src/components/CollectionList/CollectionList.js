import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { DELETE_COLLECTION } from "../../utils/mutations";
import { QUERY_USER_COLLECTIONS } from "../../utils/queries";
import Auth from "../../utils/auth";
import CollectionDetails from "../../components/CollectionDetail/CollectionDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_COLLECTION } from "../../utils/queries";

// import { Mutation } from "react-apollo";
import './CollectionList.css'

const CollectionList = ({ collections, collectionTitle }) => {
  const { collectionId } = useParams();

  const [deleteCollection, { error, data }] = useMutation(DELETE_COLLECTION, {
    variables: { collectionId: collections._id },
    onCompleted: (data) => {
      console.log(data);
      // this.setState({})
    },
  });

  const handleClick = (event) => {
    const { id } = event.target;
    deleteCollection({ variables: { collectionId: id } });
  };

  let navigate = useNavigate();
  const collectionRoute = (event) => {
    const id = event.target.id;
    let path = id;
    navigate(path);
  };

  const { loading3, data3 } = useQuery(QUERY_SINGLE_COLLECTION, {
    variables: { collectionId: collectionId },
  });

  const collectionParams = data3?.collection || {};
  console.log(collectionParams);

  if (!collections.length) {
    return <h3>No collections Yet</h3>;
  }

  return (
    <div>
      <h3>{collectionTitle}</h3>
      {collections &&
        collections.map((collection) => (
          <div key={collection._id}>
            <div
              className="card-header"
              style={{ display: "flex" }}
            >
              <div className="d-grid gap-2 col-10 mx-auto">
                <button
                  onClick={collectionRoute}
                  className="btn btn-primary btn-lg"
                  id={collection._id}
                >
                  {collection.collectionTitle}
                </button>
              </div>
              <button
                onClick={handleClick}
                className="btn btn-danger"
                style={{ marginLeft: "auto" }}
                id={collection._id}
              >
                X{" "}
              </button>
            </div>
            <p>- - - </p>
          </div>
        ))}
    </div>
  );
};

export default CollectionList;
