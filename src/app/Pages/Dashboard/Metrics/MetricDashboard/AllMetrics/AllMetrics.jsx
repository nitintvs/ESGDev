import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Styles from './allmetrics.module.css'
import API from '../../../../../Services/API';
import {Heading, SimpleGrid, Box, } from '@chakra-ui/react'
import AreaChartComponent from '../../../../../Components/Modules/Charts/AreaChartComponent';
import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'
import TabLoader from '../../../../../Components/Widgets/CommonWidgets/TabLoader/TabLoader';

const AllMetrics = (props) => {
  const token = window.localStorage.getItem("accessToken")
  const [isLoading, setIsLoading]  = useState(false)
  const [allMetrics, setAllMetrics] = useState()

  useEffect(() => {
    setIsLoading(true)
    API.get(`/metric`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response1=>{
      setAllMetrics(response1.data)
      setIsLoading(false)
    })

    setIsLoading(true)
    props.metricType(`allmetric`)
    props.emptyMetric()
    console.log("ghskjfhglkj", props.selectedOption?.name && props.selectedOption.name)
    if(props.selectedOption?.name && props.selectedOption.name ==='year'){
      API.get(`/metric-filter?fiscal_year=${props.selectedOption?.value && props.selectedOption.value}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response1=>{
        setAllMetrics(response1.data)
        setIsLoading(false)
      })
    }else if(props.selectedOption?.name && props.selectedOption.name ==='qtr'){
      API.get(`/metric-filter?fiscal_qtr=${props.selectedOption?.value && props.selectedOption.value}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response1=>{
        setAllMetrics(response1.data)
        setIsLoading(false)
      })
    }else{
      API.get(`/metric`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response1=>{
        setAllMetrics(response1.data)
        setIsLoading(false)
      })
    }

  },[])
  

  return (
    <>
      {isLoading ? <TabLoader /> : null}
      {props.isLoading && props.isLoading ? <TabLoader /> : null}
      {
        <Box>
          {
            props.filterStatus && props.filterStatus === 1 ?              
            <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
              {
                props.metric && props.metric.map(metric => 
                  <Box maxW='sm' borderWidth='1px' borderRadius='lg'>
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
            </SimpleGrid> : 
            <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
              {
                allMetrics && allMetrics.map(metric => 
                  <Box maxW='sm' borderWidth='1px' borderRadius='lg'>
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
          }
          {
            props.filterStatus && props.filterStatus === 1 ? 
            <>
              {props.metric.length === 0 ? <Box className='successInfoNew'> There are no metric(s) assigned to this action yet. </Box> : null } 
            </> : 
            <>
              {allMetrics?.length === 0 ? <Box className='successInfoNew'> There are no metric(s) assigned to this action yet. </Box> : null } 
            </>
          }
        </Box>
      }
    </>
  )
}

export default AllMetrics