import React, { useState, useEffect, useRef, useMemo } from 'react';
import $ from 'jquery'
import Styles from '../aspirations.module.css'
import { Link, useParams } from 'react-router-dom'
import {Grid, Select, Card, CardHeader, CardBody, Heading, Switch, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image, FormControl, FormLabel} from '@chakra-ui/react'
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

const EditAspiration = (props) => {
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
    const [validationError, setValidationError] = useState({
        name: '',
        value: '',
        targetfiscalyear: '',
        targetfiscalquarter: '',
    });

    useEffect(()=>{
        API.get(`/fiscal-year-detail`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
            setFiscalYearList(response.data[0].fiscalyear)
            setFiscalQtrList(response.data[1].fiscalquarter)
        })
    },[])

    const getFiscalYear = (event) => {
        const selectedOption = event.target[event.target.selectedIndex];
        const dataValue = selectedOption.dataset.value;
        const getYear = dataValue.match(/\d{4}/)
        if(getYear) {
            setSelectedFiscalYearList("FY"+getYear[0].toString().substring(2))
            console.log("FY"+getYear[0].toString().substring(2))
        }
    }
    const validateForm = () => {
        let valid = true;
        const errors = {
            name: '',
            value: '',
            targetfiscalyear: '',
            targetfiscalquarter: '',
        };

        if (!$("#aspiration_name").val()) {
            errors.name = 'Name is required';
            valid = false;
        }

        if (!$("#aspiration_value").val()) {
            errors.value = 'Value is required';
            valid = false;
        }

        if (!$("#aspiration_targetfiscalyear").val() && !$("#aspiration_targetfiscalquarter").val()) {
            errors.targetfiscalyear = 'Target Fiscal Year or Quarter is required';
            valid = false;
        }

        setValidationError(errors);
        return valid;
    };

    const updateAspiration = () =>{
        if (!validateForm()) {
            return;
        }
        setIsLoading(true)
        const body = {
            "id": props.id,
            "name": $("#aspiration_name").val(),
            "value": parseInt($("#aspiration_value").val()),
            "targetfiscalyear": parseInt($("#aspiration_targetfiscalyear").val()),
            "targetfiscalquarter": parseInt($("#aspiration_targetfiscalquarter").val()),
            "allow_export_externally": allow
        }
        API.put(`/metric-target`, body, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            API.get(`/metric-target?metric_id=${metricId}`)
            .then(response1 => {
                onClose()
                props.getUpdatedAspiration(response1.data)
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
                <ModalContent>
                    <ModalHeader>Metric Target</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={'15px'}>
                            <FormLabel fontWeight={'bold'}> Title </FormLabel>
                            <Input type='text' id={'aspiration_name'} className={validationError.name ? 'redBorder' : ''} placeholder='Please provide title' defaultValue={props.title} />
                            <Text color="red">{validationError.name}</Text>
                        </FormControl>
                        <FormControl mb={'15px'}>
                            <FormLabel fontWeight={'bold'}> Value </FormLabel>
                            <Input type='text' id={'aspiration_value'} className={validationError.value ? 'redBorder' : ''} placeholder='Please provide value' defaultValue={props.value} />
                            <Text color="red">{validationError.value}</Text>
                        </FormControl>
                        <FormControl mb={'15px'}>
                            <FormLabel fontWeight={'bold'}>Target Fiscal Year</FormLabel>
                            <Select id={'aspiration_targetfiscalyear'} onChange={getFiscalYear} className={validationError.targetfiscalyear ? 'redBorder' : ''}>
                                <option value={''}> Select fiscal year </option>
                                {
                                    fiscalYearList && fiscalYearList.map(item =>
                                        <option value={item.id} data-value={item.name} selected={props.fiscalYear === item.name ? true : false}> {item.name} </option>
                                    )
                                }
                            </Select>
                            <Text color="red">{validationError.targetfiscalyear}</Text>
                        </FormControl>
                        <FormControl mb={'15px'}>
                            <FormLabel fontWeight={'bold'}>Target Fiscal Quarter </FormLabel>
                            <Select id={'aspiration_targetfiscalquarter'} mb={'15px'} className={validationError.targetfiscalquarter ? 'redBorder' : ''}>
                                {
                                    fiscalQtrList && fiscalQtrList.map(item =>
                                        selectedFiscalYearList === item.name.substring(0, 4) ? 
                                        <option value={item.id}> {item.name} </option> : null
                                    )
                                }
                            </Select>
                            <Text color="red">{validationError.targetfiscalquarter}</Text>
                        </FormControl>
                        <FormControl display='flex' alignItems='center' mt={'0px'}>
                                <FormLabel htmlFor='share_data_externally' mb='0' fontWeight={'bold'}>
                                    Share Data Externally
                                </FormLabel>
                            <Switch id='share_data_externally' mt={'10px'} onChange={onHandleChange}  />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter backgroundColor={'transparent'}>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className='buttonPrimary' id={props.id} onClick={updateAspiration}>Save Aspiration</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>    
    )
}

export default EditAspiration