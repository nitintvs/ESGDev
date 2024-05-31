import {React, useEffect, useState} from 'react'
import Styles from './users.module.css'
import API from '../../../Services/API'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, Text, Box, Avatar, AvatarBadge, AvatarGroup, Wrap, WrapItem, Select, Stack, } from '@chakra-ui/react'
import CreateUser from './CreateUser/CreateUser'
import UserSearch from './UserSearch/UserSearch'
import Role from './Role/Role'
import UserActions from './UserActions/UserActions'
import defaultAvatarImg from '../../../../assets/images/defaultAvatar.png'
import LoaderSpinner from '../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import userPlaceholder from '../../../../assets/images/userPlaceholder.svg'


const Users = () => {
    const token = window.localStorage.getItem("accessToken")
    const [users, setUsers] = useState()
    const [role, setRole] = useState()
    const [isLoading, setIsLoading] = useState(false)

    

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

        API.get(`/role`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setRole(response.data)
        })
        .catch(error => {
           
        });
    },[])

    const getUpdatedUserInfo = (getUpdatedUserInfo) =>{
        setUsers(getUpdatedUserInfo)
    }

    return (
        <>
            <UserSearch />
            <CreateUser /> 
            <TableContainer className={Styles.userTableContainer}>
                <Table id='userTable' variant='simple' colorScheme='teal'>
                    <Thead>
                        <Tr className={Styles.theadTr}>
                            <Th>Name</Th>
                            <Th>Role</Th>
                            <Th isNumeric>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            isLoading ? 
                                <>
                                    <Tr overflow={'hidden'}>
                                        <Td>
                                            <Box display={'flex'}>
                                                <SkeletonCircle size='10' float={'left'} />
                                                <SkeletonText float={'left'} width={'320px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton height='30px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton w={'48px'} height='40px' float={'right'}/>
                                                <Skeleton w={'48px'} height='40px' float={'right'} mr={'10px'}  />
                                            </Box>
                                        </Td>
                                    </Tr>
                                    <Tr overflow={'hidden'}>
                                        <Td>
                                            <Box display={'flex'}>
                                                <SkeletonCircle size='10' float={'left'} />
                                                <SkeletonText float={'left'} width={'320px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton height='30px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton w={'48px'} height='40px' float={'right'}/>
                                                <Skeleton w={'48px'} height='40px' float={'right'} mr={'10px'}  />
                                            </Box>
                                        </Td>
                                    </Tr>
                                    <Tr overflow={'hidden'}>
                                        <Td>
                                            <Box display={'flex'}>
                                                <SkeletonCircle size='10' float={'left'} />
                                                <SkeletonText float={'left'} width={'320px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton height='30px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton w={'48px'} height='40px' float={'right'}/>
                                                <Skeleton w={'48px'} height='40px' float={'right'} mr={'10px'}  />
                                            </Box>
                                        </Td>
                                    </Tr>
                                    <Tr overflow={'hidden'}>
                                        <Td>
                                            <Box display={'flex'}>
                                                <SkeletonCircle size='10' float={'left'} />
                                                <SkeletonText float={'left'} width={'320px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton height='30px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton w={'48px'} height='40px' float={'right'}/>
                                                <Skeleton w={'48px'} height='40px' float={'right'} mr={'10px'}  />
                                            </Box>
                                        </Td>
                                    </Tr>
                                    <Tr overflow={'hidden'}>
                                        <Td>
                                            <Box display={'flex'}>
                                                <SkeletonCircle size='10' float={'left'} />
                                                <SkeletonText float={'left'} width={'320px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton height='30px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton w={'48px'} height='40px' float={'right'}/>
                                                <Skeleton w={'48px'} height='40px' float={'right'} mr={'10px'}  />
                                            </Box>
                                        </Td>
                                    </Tr>
                                    <Tr overflow={'hidden'}>
                                        <Td>
                                            <Box display={'flex'}>
                                                <SkeletonCircle size='10' float={'left'} />
                                                <SkeletonText float={'left'} width={'320px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton height='30px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton w={'48px'} height='40px' float={'right'}/>
                                                <Skeleton w={'48px'} height='40px' float={'right'} mr={'10px'}  />
                                            </Box>
                                        </Td>
                                    </Tr>
                                    <Tr overflow={'hidden'}>
                                        <Td>
                                            <Box display={'flex'}>
                                                <SkeletonCircle size='10' float={'left'} />
                                                <SkeletonText float={'left'} width={'320px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton height='30px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton w={'48px'} height='40px' float={'right'}/>
                                                <Skeleton w={'48px'} height='40px' float={'right'} mr={'10px'}  />
                                            </Box>
                                        </Td>
                                    </Tr>
                                    <Tr overflow={'hidden'}>
                                        <Td>
                                            <Box display={'flex'}>
                                                <SkeletonCircle size='10' float={'left'} />
                                                <SkeletonText float={'left'} width={'320px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton height='30px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton w={'48px'} height='40px' float={'right'}/>
                                                <Skeleton w={'48px'} height='40px' float={'right'} mr={'10px'}  />
                                            </Box>
                                        </Td>
                                    </Tr>
                                    <Tr overflow={'hidden'}>
                                        <Td>
                                            <Box display={'flex'}>
                                                <SkeletonCircle size='10' float={'left'} />
                                                <SkeletonText float={'left'} width={'320px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton height='30px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton w={'48px'} height='40px' float={'right'}/>
                                                <Skeleton w={'48px'} height='40px' float={'right'} mr={'10px'}  />
                                            </Box>
                                        </Td>
                                    </Tr>
                                    <Tr overflow={'hidden'}>
                                        <Td>
                                            <Box display={'flex'}>
                                                <SkeletonCircle size='10' float={'left'} />
                                                <SkeletonText float={'left'} width={'320px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton height='30px' />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Box width={'320px'}>
                                                <Skeleton w={'48px'} height='40px' float={'right'}/>
                                                <Skeleton w={'48px'} height='40px' float={'right'} mr={'10px'}  />
                                            </Box>
                                        </Td>
                                    </Tr>
                                </> :
                            users && users.map((user, index)=> 
                                <Tr>
                                    <Td pb={'0px'} headers={user.first_name+" "+user.last_name} width={'480px'}>
                                        <Box>
                                            <Wrap>
                                                <WrapItem>
                                                    <Avatar
                                                        size='md'
                                                        name={((user.first_name !== "") && (user.last_name !== "") ? user.first_name + user.last_name : user.email)}
                                                        src={user.profile_picture ? user.profile_picture : userPlaceholder}
                                                        mr={'10px'}
                                                    />
                                                    <Box>
                                                        <Text as={'p'} display={'block'} marginBottom={'0'}>
                                                            {user.first_name} {user.last_name} 
                                                        </Text>
                                                        <Text as={'span'}>
                                                            {user.email}
                                                        </Text>
                                                    </Box>
                                                </WrapItem>
                                            </Wrap>
                                        </Box> 
                                    </Td>
                                    <Role id={user.id} assignedRole={user.role} role={role} />
                                    <UserActions id={user.id} firstName={user.first_name} lastName={user.last_name} getUpdatedUserInfo={getUpdatedUserInfo} />
                                </Tr>    
                            )
                        }
                        
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Users
