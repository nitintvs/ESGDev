import React, { useState, useEffect, useRef, useMemo } from 'react';
import $ from 'jquery'
import Styles from '../metricdata.module.css'
import API from '../../../../Services/API';
import Select from 'react-select';
import { IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Card,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Checkbox, 
    Stack,
    Textarea,
    Text,
    Button
} from '@chakra-ui/react'
import LoaderSpinner from '../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const EditMetricData = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState()
    const [message, setMessage] = useState()
    const [defaultSelectedValue, setDefaultSelectedValue] = useState(null);
    const [defaultSelectedLabel, setDefaultSelectedLabel] = useState('');
    const [selectedOptions, setSelectedOptions] = useState();

    const [selectedMetric, setSelectedMetric] = useState(props.metricName)
    const [selectedPeriod, setSelectedPeriod] = useState(props.period)
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
    

    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };

    const updateMetric = (event) => {
        setIsLoading(true)
        const body = {
          "id": parseInt(props.id),
          "name": selectedMetric,
          "approval_status": selectedApproval,
          "value": $('#updateValue').val(),
          //"fiscal_year": parseInt(selectedPeriod),
          //"fiscal_quarter": selectedPeriod,
          //"geography": $('#updateGeography').val(),
          "metric_status": selectedStatus
        }
        API.put(`/metric-data`,body, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response=>{
          API.get(`/my-task`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }).then(response=>{
              props.getUpdatedPending(response.data)
              props.getMessage(true)
              onClose()
              setIsLoading(false)
          })
        })
    }

    const changeMetric = (event) =>{
        setSelectedMetric(event.label)
    }

    const changePeriod = (event) =>{
        setSelectedPeriod(event.value)
    }

    const changeStatus = (event) =>{
        setSelectedStatus(event.value)
    }

    const changeApproval = (event) =>{
        setSelectedApproval(event.value)
    }

    return ( 
        <>
            {isLoading ? <LoaderSpinner /> : null}
            <IconButton
                variant='solid'
                aria-label='Done'
                fontSize='15px'
                icon={<EditIcon />}
                className={Styles.edit} id={props.id}
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose}  closeOnOverlayClick={false}>
                <ModalOverlay className={Styles.overLay} />
                <ModalContent className={Styles.contentZindex} top={'0'}>
                    <ModalCloseButton />
                    <ModalHeader className={Styles.modelHeader}>
                        Metric Data
                    </ModalHeader>
                    <ModalBody>
                        <FormControl mb={'15px'}>
                            <FormLabel> Metric </FormLabel>
                            <Select
                                options={metricData}
                                //value={selectedOptions}
                                onChange={changeMetric}
                                //defaultValue={props.metricName}
                                defaultValue={metricData && metricData.find(option => option.label === selectedMetric)}
                            />
                        </FormControl>

                        <FormControl mb={'15px'}>
                            <FormLabel> Period (FY) </FormLabel>
                            <Select
                                options={fiscalYearDetail}
                                //value={selectedOptions}
                                onChange={changePeriod}
                                //defaultValue={props.metricName}
                                defaultValue={fiscalYearDetail && fiscalYearDetail.find(option => option.label === selectedPeriod)}
                            />
                        </FormControl>
                        {/* <FormControl mb={'15px'}>
                            <FormLabel> Period (FQ) </FormLabel>
                            <Select
                                options={fiscalYearQtrDetail}
                                //value={selectedOptions}
                                onChange={changePeriod}
                                //defaultValue={props.metricName}
                                defaultValue={fiscalYearQtrDetail.find(option => option.label === selectedPeriod)}
                            />
                        </FormControl> */}
                        <FormControl mb={'15px'}>
                            <FormLabel> Value </FormLabel>
                            <Input id="updateValue" defaultValue={props.value} />
                        </FormControl>
                        <FormControl mb={'15px'}>
                            <FormLabel> Geography </FormLabel>
                            <Input id="updateGeography" defaultValue={props.geography} />
                        </FormControl>
                        <FormControl mb={'15px'}>
                            <FormLabel> Status </FormLabel>
                            <Select
                                options={statusOptions}
                                //value={selectedOptions}
                                onChange={changeStatus}
                                //defaultValue={props.metricName}
                                defaultValue={statusOptions && statusOptions.find(option => option.value === selectedStatus)}
                            />
                        </FormControl>
                        <FormControl mb={'15px'}>
                            <FormLabel> Approval </FormLabel>
                            <Select
                                options={approvalOptions}
                                //value={selectedOptions}
                                onChange={changeApproval}
                                //defaultValue={props.metricName}
                                defaultValue={approvalOptions && approvalOptions.find(option => option.value === selectedApproval)}
                            />
                        </FormControl>

                    </ModalBody>
                    <ModalFooter className={Styles.modelFooter}>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className={Styles.confirmButton} id={props.id} onClick={updateMetric}>Update</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditMetricData