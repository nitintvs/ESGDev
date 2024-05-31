import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate, useLocation  } from 'react-router-dom';
import {Box, FormControl, Switch } from '@chakra-ui/react'
import Permissons from '../../Modules/Permissions/Permissons'
import Styles from './breadcrumb.module.css'

function BreadCrumbs(props) {
    const navigate = useNavigate();
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
    const [pageHeading, setPageHeading] = useState()
    
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    
    useEffect(() => {
        if(currentPath === '/' || currentPath === "/dashboard"){
            setPageHeading("Dashboard")
        }else{
            var pathTitle = currentPath.split("/").pop()
            var title = pathTitle.split('-').join(' ');
            setPageHeading(title.replace(/%20/g, " "))
        }
    }, []);

    const editPage = (event) =>{
        props.geteditStatus(event.target.checked)
    }

    const containsOnlyNumbers = (str) => {
        return /^\d+$/.test(str);
    };

  return (
    <>
      {/* <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ margin: "0" }}>
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {pathnames.map((path, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return path !== "action" &&
              path !== "metric" &&
              path !== "article" &&
              path !== "asio" &&
              path !== "help" &&
              path !== "pillar" &&
              path !== "initiative" &&
              path !== "qtr" &&
              path !== "yeargoal" &&
              path !== "fy" &&
              path !== "tg" &&
              path !== "viewpost" &&
              path !== "portfolio" &&
              path !== "ig" &&
              path !== "region" &&
              path !== "country" &&
              path !== "team" &&
              containsOnlyNumbers(decodeURIComponent(path)) === false ? (
              <li
                key={index}
                className={`breadcrumb-item ${isLast ? "active" : ""}`}
              >
                {isLast ? (
                  <span className={Styles.cap}>
                    {decodeURIComponent(path) === "mytasks"
                      ? "My Tasks"
                      : decodeURIComponent(path)}
                  </span>
                ) : (
                  <Link to={routeTo}>{decodeURIComponent(path)}</Link>
                )}
              </li>
            ) : null;
          })}
        </ol>
      </nav> */}
      <div className="page-header">
        <h3 className="page-title">
          <Link onClick={() => navigate(-1)}>
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-arrow-left"></i>
            </span>
          </Link>
          {props.title}
        </h3>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            {(props.pillarId && props.pillarId !== "") ||
            (props.pillarId && props.pillarId !== null) ? (
              <Permissons pillarId={props.pillarId && props.pillarId} />
            ) : null}
            <li style={{display:"none"}}>
              <FormControl
                display="flex"
                alignItems="center"
                className="editMain"
              >
                <Switch
                  id="email-alerts"
                  size="md"
                  defaultChecked={false}
                  onChange={editPage}
                />
              </FormControl>
            </li>
            <li className="breadcrumb-item active d-none" aria-current="page">
              <span></span>Overview{" "}
              <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default BreadCrumbs
