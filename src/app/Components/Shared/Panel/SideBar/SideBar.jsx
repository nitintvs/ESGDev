import React, { useEffect, useState } from 'react'
import './sidebar.css'
import API from '../../../../Services/API'
import $ from 'jquery'
import { Link, useLocation } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import Face1 from '../../../../../assets/images/faces/face1.jpg'
import SideBarMenu from './SideBarMenu/SideBarMenu';
import PillarNavigation from './PillarNavigation/PillarNavigation';
import RegionNavigation from './RegionNavigation/RegionNavigation';
import PortfolioNavigation from './PortfolioNavigation/PortfolioNavigation';
import CreateModule from './CreateModule/CreateModule';
import HelpNavigation from './HelpNavigation/HelpNavigation';

const SideBar = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const token = window.localStorage.getItem("accessToken");
  const [profile, setProfile] = useState("");

  const location = useLocation();
  const { hash, pathname, search } = location;
  const [basicUiMenuOpen, setBasicUiMenuOpen] = useState(false);
  const [pillars, setPillars] = useState(false);
  const [portfolio, setPortfolio] = useState(false);
  const [help, setHelp] = useState(false);
  const [region, setRegion] = useState(false);

    useEffect(() => {
        const body = document.querySelector('body');
        document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
            el.addEventListener('mouseover', function() {
                if(body.classList.contains('sidebar-icon-only')) {
                    el.classList.add('hover-open');
                }
            });
            el.addEventListener('mouseout', function() {
                if(body.classList.contains('sidebar-icon-only')) {
                    el.classList.remove('hover-open');
                }
            });
        });
    },[]);

    const openToggle = (event) => {
        if(event.target.title === 'Pillars'){
            setPillars(!pillars)
            setPortfolio(false)
            setHelp(false)
            setRegion(false)
        }else if(event.target.title === 'Portfolio'){
            setPortfolio(!portfolio)
            setPillars(false)
            setHelp(false)
            setRegion(false)
        }else if(event.target.title === 'Help'){
            setHelp(!help)
            setPortfolio(false)
            setPillars(false)
            setRegion(false)
        }else if(event.target.title === 'Region'){
            setRegion(!region)
            setHelp(false)
            setPortfolio(false)
            setPillars(false)
        }
    }

 

  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a
              href="!#"
              className="nav-link"
              onClick={(evt) => evt.preventDefault()}
            >
              <div className="nav-profile-image">
                <img
                  src={
                    user.profile_picture !== null
                      ?  user.profile_picture
                      : Face1
                  }
                  alt="profile"
                />
                <span className="login-status online"></span>
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2">
                  <>
                    {user.first_name} {user.last_name}
                  </>
                </span>
                <span className="text-secondary text-small">
                  <>{user.role}</>
                </span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>

                    
                    
                    <li className={'nav-item'}>
                        <Link className="nav-link" to="/dashboard">
                            <span className="menu-title"><>Home</></span>
                            <i className="mdi mdi-home menu-icon"></i>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/mytasks">
                        <span className="menu-title"><>My Tasks</></span>
                            <i className="mdi mdi-format-list-bulleted  menu-icon"></i>
                        </Link>
                    </li>
                    <PillarNavigation />
                    <RegionNavigation />
                    <PortfolioNavigation />
                    <HelpNavigation />
                    {/* <li className={help ? 'nav-item active' : 'nav-item'} title={'Help'} onClick={openToggle}>
                        <div className={ help ? 'nav-link menu-expanded' : 'nav-link' } data-toggle="collapse" title={'Help'}>
                            <span className="menu-title" title={'Help'}>Help</span>
                            <i className="menu-arrow" title={'Help'}></i>
                            <i className="mdi mdi-help-circle-outline menu-icon" title={'Help'}></i>
                        </div>
                        <Collapse in={help}>
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <Link className={'nav-link' } to="/help/faqs">FAQ's</Link></li>
                            <li className="nav-item"> <Link className={'nav-link' } to="/help/aboutsio">About SIO</Link></li>
                        </ul>
                        </Collapse>
                    </li> */}
                </ul>
            </nav>
            
        </>
    )
}

export default SideBar
