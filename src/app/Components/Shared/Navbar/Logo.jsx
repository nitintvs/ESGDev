import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoMini from "../../../../assets/images/logo-mini.svg";
import API from "../../../Services/API";
import { Dropdown } from "react-bootstrap";

function Logo() {
  const [websiteInfo, setWebsiteInfo] = useState();
    const token = window.localStorage.getItem("accessToken")
    useEffect(() => {
        API.get(`/website-info?id=3`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setWebsiteInfo(response.data)
            window.localStorage.removeItem('favicon')
            window.localStorage.setItem('favicon', response.data.favicon)
        })
    },[]);

  return (
    <>
      <link
        rel="icon"
        href={
          "https://esg.venturestudiocms.com/static/drf-yasg/swagger-ui-dist/favicon-32x32.png"
        }
      />
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo" to="/">
          <img
            src={websiteInfo && websiteInfo.logo}
            alt={websiteInfo && websiteInfo.workspace_name}
          />
        </Link>
        <Link className="navbar-brand brand-logo-mini" to="/">
          <img
            src={websiteInfo && websiteInfo.logo}
            alt={websiteInfo && websiteInfo.workspace_name}
          />
        </Link>
        <Dropdown align={"end"} >
          <Dropdown.Toggle
            className="nav-link"
            size="sm"
            style={{
              paddingLeft:0,
              background: "transparent",
              color: "#625b5b",
              border: "none",
              boxShadow: "none",
            }}
          ></Dropdown.Toggle>
          <Dropdown.Menu className="navbar-dropdown" style={{ marginRight: 5 }}>
            <Dropdown.Item href="/settings" style={{ width: 250 }}>
              <i className="mdi mdi-settings mr-2 text-danger"></i>
              <>Settings</>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default Logo
