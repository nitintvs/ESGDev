import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from './metric.module.css'
import $ from 'jquery'
import API from '../../../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import {Card, SimpleGrid, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import AreaChartComponent from '../../../../../Modules/Charts/AreaChartComponent';

const Metrics = (props) => {
  const token = window.localStorage.getItem("accessToken")
  const [isLoading, setIsLoading]  = useState(true)
  const [editable, setEditable] = useState();
  const [metrics, setMetrics] = useState();
  const [length, setLength] = useState();

  useEffect(() => {
    setIsLoading(true)
    API.get(`/metric?action_id=${props.actionId}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      setMetrics(response.data)
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
        length === 0 ? <Box className={Styles.info}> There are no metric(s) assigned to this action yet. </Box> : null
      }
      {
        <Box>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
            {
              metrics && metrics.map(metric => 
                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                  <Link className={Styles.teamLink} to={`/metric/${metric.id}/${encodeURIComponent(metric.name)}`}>
                    <Box p={'10px'}>
                      <Heading as='h5' size='sm' className={Styles.metricTitle}>
                        {metric.name}
                      </Heading>
                      <AreaChartComponent chartData={metric?.chart_value?.result} />
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

export default Metrics