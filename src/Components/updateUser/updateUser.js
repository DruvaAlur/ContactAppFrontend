import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../adminDashboard/navigationBar/NavBar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
function UpdateUser() {
  const [statusOfUpdateUser, updateStatusOfUpdateUser] = useState("");
  const [propertyToUpdate, updatepropertyToUpdate] = useState("username");
  const [value, updateValue] = useState("");
  const currentUser = useParams();

  const location = useLocation();
  const u = location.state;
  const username = u.credential.username;

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios
      .put("http://localhost:8800/api/v1/updateUser", {
        username,
        propertyToUpdate,
        value,
      })
      .then((resp) => {
        updateStatusOfUpdateUser("user updated");
      })
      .catch((error) => {
        console.log(error);
        updateStatusOfUpdateUser(error.response.data);
      });
  };
  return (
    <>
      <NavBar username={currentUser.username} />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div id="admindashboardform">
          <form onSubmit={handleUpdateUserSubmit} id="formadmin">
            {/* <label>Property:</label>
      <input
        type="text"
        value={propertyToUpdate}
        onChange={(e) => {
          updatepropertyToUpdate(e.target.value);
        }}
      ></input> */}
            <label for="property" class="fw-bold">
              Property:
            </label>
            <select
              id="property"
              name="property"
              onChange={(e) => {
                updatepropertyToUpdate(e.target.value);
              }}
            >
              <option value="username">username</option>
              <option value="firstname">firstname</option>
              <option value="lastname">lastname</option>
            </select>
            <br />
            <label class="fw-bold">Value:</label>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                updateValue(e.target.value);
              }}
            ></input>
            <br />

            <button class="btn btn-primary button">Update User</button>
            <br />
            <br />
            {statusOfUpdateUser}
          </form>
        </div>
      </div>
    </>
  );
}
export default UpdateUser;
