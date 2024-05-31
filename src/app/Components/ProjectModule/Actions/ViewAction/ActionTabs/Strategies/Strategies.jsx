import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from './style.module.css'
import $ from 'jquery'
import API from '../../../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import {Card, SimpleGrid, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import AreaChartComponent from '../../../../../Modules/Charts/AreaChartComponent';
import CreateStrategy from './CreateStrategy/CreateStrategy';
import DeleteStrategy from './CreateStrategy/DeleteStrategy/DeleteStrategy';

const Strategies = (props) => {
  const token = window.localStorage.getItem("accessToken")
  const [isLoading, setIsLoading]  = useState(true)
  const [editable, setEditable] = useState();
  const [strategies, setStrategies] = useState();
  const [length, setLength] = useState();
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [message, setMessage] = useState(false);
  
  
  useEffect(() => {
    setIsLoading(true)
    API.get(`/strategy?action_id=${props.actionId && props.actionId}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      setStrategies(response.data)
      setLength(response.data.length)
      setIsLoading(false)
    })
  },[props.actionId])

  const getUpdate = (strategies) =>{
    setStrategies(strategies)
    setLength(strategies.length)
    setMessage(true)
  }

  const getDeleteUpdate = () =>{
    setDeleteMessage(true)
  }

  return (
    <>
      { 
        isLoading ? <LoaderSpinner />: null
      }
      {
        length === 0 ? <Box className={Styles.info}> There are no strategies(s) assigned to this action yet. </Box> : null
      }
      {/* {
        deleteMessage ? 
      } */}
      {
        message && deleteMessage ? 
        <Box className='successInfoNew' float={'left'} width={'80%'}> 
            Created Strategy Successfully 
        </Box> : deleteMessage ? <Box className='successInfoNew' float={'left'} width={'80%'}> 
            Deleted Strategy Successfully 
        </Box> : null
      }
      {
        <Box>
          {
            props.editable ? <CreateStrategy actionId={props.actionId && props.actionId} getUpdate={getUpdate} /> : null
          }
          <Box className='clearfix'></Box>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
            {
              strategies && strategies.map(metric => 
                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                  {props.editable ?
                    <DeleteStrategy id={metric.id} actionId={props.actionId && props.actionId} getUpdate={getUpdate} getDeleteUpdate={getDeleteUpdate} /> : null
                  }
                  <Link className={Styles.teamLink} to={`strategy/${metric.id}/${encodeURIComponent(metric.name)}`}>
                    <Box p={'10px'}>
                      <Heading as='h5' size='sm' className={Styles.metricTitle}>
                        {metric.name}
                      </Heading>
                      {/* <AreaChartComponent chartData={metric?.chart_value?.result} /> */}
                    </Box>
                  </Link>
                </Box>
              )
            }
          </SimpleGrid>
        </Box>
      }
    </>
  )
}

export default Strategies