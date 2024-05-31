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


const PillarNavigation = () => {
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
            <li className={pillars ? 'nav-item active' : 'nav-item'} title={'Pillars'} onClick={openToggle}>
                <div className={ pillars ? 'nav-link menu-expanded' : 'nav-link' } data-toggle="collapse" title={'Pillars'}>
                    <span className="menu-title" title={'Pillars'}>Social Impact Office</span>
                    <i className="menu-arrow" title={'Pillars'}></i>
                    <i className="mdi mdi-domain menu-icon" title={'Pillars'}></i>
                </div>
                <Collapse in={pillars}>
                    <ul className="nav flex-column sub-menu">
                        <CreateModule menuList={menuList} updateMenu={updateMenu} />
                        {
                            menuList && menuList.map((item, index) =>
                                ((item.category === 'pillar') && (item.parent_id === null)) ?
                                    <li className="nav-item nav-pillar-sub">
                                        <Box className={'nav-link '+Styles.subMenuArrow} onClick={toogleNew}>
                                            <i className="menu-arrow" ></i> 
                                        </Box>
                                        <Link className={'overwrite nav-link' } to={`/${item.category}/${item.id}/${item.name}`}>
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
                                                                    <Link className={'nav-link sub-nav-link' }  to={`/${item.category}/${item.id}/${item.name}/${item1.id}/${item1.name}`}>
                                                                        <>{item1.name} </>
                                                                    </Link>
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

export default PillarNavigation