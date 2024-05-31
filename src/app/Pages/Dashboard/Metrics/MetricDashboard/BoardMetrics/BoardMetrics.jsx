import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Styles from './boardmetrics.module.css'
import API from '../../../../../Services/API';
import {Heading, SimpleGrid, Box, FormControl, Switch, Card, CardHeader, CardBody, CardFooter, Image, Text, Input, Button,Wrap,WrapItem, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import AreaChartComponent from '../../../../../Components/Modules/Charts/AreaChartComponent';
import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'
import TabLoader from '../../../../../Components/Widgets/CommonWidgets/TabLoader/TabLoader';
const BoardMetrics = () => {
  const token = window.localStorage.getItem("accessToken")
  const [isLoading, setIsLoading]  = useState(false)
  const [boardMetrics, setBoardMetrics] = useState()

  useEffect(() => {
    
    API.get(`/metric?query=board`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response1=>{
      setBoardMetrics(response1.data)
      setIsLoading(false)
    })

  },[])
  

  return (
    <>
      {
        <Box>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
            {isLoading ? <TabLoader /> : null}
            {
              boardMetrics && boardMetrics.map(metric => 
                <Box maxW='sm' borderWidth='1px' borderRadius='lg'>
                  <Link className={Styles.teamLink} to={`/metric/${metric.id}/${encodeURIComponent(metric.name)}`}>
                    <Box p={'10px'}>
                      <Heading as='h5' size='sm'  className={Styles.metricTitle}>
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

export default BoardMetrics