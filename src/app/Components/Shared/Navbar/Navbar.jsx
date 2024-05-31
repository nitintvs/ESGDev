import React, { useEffect } from 'react'
import API from '../../../Services/API'
import Logo from './Logo';
import ToggleButton from './ToggleButton';
import SearchForm from './SearchForm';
import NewMessagesAlert from './NewMessagesAlert';
import NewNotifications from './NewNotifications';
import Profile from './Profile';
import RightSideBar from './RightSideBar';
import ToggleOffCanvas from './ToggleOffCanvas';
import Permissons from './Permissons';

import BreadCrumbs from "../../Widgets/BreadCrumbs/BreadCrumbs";
import BreadCrumbsNav from "./BreadCrumbsNav";
function Navbar() {
  const user = JSON.parse(window.localStorage.getItem("user"))

  return (
    <>
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <Logo />
          <div className="navbar-menu-wrapper d-flex align-items-center" style={{ border: "none" }}>
            <ToggleButton />
              <BreadCrumbsNav />
            {/* <SearchForm /> */}
            <ul className="navbar-nav navbar-nav-right">
              {/* <NewMessagesAlert /> */}
              {/* <NewNotifications /> */}
              <Profile />
              {/* <RightSideBar /> */}
            </ul>
            {/* <ToggleOffCanvas /> */}
          </div>
      </nav>
    </>
  )
}

export default Navbar
