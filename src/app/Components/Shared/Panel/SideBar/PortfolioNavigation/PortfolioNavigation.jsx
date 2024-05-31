import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import Styles from '../SideBarMenu/sideBarMenu.module.css'
import API from '../../../../../Services/API';
import { Collapse } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import CreateModule from '../CreateModule/CreateModule';
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
    Heading
} from '@chakra-ui/react'

const PortfolioNavigation = () => {
    const token = window.localStorage.getItem("accessToken")
    const user = JSON.parse(window.localStorage.getItem("user"))
    const location = useLocation();
    const { hash, pathname, search } = location;
    const [basicUiMenuOpen, setBasicUiMenuOpen] = useState(false)
    const [pillars, setPillars] = useState(false)
    const [portfolio, setPortfolio] = useState(false)
    const [help, setHelp] = useState(false)
    const [menuList, setMenuList] = useState()

    const openToggle = (event) => {
        if(event.target.title === 'Pillars'){
            setPillars(!pillars)
            setPortfolio(false)
            setHelp(false)
        }else if(event.target.title === 'Portfolio'){
            setPortfolio(!portfolio)
            setPillars(false)
            setHelp(false)
        }else if(event.target.title === 'Help'){
            setHelp(!help)
            setPortfolio(false)
            setPillars(false)
        }
    }

    useEffect(() => {
        API.get(`/project-modules`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
            setMenuList(response.data)
            $('.subMenuNew:empty').remove()
            $('.subMenuNew').closest('li').addClass('acordian')
        }).catch(error => {
            if(error.response.data.code === 'token_not_valid'){
                window.localStorage.removeItem('accessToken')
                window.localStorage.removeItem('refreshToken')
                window.localStorage.removeItem('user')
                window.location.href = '/login'
            }
          });
    },[]);

    const updateMenu = (updatedMenu) =>{
        setMenuList(updatedMenu)
    }

    const toogleNew = (event) => {
        $(event.target).toggleClass('newMClass')
        const parentElement = event.target.closest('.nav-pillar-sub');
        $(parentElement).find('ul.subMenuNew').toggleClass('d-none')
    }

    $('.subMenuNew:empty').remove()
    $('.subMenuNew').closest('li').addClass('acordian')
    
    return (
        <>
            <li className={portfolio ? 'nav-item active' : 'nav-item'} title={'Portfolio'} onClick={openToggle}>
                <div className={ portfolio ? 'nav-link menu-expanded' : 'nav-link' } data-toggle="collapse" title={'Portfolio'}>
                    <span className="menu-title" title={'Portfolio'}>Portfolio</span>
                    <i className="menu-arrow" title={'Portfolio'}></i>
                    <i className="mdi mdi-routes menu-icon" title={'Portfolio'}></i>
                </div>
                <Collapse in={portfolio}>
                    <ul className="nav flex-column sub-menu">
                        {
                            menuList && menuList.map((item, index) =>
                                ((item.category === 'portfolio') && (item.parent_id === null)) ?
                                    <li className="nav-item nav-pillar-sub">
                                        <Box className={'nav-link '+Styles.subMenuArrow} onClick={toogleNew}>
                                            <i className="menu-arrow" ></i> 
                                        </Box>
                                        <Link className={'nav-link' } to={`/${item.category}/${item.unique_name.replace(/\s+/g, '').toLowerCase()}/${item.id}/${item.name}`}>
                                            <>
                                                {item.name}
                                            </>
                                        </Link>
                                    </li>
                                :null
                            )
                        }
                    </ul>
                </Collapse>
            </li>
        </>
    )
}

export default PortfolioNavigation