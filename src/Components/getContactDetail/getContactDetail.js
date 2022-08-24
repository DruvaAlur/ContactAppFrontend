import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "../userDashboard/navigationBar/NavBar";
function GetContactDetail() {
  const [isLoggedIn, updateIsLoggedIn] = useState("");
  const location = useLocation();
  const u = location.state;
  const [contact, updateContact] = useState();
  let fullname;
  const currentUser = useParams();
  const navigation = new useNavigate();
  console.log(u);
  // useEffect(() => {
  //   console.log("in getcontsact");
  //   getContact();
  // }, []);
  console.log(currentUser.username);
  useEffect(() => {
    console.log(currentUser.username);
    axios
      .post(
        `http://localhost:8800/api/v1/isUserLoggedIn/${currentUser.username}`
      )
      .then((resp) => {
        updateIsLoggedIn(true);
        fullname = u.fullname;
        getContact();
      })
      .catch((error) => {
        updateIsLoggedIn(false);
        console.log(error);
      });
  }, []);
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
  async function getContact() {
    await axios
      .post(`http://localhost:8800/api/v1/getContact/${currentUser.username}`, {
        fullname,
      })
      .then((resp) => {
        updateContact(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  console.log(contact);

  let rowOfContactDetail;
  if (contact != null) {
    rowOfContactDetail = Object.values(contact.contactDetails).map((c) => {
      return (
        <>
          <tr>
            <td>{c.type}</td>
            <td>{c.value}</td>
            <td>
              <button
                class="btn btn-primary"
                onClick={() => {
                  navigation(
                    `/userDashboard/updateContactDetail/${currentUser.username}`,
                    { state: { fullname: contact.fullname, type: c.type } }
                  );
                }}
              >
                Update Contact Detail
              </button>
            </td>
          </tr>
        </>
      );
    });
  }
  return (
    <>
      <NavBar username={currentUser.username} />
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">type</th>
            <th scope="col">value</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody>{rowOfContactDetail}</tbody>
      </table>
    </>
  );
}
export default GetContactDetail;
