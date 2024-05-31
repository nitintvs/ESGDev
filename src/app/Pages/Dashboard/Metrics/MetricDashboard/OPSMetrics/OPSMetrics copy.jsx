import React, { useState, useEffect, useRef, useMemo } from 'react';
import $ from 'jquery'
import { Link } from 'react-router-dom';
import Styles from './styles.module.css'
import API from '../../../../../Services/API';
import {Heading, SimpleGrid, Box, Skeleton, SkeletonCircle, SkeletonText, Stack} from '@chakra-ui/react'
import AreaChartComponent from '../../../../../Components/Modules/Charts/AreaChartComponent';
import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'

const OPSMetrics = (props) => {
  const token = window.localStorage.getItem("accessToken")
  const [isLoading, setIsLoading]  = useState(false)
  const [opsMetrics, setOpsMetrics] = useState()
  const loopCardRef = useRef(null);
  const [matchedData, setMatchedData] = useState([]);

  useEffect(() => {
    setIsLoading(true)
    props.metricType(`operational`)
    props.emptyMetric()

    API.get(`/get-pillar-action`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response=>{

      API.get(`/metric?query=operational`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response1=>{
        setOpsMetrics(response1.data)
        const matchedDataArray = response.data && response.data.filter(data1Obj =>
          response1.data && response1.data.some(dataObj => dataObj.action_id === data1Obj.id)
        );
        setMatchedData(matchedDataArray);
        setIsLoading(false)
      })

      if(props.selectedOption?.name && props.selectedOption.name ==='year'){
        API.get(`/metric-filter?query=operational&fiscal_year=${props.selectedOption?.value && props.selectedOption.value}`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response1=>{
          setOpsMetrics(response1.data)
          const matchedDataArray = response.data && response.data.filter(data1Obj =>
            response1.data && response1.data.some(dataObj => dataObj.action_id === data1Obj.id)
          );
          setMatchedData(matchedDataArray);
          setIsLoading(false)
        })
      }else if(props.selectedOption?.name && props.selectedOption.name ==='qtr'){
        API.get(`/metric-filter?query=operational&fiscal_qtr=${props.selectedOption?.value && props.selectedOption.value}`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response1=>{
          setOpsMetrics(response1.data)
          const matchedDataArray = response.data && response.data.filter(data1Obj =>
            response1.data && response1.data.some(dataObj => dataObj.action_id === data1Obj.id)
          );
          setMatchedData(matchedDataArray);
          setIsLoading(false)
        })
      }else{
        API.get(`/metric?query=operational`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response1=>{
          setOpsMetrics(response1.data)
          const matchedDataArray = response.data && response.data.filter(data1Obj =>
            response1.data && response1.data.some(dataObj => dataObj.action_id === data1Obj.id)
          );
          setMatchedData(matchedDataArray);
          setIsLoading(false)
        })
      }
    })
  },[])

  console.log('props.matchedData', props.matchedData)

  return (
    <>
      {
        isLoading ? 
          <>
            <Stack>
              <Skeleton height='20px' />
            </Stack>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'} className='loopCard' ref={loopCardRef}>
              <Skeleton height='200px' />
              <Skeleton height='200px' />
              <Skeleton height='200px' />
              <Skeleton height='200px' />
            </SimpleGrid>
          </>
        : 
        <>
          {
            props.matchedData && props.matchedData.map(action  =>
              <>
                <Box className='metricCard'>
                  <Heading textTransform='capitalize' className={Styles.cardTitleSub}>
                    {action.name}
                  </Heading>
                  {
                    props.filterStatus && props.filterStatus === 1 ?
                      <SimpleGrid className={'matchHide'} columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                        {
                          props.metric && props.metric.map(metric =>
                            metric.action_id === action.id ? 
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
                            : null
                          )
                        }
                      </SimpleGrid> 
                    : null
                  }
                </Box>
              </>
            )
          }







          {
            matchedData && matchedData.map(action  =>
              <>
                <Box className='metricCard'>
                  <Heading textTransform='capitalize' className={Styles.cardTitleSub}>
                    {action.name}
                  </Heading>
                  {
                    props.filterStatus && props.filterStatus === 1 ?
                    <SimpleGrid className={'matchHide'} columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                      {
                        props.metric && props.metric.map(metric =>
                          metric.action_id === action.id ? 
                          <Box maxW='sm' borderWidth='1px' borderRadius='lg'>
                              <Link className={Styles.teamLink} to={`/metric/${metric.id}/${encodeURIComponent(metric.name)}`}>
                                  <Box p={'10px'}>
                                      <Heading as='h5' size='sm' className={Styles.metricTitle}>
                                          {metric.name}
                                      </Heading>
                                      <AreaChartComponent chartData={metric?.chart_value?.result} />
                                  </Box>
                              </Link>
                          </Box> : null
                        )
                      }
                    </SimpleGrid> :
                    <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                      {
                        opsMetrics && opsMetrics.map(metric => 
                          metric.action_id === action.id ?
                          <Box maxW='sm' borderWidth='1px' borderRadius='lg'>
                              <Link className={Styles.teamLink} to={`/metric/${metric.id}/${encodeURIComponent(metric.name)}`}>
                                  <Box p={'10px'}>
                                      <Heading as='h5' size='sm' className={Styles.metricTitle}>
                                          {metric.name}
                                      </Heading>
                                      <AreaChartComponent chartData={metric?.chart_value?.result} />
                                  </Box>
                              </Link>
                          </Box>:null
                        )
                      }
                    </SimpleGrid>
                  }
                </Box>
              </>
            )
          }
          {
            <Box>
              <Heading textTransform='capitalize' className={Styles.cardTitleSub}>
                Individual Metrics
              </Heading>
              {
                isLoading ? 
                  <>
                    <Stack>
                      <Skeleton height='20px' />
                    </Stack>
                    <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'} className='loopCard' ref={loopCardRef}>
                      <Skeleton height='200px' />
                      <Skeleton height='200px' />
                      <Skeleton height='200px' />
                      <Skeleton height='200px' />
                    </SimpleGrid>
                  </>
                : null
              }

              {
                props.filterStatus && props.filterStatus === 1 ? 
                <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                  {
                    props.metric && props.metric.map(metric =>
                      metric.action_id === null ? 
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
                      : null
                    )
                  }
                </SimpleGrid> : 
                <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                  {
                    opsMetrics && opsMetrics.map(metric => 
                      metric.action_id === null ?
                      <Box maxW='sm' borderWidth='1px' borderRadius='lg'>
                          <Link className={Styles.teamLink} to={`/metric/${metric.id}/${encodeURIComponent(metric.name)}`}>
                              <Box p={'10px'}>
                                  <Heading as='h5' size='sm' className={Styles.metricTitle}>
                                      {metric.name}
                                  </Heading>
                                  <AreaChartComponent chartData={metric?.chart_value?.result} />
                              </Box>
                          </Link>
                      </Box>:null
                    )
                  }
                </SimpleGrid>
              }

              {/* <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                {
                  opsMetrics && opsMetrics.map(metric => 
                    metric.action_id === null ?
                    <Box maxW='sm' borderWidth='1px' borderRadius='lg'>
                      <Link className={Styles.teamLink} to={`/metric/${metric.id}/${encodeURIComponent(metric.name)}`}>
                        <Box p={'10px'}>
                          <Heading as='h5' size='sm' className={Styles.metricTitle}>
                            {metric.name}
                          </Heading>
                          <AreaChartComponent chartData={metric?.chart_value?.result} />
                        </Box>
                      </Link>
                    </Box>: null
                  )
                }
              </SimpleGrid> */}
            </Box>
          }
        </>
      }

      
    </>
  )
}

export default OPSMetrics














