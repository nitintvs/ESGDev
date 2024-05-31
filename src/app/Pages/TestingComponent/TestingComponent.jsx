import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import API from '../../Services/API';
import { Collapse } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
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

const TestingComponent = () => {
    const token = window.localStorage.getItem("accessToken")
    const [menuList, setMenuList] = useState()
    const [subMenuList, setSubMenuList] = useState()

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
    return (
        <>
            <ul>
                {
                    menuList && menuList.map((item, index) =>
                        ((item.category.toLowerCase() === 'region') && (item.parent_id === null) ?
                            <li> 
                                {item.name}
                                <ul>
                                    {
                                        menuList && menuList.map((item1, index) =>
                                            item.id === item1.parent_id ?
                                                <li> 
                                                    {item1.name} {item1.id} 
                                                    <ul>
                                                        {
                                                            subMenuList && subMenuList.map((subItem, index) =>
                                                                item1.id === subItem.parent_id ?
                                                                    <li>{subItem.name}</li> 
                                                                : null
                                                            )
                                                        }
                                                        
                                                    </ul>
                                                </li> 
                                            : null
                                        )
                                    }
                                </ul>
                            </li> : null
                        )
                    )
                }
            </ul>
        </>
    )
}

export default TestingComponent