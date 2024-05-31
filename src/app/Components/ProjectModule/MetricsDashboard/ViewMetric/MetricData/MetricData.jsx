import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom'
import Styles from '../viewmetric.module.css'
import API from '../../../../../Services/API';
import {Card, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image} from '@chakra-ui/react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, useDisclosure} from '@chakra-ui/react'
import CreateMetricData from './CreateMetricData/CreateMetricData';
import { EditIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import LoaderSpinner from '../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import EditMetricData from './EditMetricData/EditMetricData';
import DataFilter from './DataFilter/DataFilter';

const MetricData = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState()
    const {metricId} = useParams();
    const [deleteMessage, setDeleteMessage] = useState(false)
    const [allMetrics, setAllMetrics] = useState()
    const [fiscalYearDetail, setFiscalYearDetail] = useState()
    const [fiscalYearQtrDetail, setFiscalYearQtrDetail] = useState()

    useEffect(()=>{
        document.documentElement.scrollTo(0, 0);
        API.get(`/metric`, {
          headers: {
              'Authorization': 'Bearer ' + token
          }
        }).then(response1=>{
          setAllMetrics(response1.data)
        })
        API.get(`/fiscal-year-detail`, {
          headers: {
              'Authorization': 'Bearer ' + token
          }
        }).then(response=>{
          setFiscalYearDetail(response.data[0].fiscalyear)
          setFiscalYearQtrDetail(response.data[1].fiscalquarter)
          setIsLoading(false)
        })
    },[])

    const getMetricData = (getUpdatedMetricData) => {
        props.getUpdatedMetricData(getUpdatedMetricData)
    }

    const editAction = () => {

    }

    const deleteAction = (event) => {
        event.stopPropagation();
        onClose()
        setIsLoading(true)
        const body = {
          "id": parseInt(event.currentTarget.id),
          "visible": false,
        }
        API.put(`/metric-data`,body, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response=>{
            API.get(`/metric-data?metric_id=${metricId}`)
            .then(response1 => {
                props.getUpdatedMetricData(response1.data)
                setIsLoading(false)
                setDeleteMessage(true)
                setTimeout(() => {
                    setDeleteMessage(false)
                }, 10000); // Simulate a 2-second delay
            })
        })
    }

    const getUpdatedPending = (metricTask) =>{
        //setMetricData(metricTask)
    }
    
    const getMessage = (metricTask) =>{
        //setMessage(metricTask)
    }
    
    const updatedMessage = (metricTask) =>{
        //setGetUpMessage(metricTask)
    }



    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            {deleteMessage ? <Box className='successInfoNew'> Deleted Metric-Data Successfully </Box> : null}
                <Box>
                    <DataFilter
                        fiscalYearDetail={fiscalYearDetail && fiscalYearDetail} 
                        fiscalYearQtrDetail={fiscalYearQtrDetail && fiscalYearQtrDetail}
                    />
                </Box>
            <TableContainer>
                {props.editable ? <CreateMetricData getMetricData={getMetricData} /> : null}
                
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>Status</Th>
                            <Th>Geography</Th>
                            <Th>Value</Th>
                            <Th>Period - Fiscal Year</Th>
                            <Th>Period - Fiscal QTR</Th>
                            <Th>Metric</Th>
                            <Th>Approve</Th>
                            <Th>Action - elements</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            props.metricData && props.metricData.map((metridata, index) => 
                                <Tr>
                                    <Td textTransform={'capitalize'}>{metridata.metric_status.replace(/-/g, " ")}</Td>
                                    <Td textTransform={'capitalize'}>{metridata.geography}</Td>
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
                                    <Td textTransform={'capitalize'}>{metridata.fiscal_year_name}</Td>
                                    <Td textTransform={'capitalize'}>{metridata.fiscal_quarter_name}</Td>
                                    <Td textTransform={'capitalize'}>{metridata.name} {metridata.id}</Td>
                                    <Td textTransform={'capitalize'}>{metridata.approval_status}</Td>
                                    <Td> 
                                        {/* <Button mr={'10px'} className='editNButton' id={metridata.id} onClick={editAction}>
                                            <EditIcon id={metridata.id} onClick={editAction} />
                                        </Button> */}
                                        <EditMetricData 
                                            metricName={metridata.metric_name}
                                            period={metridata.fiscal_year}
                                            fyq={metridata.fiscal_quarter}
                                            periodName={metridata.fiscal_year_name}
                                            fyqName={metridata.fiscal_quarter_name}
                                            metricData={allMetrics && allMetrics}
                                            fiscalYearDetail={fiscalYearDetail}
                                            fiscalYearQtrDetail={fiscalYearQtrDetail}
                                            value={metridata.value}
                                            geography={metridata.geography}
                                            approvalStatus={metridata.approval_status}
                                            status = {metridata.metric_status}
                                            id={metridata.id}
                                            getUpdatedPending={getUpdatedPending}
                                            getMessage={updatedMessage}
                                            getUpdatedMetricData={props.getUpdatedMetricData}
                                        />
                                        <Button className='deleteNButton' id={metridata.id}  onClick={onOpen}>
                                            <DeleteIcon id={metridata.id} onClick={onOpen} /> 
                                        </Button>
                                        <Modal isOpen={isOpen} onClose={onClose}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>Delete Confirmation</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    Are you sure you want to delete <Text as='span' fontWeight={'bold'}>{metridata.name}</Text> ? This action cannot be reversed.
                                                </ModalBody>
                                                <ModalFooter backgroundColor={'transparent'}>
                                                    <Button mr={3} onClick={onClose}>
                                                        Cancel
                                                    </Button>
                                                    <Button className='buttonPrimary' id={metridata.id} onClick={deleteAction}>Confirm</Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </Td>
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