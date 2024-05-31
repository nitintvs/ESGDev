import React, { useState, useEffect, useRef, useMemo } from 'react';
import $ from 'jquery'
import Styles from '../aspirations.module.css'
import { Link, useParams } from 'react-router-dom'
import Select from 'react-select';
import {Grid,Card, CardHeader, CardBody, Heading, Switch, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image, FormControl, FormLabel, SimpleGrid} from '@chakra-ui/react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, useDisclosure} from '@chakra-ui/react'
import { EditIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import API from '../../../../../../Services/API';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import LoaderSpinner from '../../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const EditMetricData = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpenEdit, onOpenEdit, onCloseEdit } = useDisclosure()
    const [isLoading, setIsLoading] = useState()
    const {metricId} = useParams();
    const [aspirations, setAspirations] = useState()
    const [fiscalYearList, setFiscalYearList] = useState()
    const [fiscalQtrList, setFiscalQtrList] = useState()
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedFiscalYearList, setSelectedFiscalYearList] = useState()
    const [allow, setAllow] = useState(false)

    const [selectedMetric, setSelectedMetric] = useState(props.metricName)
    const [selectedPeriod, setSelectedPeriod] = useState(props.period)
    const [selectedFyq, setSelectedFyq] = useState(props.fyq)
    const [selectedStatus, setSelectedStatus] = useState(props.status)
    const [selectedApproval, setSelectedApproval] = useState(props.approvalStatus)
    

    const metricData = props.metricData && props.metricData.map(item => ({
        value: item.id,
        label: item.name
    }));

    const fiscalYearDetail = props.fiscalYearDetail && props.fiscalYearDetail.map(item => ({
        value: item.id,
        label: item.name
    }));

    const fiscalYearQtrDetail = props.fiscalYearQtrDetail && props.fiscalYearQtrDetail.map(item => ({
        value: item.id,
        label: item.name
    }));

    const statusOptions =[
        {value:'on-track', label:'On Track'},
        {value:'delay', label:'Delayed'},
        {value:'acceleration', label:'Acceleration'}
    ]

    const approvalOptions =[
        {value:'pending', label:'Pending'},
        {value:'approved', label:'Approved'},
        {value:'requirefollow-up', label:'Require Follow Up'},
        {value:'ingovernancereview', label:'In Governance Review'}
    ]

    const changeMetric = (event) =>{
        setSelectedMetric(event.label)
    }

    const changePeriod = (event) =>{
        setSelectedPeriod(event.value)
    }

    const changeFyq = (event) =>{
        setSelectedFyq(event.value)
    }

    const changeStatus = (event) =>{
        setSelectedStatus(event.value)
    }

    const changeApproval = (event) =>{
        setSelectedApproval(event.value)
    }

    const updateMetric = (event) => {
        setIsLoading(true)
        const body = {
          "id": parseInt(props.id),
          "name": selectedMetric,
          "approval_status": selectedApproval,
          "value": $('#updateValue').val(),
          "fiscal_year": parseInt(selectedPeriod),
          "fiscal_quarter": parseInt(selectedFyq),
          //"geography": $('#updateGeography').val(),
          "metric_status": selectedStatus
        }
        API.put(`/metric-data`,body, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response=>{
            API.get(`/metric-data?metric_id=${metricId}`)
            .then(response1 => {
                console.log(response1.data)
                props.getUpdatedMetricData(response1.data)
                onClose()
                setIsLoading(false)
            })
        })
    }

    const onHandleChange = (event) =>{
        setAllow(event.target.checked)
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            <Button mr={'10px'} className='editNButton' id={props.id} onClick={onOpen} >
                <EditIcon id={props.id} onClick={onOpen} />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW={'680px'}>
                    <ModalHeader>Metric Data</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SimpleGrid columns={[1, null, 2]} spacing='10px'>
                            <Box>
                                <FormControl mb={'15px'}>
                                    <FormLabel fontWeight={'bold'}> Metric </FormLabel>
                                    <Select
                                        options={metricData}
                                        onChange={changeMetric}
                                        defaultValue={metricData && metricData.find(option => option.label === selectedMetric)}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl mb={'15px'}>
                                    <FormLabel fontWeight={'bold'}> Value </FormLabel>
                                    <Input id="updateValue" defaultValue={props.value} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl mb={'15px'}>
                                    <FormLabel fontWeight={'bold'}> Period (FY) </FormLabel>
                                    <Select
                                        options={fiscalYearDetail}
                                        onChange={changePeriod}
                                        defaultValue={fiscalYearDetail && fiscalYearDetail.find(option => option.label === props.periodName)}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl mb={'15px'}>
                                    <FormLabel fontWeight={'bold'}> Period (FQ) </FormLabel>
                                    <Select
                                        options={fiscalYearQtrDetail}
                                        onChange={changeFyq}
                                        defaultValue={fiscalYearQtrDetail.find(option => option.label === props.fyqName)}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl mb={'15px'}>
                                    <FormLabel fontWeight={'bold'}> Status </FormLabel>
                                    <Select
                                        options={statusOptions}
                                        onChange={changeStatus}
                                        defaultValue={statusOptions && statusOptions.find(option => option.value === selectedStatus)}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl mb={'15px'}>
                                    <FormLabel fontWeight={'bold'}> Approval </FormLabel>
                                    <Select
                                        options={approvalOptions}
                                        onChange={changeApproval}
                                        defaultValue={approvalOptions && approvalOptions.find(option => option.value === selectedApproval)}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl mb={'15px'}>
                                    <FormLabel fontWeight={'bold'}> Geography </FormLabel>
                                    <Input id="updateGeography" defaultValue={props.geography} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl display='flex' alignItems='center' mt={'0px'}>
                                    <FormLabel fontWeight={'bold'} htmlFor='share_data_externally' mb='0'>
                                        Share Data Externally
                                    </FormLabel>
                                    <Switch id='share_data_externally' mt={'10px'} onChange={onHandleChange}  />
                                </FormControl>
                            </Box>
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter className={Styles.modelFooter} backgroundColor={'transparent'}>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className={Styles.confirmButton +' buttonPrimary'} id={props.id} onClick={updateMetric}>Update</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditMetricData