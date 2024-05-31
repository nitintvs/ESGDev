import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Face1 from "../../../../assets/images/faces/face1.jpg";
import { Redirect } from "react-router-dom";
import API from "../../../Services/API";

function Profile() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const token = window.localStorage.getItem("accessToken");
  const [profile, setProfile] = useState("");
  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    window.location.reload(false);
    window.location.href = "/";
  }

 

  return (
    <li className="nav-item nav-profile">
      <Dropdown align={"right"}>
        <Dropdown.Toggle className="nav-link">
          <div className="nav-profile-img">
            <img
              src={
                user.profile_picture !== null
                  ?  user.profile_picture
                  : Face1
              }
              alt="user"
            />
          </div>
          <div className="nav-profile-text">
            <p className="mb-1 text-black">
              <>
                {user.first_name} {user.last_name}
              </>
            </p>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="navbar-dropdown">
          <Dropdown.Item href="/profile">
            <i className="mdi mdi-cached mr-2 text-success"></i>
            <>Profile</>
          </Dropdown.Item>
          {/* <Dropdown.Item href="/settings">
            <i className="mdi mdi-settings mr-2 text-danger"></i>
            <>Settings</>
          </Dropdown.Item> */}
          <Dropdown.Item onClick={logout}>
            <i className="mdi mdi-logout mr-2 text-primary"></i>
            <>Signout</>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
}

export default Profile
