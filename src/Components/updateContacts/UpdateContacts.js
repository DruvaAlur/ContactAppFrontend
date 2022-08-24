import "./UpdateContacts.css";
import NavBar from "../userDashboard/navigationBar/NavBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function UpdateContacts() {
  const location = useLocation();
  const contactName = location.state.fullname;

  const username = useParams();
  const navigation = new useNavigate();
  const [isLoggedIn, updateIsLoggedIn] = useState("");

  const [value, updateValue] = useState("");
  const [propertyTobeUpdated, updatepropertyTobeUpdated] =
    useState("firstname");
  const [status, updateStatus] = useState("");

  useEffect(() => {
    axios
      .post(
        `http://localhost:8800/api/v1/isUserLoggedIn/${username.username}`,
        {}
      )
      .then((resp) => {
        updateIsLoggedIn(true);
      })
      .catch((error) => {
        updateIsLoggedIn(false);
      });
  }, []);
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8800/api/v1/updateContact/${username.username}`, {
        contactName,
        propertyTobeUpdated,
        value,
      })
      .then((resp) => {
        updateStatus("Contact Updated");
      })
      .catch((error) => {
        updateStatus(error.response.data);
      });
  };
  if (!isLoggedIn) {
    return (
      <>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "column",
          }}
        >
          <p style={{ color: "red", fontSize: "20px" }}>
            User not logged in please login by clicking below
          </p>

          <button
            onClick={() => navigation("/")}
            class="btn btn-secondary button"
          >
            login
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <NavBar username={username.username} />
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
          <form id="formadmin" onSubmit={handleUpdateUser}>
            <label class="fw-bold">Property</label>
            <select
              id="propertyTobeUpdated"
              name="propertyTobeUpdated"
              onChange={(e) => {
                updatepropertyTobeUpdated(e.target.value);
              }}
            >
              <option value="firstname">firstname</option>
              <option value="lastname">lastname</option>
            </select>
            <br />
            <label class="fw-bold">Value</label>
            <input
              type="text"
              value={value}
              onChange={(e) => updateValue(e.target.value)}
            ></input>
            <br />
            <button class="btn btn-primary">Update Contact</button>
            <br />
            <br />
            {status}
          </form>
        </div>
      </div>
    </>
  );
}
export default UpdateContacts;
