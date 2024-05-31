import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Styles from './impactmetrics.module.css'
import API from '../../../../../Services/API';
import {Heading, SimpleGrid, Box, Flex, Switch, Card, CardHeader, CardBody, CardFooter, Image, Text, Input, Button,Wrap,WrapItem, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import AreaChartComponent from '../../../../../Components/Modules/Charts/AreaChartComponent';
import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'
import TabLoader from '../../../../../Components/Widgets/CommonWidgets/TabLoader/TabLoader';
import exImage from '../../../../../../assets/images/ex1.png'

const ImpactMetrics = (props) => {
  const token = window.localStorage.getItem("accessToken")
  const [isLoading, setIsLoading]  = useState(false)
  const [impactMetrics, setImpactMetrics] = useState()
  const [pillars, setPillars] = useState()

  

  useEffect(() => {
    setIsLoading(true)
    // API.get(`/metric?query=impact`, {
    //   headers: {
    //     'Authorization': 'Bearer ' + token
    //   }
    // }).then(response1=>{
    //   setImpactMetrics(response1.data)
    //   setIsLoading(false)
    // })
    API.get(`/sio-pillar`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response=>{
      const sortedPillars = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setPillars(sortedPillars)
    })

    props.metricType(`impact`)
    props.emptyMetric()
    if(props.selectedOption?.name && props.selectedOption.name ==='year'){
      API.get(`/metric-filter?query=impact&fiscal_year=${props.selectedOption?.value && props.selectedOption.value}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response1=>{
        setImpactMetrics(response1.data)
        setIsLoading(false)
      })
    }else if(props.selectedOption?.name && props.selectedOption.name ==='qtr'){
      API.get(`/metric-filter?query=impact&fiscal_qtr=${props.selectedOption?.value && props.selectedOption.value}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response1=>{
        setImpactMetrics(response1.data)
        setIsLoading(false)
      })
    }else{
      API.get(`/metric?query=impact`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response1=>{
        setImpactMetrics(response1.data)
        setIsLoading(false)
      })
    }

  },[])
  

  return (
    <>
      {isLoading ? <TabLoader /> : null}
      {props.isLoading && props.isLoading ? <TabLoader /> : null}

      <Box maxW={'940px'}>
        {
          pillars && pillars.map((list, index) =>
            <>
              <Heading className={Styles.newTitle}> {list.name} </Heading>
              <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'} mb={'20px'}>
                <Box className={Styles.commonElementStyle} backgroundColor={'rgb(244, 167, 163)'}>
                  <Link>
                    <Card maxW='100%' backgroundColor={'transparent'} p={'0px'} className={Styles.customCard}>
                      <CardHeader p={'0px'}>
                        <Flex spacing='4'>
                          <Flex flex='1' gap='2' alignItems='center' flexWrap='wrap'>
                            <Image src={exImage} w={'64px'} height={'64px'} />
                            <Box>
                              <Heading className={Styles.customHeadingNumber}>11</Heading>
                            </Box>
                            <Text className={Styles.customPara}>Disaster Campaigns Launched</Text>
                          </Flex>
                        </Flex>
                      </CardHeader>
                    </Card>
                  </Link>
                </Box>
                <Box className={Styles.commonElementStyle}>

                </Box>
                <Box className={Styles.commonElementStyle}>
                  
                </Box>
                <Box className={Styles.commonElementStyle}>
                  
                </Box>
              </SimpleGrid>
            </>          
          )
        }
        
      </Box>











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
                impactMetrics && impactMetrics.map(metric => 
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
              {impactMetrics?.length === 0 ? <Box className='successInfoNew'> There are no metric(s) assigned to this action yet. </Box> : null } 
            </>
          }
        </Box>
      }
    </>
  )
}

export default ImpactMetrics