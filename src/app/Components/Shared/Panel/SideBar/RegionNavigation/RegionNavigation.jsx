import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import Styles from '../SideBarMenu/sideBarMenu.module.css'
import API from '../../../../../Services/API';
import { Collapse } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import CreateModule from './CreateModule/CreateModule';
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


const RegionNavigation = () => {
    const token = window.localStorage.getItem("accessToken")
    const user = JSON.parse(window.localStorage.getItem("user"))
    const location = useLocation();
    const { hash, pathname, search } = location;
    const [basicUiMenuOpen, setBasicUiMenuOpen] = useState(false)
    const [pillars, setPillars] = useState(false)
    const [region, setRegion] = useState(false)
    const [portfolio, setPortfolio] = useState(false)
    const [help, setHelp] = useState(false)
    const [menuList, setMenuList] = useState()
    const [subMenuList, setSubMenuList] = useState()

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

    useEffect(() => {
        API.get(`/project-modules`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
            setMenuList(response.data)
            API.get(`/project-modules`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then(response=>{
                setSubMenuList(response.data)
                $('.subMenuNew:empty').remove()
                $('.subMenuNew').closest('li').addClass('acordian')
            })
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
            <li className={region ? 'nav-item active' : 'nav-item'} title={'Region'} onClick={openToggle}>
                <div className={ region ? 'nav-link menu-expanded' : 'nav-link' } data-toggle="collapse" title={'Region'}>
                    <span className="menu-title" title={'Region'}>Region</span>
                    <i className="menu-arrow" title={'Region'}></i>
                    <i className="mdi mdi-earth menu-icon" title={'Region'}></i>
                </div>
                <Collapse in={region}>
                    <ul className="nav flex-column sub-menu">
                        <CreateModule menuList={menuList} updateMenu={updateMenu} />
                        {
                            menuList && menuList.map((item, index) =>
                                ((item.category.toLowerCase() === 'region') && (item.parent_id === null)) ?
                                    <li className="nav-item nav-pillar-sub">
                                        <Box className={'nav-link '+Styles.subMenuArrow} onClick={toogleNew}>
                                            <i className="menu-arrow" ></i> 
                                        </Box>
                                        
                                        <Link className={'nav-link' } to={`/${item.category}/${item.id}/${item.name}`}>
                                            <>
                                                {item.name}
                                            </>
                                        </Link>
                                        <ul className='subMenuNew d-none'>
                                            {
                                                menuList && menuList.map((item1, index1) =>
                                                    <>
                                                        {item.id === item1.parent_id ?
                                                            <>
                                                                <li className="nav-item">
                                                                    <Link className={'nav-link sub-nav-link' }  to={`/${item.category}/${item.id}/${item.name}/country/${item1.id}/${item1.name}`}>
                                                                        <>{item1.name} </>
                                                                    </Link>
                                                                    {/* <ul className='subMenuNew d-none'>
                                                                        {
                                                                            subMenuList && subMenuList.map((subItem, index) =>
                                                                                item1.id === subItem.parent_id ?
                                                                                    <li>{subItem.name}</li> 
                                                                                : null
                                                                            )
                                                                        }
                                                                    </ul> */}
                                                                </li>
                                                            </>
                                                        :null}
                                                    </>
                                                )
                                            }
                                        </ul>
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

export default RegionNavigation