import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Styles from './impactgalleryitems.module.css'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button, Box} from '@chakra-ui/react'
import { List, ListItem, ListIcon, OrderedList, UnorderedList,} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import API from '../../../Services/API'
import {useDisclosure} from '@chakra-ui/react'
import LoaderSpinner from '../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'
import { capitalize } from '@mui/material';
import { IconButton } from '@chakra-ui/react'

const ImpactGalleryItems = () => {
  const token = window.localStorage.getItem("accessToken")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState()
  const [blogList, setBlogList] = useState()

  useEffect(()=>{
    document.documentElement.scrollTo(0, 0);
    setIsLoading(true)
    API.get(`/blog`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response=>{
      setBlogList(response.data)
    })
  },[])


  return (
    <>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr className={Styles.tr}>
              <Th className={Styles.th}>Title</Th>
              <Th className={Styles.th}>Pillars</Th>
              <Th className={Styles.th}>Regions</Th>
              <Th className={Styles.th}>Countries</Th>
              <Th className={Styles.th}>Approval</Th>
              <Th className={Styles.th}>Ancestors</Th>
              <Th className={Styles.th}>Actions</Th>
              <Th className={Styles.th}>Approve</Th>
            </Tr>
          </Thead>
          <Tbody textTransform={'capitalize'}>
            {
              blogList && blogList.map(blog => 
                <Tr>
                  <Td>
                    <Box className={Styles.tdBox} w={'115px'}>
                      <Link to={`viewpost/${blog.id}/${blog.title}`} title={blog.title}>
                        {blog.title}
                      </Link>
                    </Box>
                  </Td>
                  <Td>
                    <Box className={Styles.tdBox} w={'120px'}>
                      <UnorderedList>
                        {
                          blog.blog_pillar && blog.blog_pillar.map(pillar =>
                            <ListItem>
                              <Link to={`pillar/${pillar.module}/${pillar.name}`}>
                                {pillar.name}
                              </Link>
                            </ListItem>
                          )
                        }
                      </UnorderedList>
                    </Box>
                  </Td>
                  <Td>
                    <Box className={Styles.tdBox}>
                      <UnorderedList>
                        {
                          blog.blog_region && blog.blog_region.map(region =>
                            <ListItem>
                              <Link>
                                {region.name}
                              </Link>
                            </ListItem>
                          )
                        }
                      </UnorderedList>
                    </Box>
                  </Td>
                  <Td>
                    <Box className={Styles.tdBox}>
                      <UnorderedList>
                        {
                          blog.blog_country && blog.blog_country.map(country =>
                            <ListItem>
                              <Link>
                                {country.name}
                              </Link>
                            </ListItem>
                          )
                        }
                      </UnorderedList>
                    </Box>
                  </Td>
                  <Td>
                    <Box className={Styles.tdBox}>
                      {blog.approval_status}
                    </Box>
                  </Td>
                  <Td>
                    <Box className={Styles.tdBox}>
                      {blog.author}
                    </Box>
                  </Td>
                  <Td>
                    <Box className={Styles.tdBox} w={'115px'}>
                      <UnorderedList>
                        {
                          blog.blog_action && blog.blog_action.map(action =>
                            <ListItem>
                              <Link to={`action/${action.module}/${action.name}`}>
                                {action.name}
                              </Link>
                            </ListItem>
                          )
                        }
                      </UnorderedList>
                    </Box>
                    
                  </Td>
                  <Td></Td>
                </Tr>
              )
            }
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ImpactGalleryItems