import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from '../countryview.module.css'
import API from '../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import {
    Card, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image,
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Stack} from '@chakra-ui/react'
const Metric = () => {
    const token = window.localStorage.getItem("accessToken")
    const {countryId} = useParams();
    const [metric, setMetric] = useState()

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        API.get(`/metric-data?geography_id=${countryId}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            console.log(response.data)
            setMetric(response.data)
            // setCountryInfo(response.data[0])
            // setIsLoading(false)
        })
    },[countryId])
    return (
        <>
            <Card>
                <CardHeader pt={'0'} pb={'0'}>
                    <Heading className={Styles.customHeadingH3}> Metric Data </Heading>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table size='sm' className={Styles.table}>
                            <Thead>
                                <Tr backgroundColor={'#d2ecfc'}>
                                    <Th>Value</Th>
                                    <Th>Status</Th>
                                    <Th>Geography</Th>
                                    <Th>Period</Th>
                                    <Th>Metric</Th>
                                    <Th isNumeric>Approval</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    metric && metric.map((metridata, index)=>
                                        <Tr>
                                            <Td>
                                                { 
                                                    metridata.datatype === 'money' ? " $ " : 
                                                    metridata.datatype === 'number' ? " # " : null
                                                } 
                                                {metridata.value}
                                                {
                                                    metridata.datatype === 'percent' ? " % " : null
                                                }
                                            </Td>
                                            <Td textTransform={'capitalize'}>{metridata.metric_status.replace(/-/g, " ")}</Td>
                                            <Td textTransform={'capitalize'}>{metridata.geography}</Td>
                                            <Td textTransform={'capitalize'}>{metridata.fiscal_year_name}</Td>
                                            <Td textTransform={'capitalize'}>{metridata.name}</Td>
                                            <Td textTransform={'capitalize'} isNumeric>{metridata.approval_status}</Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>
        </>
    )
}

export default Metric