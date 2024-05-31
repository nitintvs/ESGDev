import React, { useEffect, useState } from 'react'
import API from '../../../../../Services/API'
import { useParams } from 'react-router-dom'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading,
    Text
} from '@chakra-ui/react'


const MetricData = () => {
    const token = window.localStorage.getItem("accessToken")
    const {yearid} = useParams();
    const {name} = useParams();
    const [metric, setMetric]  =useState()

    useEffect(()=>{
        document.documentElement.scrollTo(0, 0);
        API.get(`/get-metric-data-fiscal-year?fiscal_year=${yearid}`, {
            headers: {
            'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            console.log('response.data 1258', response.data)
            setMetric(response.data)
        })
    },[])


    return (
        <>
            <Heading mt={'15px'} >
                <Text> Metric Data </Text>
            </Heading>
            <TableContainer mt={'15px'} backgroundColor={'#ffffff'}>
                <Table size='sm' colorScheme='teal' border="2px solid" borderColor="gray.200" rounded="md">
                    <Thead backgroundColor={'#00a0da'} color={'#ffffff'}>
                        <Tr>
                            <Th color={'#ffffff'} p={'10px 15px'}>Value</Th>
                            <Th color={'#ffffff'} p={'10px 15px'}>Status</Th>
                            <Th color={'#ffffff'} p={'10px 15px'}>Geography	</Th>
                            <Th color={'#ffffff'} p={'10px 15px'}>Period</Th>
                            <Th color={'#ffffff'} p={'10px 15px'}>Metric</Th>
                            <Th color={'#ffffff'} p={'10px 15px'}>Approval</Th>
                            <Th color={'#ffffff'} p={'10px 15px'}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            metric && metric.map(item=>
                                <Tr>
                                    <Td>{item.value}</Td>
                                    <Td></Td>
                                    <Td>{item.geography}</Td>
                                    <Td>{name}</Td>
                                    <Td>{item.name}</Td>
                                    <Td>{item.approval_status}</Td>
                                    <Td></Td>                            
                                </Tr>
                            )
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default MetricData