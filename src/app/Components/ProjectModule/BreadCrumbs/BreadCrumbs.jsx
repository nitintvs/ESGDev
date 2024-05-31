import React, { useEffect, useState } from 'react'
import {Box, FormControl, Switch } from '@chakra-ui/react'

const BreadCrumbs = (props) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
    const [pageHeading, setPageHeading] = useState()
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

    return (
        <>
            <div className="page-header">
                <h3 className="page-title">
                    <span className="page-title-icon bg-gradient-primary text-white mr-2">
                        <i className="mdi mdi-home"></i>
                    </span> 
                    {props.name} 
                </h3>
                <nav aria-label="breadcrumb">
                    <ul className="breadcrumb">
                        <li>
                            <FormControl display='flex' alignItems='center' className='editMain'>
                                <Switch id='email-alerts' size='md' defaultChecked={false} onChange={editPage} />
                            </FormControl>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default BreadCrumbs