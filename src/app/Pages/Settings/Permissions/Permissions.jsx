import React, {useEffect, useState} from 'react'
import $ from 'jquery'
import Styles from './permissions.module.css'
import API from '../../../Services/API'
import { Card, CardBody, Heading, Stack, StackDivider, Box, Text, SimpleGrid, Select, useToast, Wrap, WrapItem, Avatar } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import UserGroup from './UserGroup/UserGroup'
import UserGroupList from './UserGroupList/UserGroupList'

const Permissions = () => {
    const token = window.localStorage.getItem("accessToken")
    const [groupList, setGroupList] = useState()
    const [groupUserList, setGroupUserList] = useState()
    const [users, setUsers] = useState()
    const toast = useToast()

    useEffect(() => {
        API.get(`/user-group`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setGroupList(response.data)
        })
        .catch(error => {
            
        });

        API.get(`/user-group-relation`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
        .then((response) => {
            setGroupUserList(response.data.results)
        })
        .catch(error => {
            
        });

        API.get(`/list-user`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            setUsers(response.data)
        }).catch(error => {
            
        });
    }, [])

    const getUpdatedGroup = (newGroup) => {
        setGroupList(newGroup)
    }

    const getUpdatedGroupUser = (groupUser) => {
        setGroupUserList(groupUser)
    }



    return (
        <>
            <UserGroup getUpdatedGroup ={getUpdatedGroup} />
            <Tabs size='md' variant='enclosed' width={'100%'} float={"left"} border={'1px solid #e2e8f0'} borderTop={'0px'}>
                <TabList>
                    <Tab>Users</Tab>
                    {/* <Tab>Documents</Tab> */}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <UserGroupList
                            groupList={groupList && groupList}
                            groupUserList={groupUserList && groupUserList}
                            getUpdatedGroupUser={getUpdatedGroupUser}
                        />
                    </TabPanel>
                    <TabPanel>
                        <p>Will update later </p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default Permissions