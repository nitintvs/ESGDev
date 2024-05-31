import React, { useEffect, useState } from 'react'
import Styles from './metric.module.css'
import API from '../../../Services/API'
import $ from 'jquery'
import { Link } from 'react-router-dom';
import { Heading, Card, CardBody, Box, Select, Text, Stack, StackDivider, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid} from '@chakra-ui/react'
import AreaChartComponent from '../../../Components/Modules/Charts/AreaChartComponent';

const Metrics = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [projectModules, setProjectModules] = useState()
    const [opsMetrics, setOpsMetrics] = useState()

    return (
        <>
            <Heading className={Styles.cardTitle}>Dashboard</Heading>
            <Text> Here you can see all the SIO metrics for the selected quarter. </Text>
            <Card mt={'0px'}>
                <CardBody>
                    <Box float={'right'} width={'350px'} position={'relative'} zIndex={'9999'}>
                        <Select variant='outline' placeholder='Outline' className={Styles.selectYear} />    
                    </Box>
                    <Box float={'left'} width={'100%'} mt={'-30px'}>
                        <Tabs variant='enclosed'>
                            <TabList>
                                <Tab>Ops Metrics</Tab>
                                <Tab>Financials</Tab>
                                <Tab>Impact Metrics</Tab>
                                <Tab>Board Metrics</Tab>
                                <Tab>All Metrics</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Stack divider={<StackDivider />} spacing='4'>
                                        {
                                            props.pillarActions && props.pillarActions.map(action  => 
                                                <Box>
                                                    <Heading textTransform='capitalize' className={Styles.cardTitleSub}>
                                                        {action.name}
                                                    </Heading>
                                                    <SimpleGrid columns={[1, 2, 3]} spacing='20px' mt={'10px'}>
                                                        {
                                                            props.opsMetrics && props.opsMetrics.map(metric => 
                                                                metric.action_id === action.id ?
                                                                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                                                    <Link className={Styles.teamLink} to={`/metric/${metric.id}/${metric.name}`}>
                                                                        <Box p={'10px'}>
                                                                            <Heading as='h5' size='sm' color={'blue'}>
                                                                                {metric.name}
                                                                            </Heading>
                                                                            <AreaChartComponent chartData={metric?.chart_value?.result} />
                                                                        </Box>
                                                                    </Link>
                                                                </Box> : null
                                                            )
                                                        }
                                                    </SimpleGrid>
                                                </Box>
                                            )
                                        }
                                        {
                                            <Box>
                                                <Heading textTransform='capitalize' className={Styles.cardTitleSub}>
                                                    Individual Metrics
                                                </Heading>
                                                <SimpleGrid columns={[1, 2, 3]} spacing='20px' mt={'10px'}>
                                                    {
                                                        props.opsMetrics && props.opsMetrics.map(metric => 
                                                            metric.action_id === null ?
                                                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                                                <Link className={Styles.teamLink} to={`/metric/${metric.id}/${metric.name}`}>
                                                                    <Box p={'10px'}>
                                                                        <Heading as='h5' size='sm' color={'blue'}>
                                                                            {metric.name}
                                                                        </Heading>
                                                                        <AreaChartComponent chartData={metric?.chart_value?.result} />
                                                                    </Box>
                                                                </Link>
                                                            </Box>: null
                                                        )
                                                    }
                                                </SimpleGrid>                                                
                                            </Box>
                                        }
                                    </Stack>
                                </TabPanel>
                                <TabPanel>
                                    <SimpleGrid columns={[1, 2, 3]} spacing='20px' mt={'10px'}>
                                        {
                                            props.financialMetrics && props.financialMetrics.map(metric => 
                                                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                                    <Link className={Styles.teamLink} to={``}>
                                                        <Box p={'10px'}>
                                                            <Heading as='h5' size='sm' color={'blue'}>
                                                                {metric.name}
                                                            </Heading>
                                                            <AreaChartComponent chartData={metric?.chart_value?.result} />
                                                        </Box>
                                                    </Link>
                                                </Box>
                                            )
                                        }
                                            
                                    </SimpleGrid>
                                </TabPanel>
                                <TabPanel>
                                    <SimpleGrid columns={[1, 2, 3, 5]} spacing='20px' mt={'10px'}>
                                        There is no relevent data
                                    </SimpleGrid>
                                </TabPanel>
                                <TabPanel>
                                    <SimpleGrid columns={[1, 2, 3, 5]} spacing='20px' mt={'10px'}>
                                        There is no relevent data
                                    </SimpleGrid>
                                </TabPanel>
                                <TabPanel>
                                    <SimpleGrid columns={[1, 2, 3, 5]} spacing='20px' mt={'10px'}>
                                        There is no relevent data
                                    </SimpleGrid>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </CardBody>
            </Card>
        </>
    )
}

export default Metrics