import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { ADD_COLLECTION} from "../../utils/mutations";
import { QUERY_USER_COLLECTIONS, QUERY_SINGLE_COLLECTION } from "../../utils/queries";
import CollectionList from '../../components/CollectionList/CollectionList'

import { useParams } from "react-router-dom";

import './collections.css'


function Collections() {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { loading, data } = useQuery(QUERY_USER_COLLECTIONS, {
    variables: { collectionOwner: Auth.getProfile().data.username },
  });

  let collections = data?.userCollections;




  // console.log(collections);
  // console.log(Auth.getProfile().data.username);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      [name]: value,
    });
  };

  const [formState, setFormState] = useState({
    collectionTitle: "",
  });

  const [addCollection, { error, data2 }] = useMutation(ADD_COLLECTION);
  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    console.log(formState);

    try {
      const { data2 } = await addCollection({
        variables: { collectionTitle: formState.collectionTitle },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container-xl">
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {Auth.loggedIn() ? (
            <div>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div>
                    <div>
                      <span>
                        {Auth.getProfile().data.username}'s Collections:
                      </span>
                      <p>- - - </p>
                      <CollectionList
                        collections={collections}
                        />
                        <div>
                      <form style={{'textAlign': 'center'}} onSubmit={handleFormSubmit}>
                        <h1>Collection Creation Form</h1>
                        <div className="mb-3">
                          <label>Collection Title</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Title For Collection"
                            name="collectionTitle"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="d-grid">
                          <button >
                            Create Collection
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
              <span>No Collections To Display! Please Log In</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collections;
