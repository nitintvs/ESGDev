import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from '../actiontabs.module.css'
import $ from 'jquery'
import API from '../../../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import {Card, SimpleGrid, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const Initiatives = (props) => {
  const token = window.localStorage.getItem("accessToken")
  const [isLoading, setIsLoading]  = useState(true)
  const [editable, setEditable] = useState();
  const [initiative, setInitiative] = useState()
  const [length, setLength] = useState();

  useEffect(() => {
    setIsLoading(true)
    API.get(`/initiative?action_id=${props.actionId}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
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
        length === 0 ? <Box className={Styles.info}> There are no initiative(s) assigned to this action yet. </Box> : null
      }
      <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
          {
              initiative && initiative.map(initiative => 
                  <Box maxW='sm' backgroundColor={'#e2e8f0'} borderWidth='1px' borderRadius='lg' overflow='hidden' height={'100px'}>
                      <Link className={Styles.valign} to={`initiative/${initiative.id}/${encodeURIComponent(initiative.name)}`}>
                          <Box p={'10px'}>
                              <Heading as='h5' size='sm'>
                                  {initiative.name}
                              </Heading>
                          </Box>
                      </Link>
                  </Box>
              )
          }
      </SimpleGrid>
    </>
  )
}

export default Initiatives