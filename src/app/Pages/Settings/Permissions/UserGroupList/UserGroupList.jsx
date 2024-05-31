import React, {useEffect, useState} from 'react'
import $ from 'jquery'
import Styles from './userGroupList.module.css'
import API from '../../../../Services/API'
import { Card, CardBody, Heading, Stack, StackDivider, Box, Text, SimpleGrid, Select, useToast, Wrap, WrapItem, Avatar } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import DeleteUser from './DeleteUser/DeleteUser'
import LoaderSpinner from '../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import PermissionLoader from './PermissionLoader'
import userPlaceholder from '../../../../../assets/images/userPlaceholder.svg'

const UserGroupList = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading] = useState(false)
    const [groupList, setGroupList] = useState()
    const [groupUserList, setGroupUserList] = useState()
    const [users, setUsers] = useState()
    const toast = useToast()

    useEffect(() => {
        setIsLoading(true)
        API.get(`/list-user`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            setUsers(response.data)
            setIsLoading(false)
        }).catch(error => {
            
        });
    }, [])

    const addUser = (event) =>{
        setIsLoading(true)
        const body = {
            "user": parseInt(event.target.value),
            "user_group": parseInt(event.target.id)
        }
        API.post(`/user-group-relation`, body, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            API.get(`/user-group-relation`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
              })
            .then((response) => {
                props.getUpdatedGroupUser(response.data.results)
                setIsLoading(false)
                $(event.target).val('')
            })
            toast({
                title: 'Added user to Group',
                description: "Changed Role to "+ event.target.value +".",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }).catch(error => {
            toast({
                title: 'Error',
                description: error.response.data.non_field_errors[0],
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        });
    }

    const getUpdatedList = (getUpdatedList) =>{
        props.getUpdatedGroupUser(getUpdatedList)
    }

    return (
        <>
            <Card>
                <CardBody>
                    {isLoading ? <PermissionLoader /> : null}                    
                    <Stack divider={<StackDivider />} spacing='4'>
                        {
                            props.groupList && props.groupList.map((group, index) => 
                                <Box key={index}>
                                    <Heading size='xs' textTransform='uppercase'>
                                        {group.name}
                                    </Heading>
                                    <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                                        {
                                            props.groupUserList && props.groupUserList.map((groupUser, groupIndex) => 
                                                groupUser.user_group === group.name ?
                                                <Box>
                                                    <Card>
                                                        <DeleteUser id={groupUser.id} groupName={group.name} personName={groupUser.user} getUpdatedList={getUpdatedList} />
                                                        <CardBody paddingBottom={'0px'}>
                                                            <Wrap>
                                                                <WrapItem mb={'0px'}>
                                                                    <Avatar
                                                                        size='sm'
                                                                        name={groupUser.user}
                                                                        src={''}
                                                                        mr={'10px'}
                                                                    />
                                                                    <Box>
                                                                        <Text as={'p'} display={'block'} color={'blue'} marginBottom={'0'}>
                                                                            {groupUser.user}
                                                                        </Text>
                                                                        <Box className={Styles.lineBreak}>
                                                                            {groupUser.username}
                                                                        </Box>
                                                                    </Box>
                                                                </WrapItem>
                                                            </Wrap>
                                                        </CardBody>
                                                    </Card>
                                                </Box> : null
                                            )
                                        }
                                        <Box>
                                            <Stack spacing={3}>
                                                <Select variant='filled' id={group.id} name={props.assignedRole} onChange={addUser} placeholder='Add user from below list'>
                                                    {
                                                        users && users.map(item => 
                                                            item.first_name !== '' && item.last_name !== '' ?
                                                            <option value={item.id}> {item.first_name} {item.last_name} </option> :
                                                            <option value={item.id}> {item.email} </option>
                                                        )
                                                    }
                                                </Select>
                                            </Stack>
                                        </Box>
                                    </SimpleGrid>
                                </Box>
                            )
                        }
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}

export default UserGroupList