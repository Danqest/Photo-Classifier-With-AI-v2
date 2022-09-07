import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { ADD_COLLECTION } from "../../utils/mutations";
import { QUERY_SINGLE_COLLECTION } from "../../utils/queries";
import SubfolderList from "../../components/SubfolderList/SubfolderList";
// Import the `useParams()` hook from React Router
import { useParams, useNavigate } from "react-router-dom";

const CollectionDetails = () => {
  // Use `useParams()` to retrieve value of the route parameter `:collectionId`
  const { collectionId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_COLLECTION, {
    variables: { collectionId: collectionId },
  });

  const collection = data?.collection || {};
  console.log(collection.subfolders);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {Auth.loggedIn() ? (
            <div>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  <div>
                    <span>{collection.collectionTitle}'s Subfolders:</span>
                    <p>- - - </p>
                    <SubfolderList subfolders={collection.subfolders} />
                    <div>
                      <form style={{ textAlign: "center" }}>
                        <h3>Subfolder Creation Form</h3>
                        <div className="mb-3">
                          <label>Subfolder Title</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Title For Subfolder"
                            name="subfolderTitle"
                          />
                        </div>
                        <div className="d-grid">
                          <button type="submit" className="btn btn-primary">
                            Create Subfolder
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <span>
                No Collections or Subfolders To Display! Please Log In
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;
