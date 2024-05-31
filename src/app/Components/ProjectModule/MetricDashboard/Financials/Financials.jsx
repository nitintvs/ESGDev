import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Styles from './styles.module.css'
import API from '../../../../Services/API';
import {Heading, SimpleGrid, Box, FormControl, Switch, Card, CardHeader, CardBody, CardFooter, Image, Text, Input, Button,Wrap,WrapItem, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import AreaChartComponent from '../../../Modules/Charts/AreaChartComponent';
import LoaderSpinner from '../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import TabLoader from '../../../Widgets/CommonWidgets/TabLoader/TabLoader';

const Financials = (props) => {
  const token = window.localStorage.getItem("accessToken")
  const [isLoading, setIsLoading]  = useState(false)
  const [financialMetrics, setFinancialMetrics] = useState()
  const {id} = useParams();

  useEffect(() => {
    setIsLoading(true)
    props.metricType(`financial`)
    props.emptyMetric()
    if(props.selectedOption?.name && props.selectedOption.name ==='year'){
      console.log('year')
      API.get(`/metric-filter?pillar_id=${props.pillarId}&query=financial&fiscal_year=${props.selectedOption?.value && props.selectedOption.value}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response1=>{
        setFinancialMetrics(response1.data)
        setIsLoading(false)
      })
    }else if(props.selectedOption?.name && props.selectedOption.name ==='qtr'){
      console.log('qtr')
      API.get(`/metric-filter?pillar_id=${props.pillarId}&query=financial&fiscal_qtr=${props.selectedOption?.value && props.selectedOption.value}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response1=>{
        setFinancialMetrics(response1.data)
        setIsLoading(false)
      })
    }else{
      console.log('nothing')
      API.get(`/metric?pillar_id=${props.pillarId}&query=financial`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response1=>{
        setFinancialMetrics(response1.data)
        setIsLoading(false)
      })
    }
  },[id])
  

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
                financialMetrics && financialMetrics.map(metric => 
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
              {financialMetrics?.length === 0 ? <Box className='successInfoNew'> There are no metric(s) assigned to this action yet. </Box> : null } 
            </>
          }
        </Box>
      }
    </>
  )
}

export default Financials