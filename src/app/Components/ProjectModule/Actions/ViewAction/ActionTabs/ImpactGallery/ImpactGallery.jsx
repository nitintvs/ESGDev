import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from '../actiontabs.module.css'
import $ from 'jquery'
import API from '../../../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import {Card, SimpleGrid, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Stack, Image} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import PlaceholderImg from '../../../../../../../assets/images/placeholder-1.png'

const ImpactGallery = (props) => {
  const token = window.localStorage.getItem("accessToken")
  const [isLoading, setIsLoading]  = useState(true)
  const [editable, setEditable] = useState();
  const [initiative, setInitiative] = useState()
  const [length, setLength] = useState();
  const {id} = useParams();
  const {name} = useParams();

  useEffect(() => {
    setIsLoading(true)
    API.get(`/blog?action_id=${props.actionId}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      console.log(response.data)
      setInitiative(response.data)
      setLength(response.data.length)
      setIsLoading(false)
    })
  },[props.actionId])
  return (
    <>
      { 
        isLoading ? <LoaderSpinner />: null
      }
      {
        length === 0 ? <Box className={Styles.info}> There are no impact gallery item(s) assigned to this action yet.</Box> : null
      }
      <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
          {
              initiative && initiative.map((item, index) => 
                <Box key={index}>
                <Link className={Styles.customLinkButton} to={`/portfolio/ig/${id}/${name}/viewpost/${item.id}/${item.title}`}>
                  <Card maxW='sm'>
                    <CardBody p={0}>
                      <Image
                        src={item.cover_image !== null ? item.cover_image : PlaceholderImg}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                      />
                      <Stack mt='6' spacing='3'>
                        <Heading size='sm' p={'0 10px'} className={Styles.listHeading}>{item.title}</Heading>
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              </Box>
              )
          }
      </SimpleGrid>
    </>
  )
}

export default ImpactGallery