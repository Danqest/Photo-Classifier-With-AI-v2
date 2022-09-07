import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { DELETE_SUBFOLDER } from "../../utils/mutations";
import { QUERY_USER_COLLECTIONS } from "../../utils/queries";
import Auth from "../../utils/auth";
import CollectionDetails from "../../components/CollectionDetail/CollectionDetail";

// import { Mutation } from "react-apollo";

const SubfolderList = ({ subfolders, collectionTitle }) => {
  const [deleteSubfolder, { error, data }] = useMutation(DELETE_SUBFOLDER, {
    variables: { subfolderId: subfolders._id },
    onCompleted: (data) => {
      console.log(data);
      // this.setState({})
    },
  });

  const handleClick = (event) => {
    const { id } = event.target;
    deleteSubfolder({ variables: { subfolderId: id } });
  };

  const collectionRoute = () => {};

  if (!subfolders.length) {
    return <h3>No collections Yet</h3>;
  }

  return (
    <div>
      <h3>{collectionTitle}</h3>
      {subfolders &&
        subfolders.map((subfolders) => (
          <div key={subfolders._id}>
            <div
              className="card-header bg-primary text-light p-2 m-0"
              style={{ display: "flex" }}
            >
              <div className="d-grid gap-2 col-10 mx-auto">
                <button
                  onClick={collectionRoute}
                  className="btn btn-primary btn-lg"
                  id={subfolders._id}
                >
                  {subfolders.subfolderName}
                </button>
              </div>
              <button
                onClick={handleClick}
                className="btn btn-danger"
                style={{ marginLeft: "auto" }}
                id={subfolders._id}
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

export default SubfolderList;
