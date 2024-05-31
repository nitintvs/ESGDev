import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom'
import Styles from './createaspiration.module.css'
import $ from 'jquery'
import API from '../../../../../../Services/API'
import {Card, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Select, Box, Input, Textarea, Button, Image, SimpleGrid} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Checkbox, 
    Stack,Switch,
} from '@chakra-ui/react'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const CreateAspiration = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [state, setState] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false,
    });
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {metricId} = useParams();
    const editor = useRef(null);
    const [fiscalYearList, setFiscalYearList] = useState()
    const [fiscalQtrList, setFiscalQtrList] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(false)
    const [selectedFiscalYearList, setSelectedFiscalYearList] = useState()
    const [allow, setAllow] = useState(false)
    const [validationError, setValidationError] = useState({
        name: '',
        value: '',
        targetfiscalyear: '',
        targetfiscalquarter: '',
    });

    
    if(state.isPaneOpen){
        $("body").css('position', 'fixed')
    }else{
        $("body").css('position', 'static')
    }

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

    const newAspiration = () =>{
        if (!validateForm()) {
            return;
        }

        setIsLoading(true)
        const body = {
            "metric": metricId,
            "name": $("#aspiration_name").val(),
            "value": parseInt($("#aspiration_value").val()),
            "targetfiscalyear": parseInt($("#aspiration_targetfiscalyear").val()),
            "targetfiscalquarter": parseInt($("#aspiration_targetfiscalquarter").val()),
            "allow_export_externally": allow
        }
        API.post(`/metric-target`, body, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            API.get(`/metric-target?metric_id=${metricId}`)
            .then(response1 => {
                props.getUpdatedAspiration(response1.data)
                setState({ isPaneOpen: false })
                setIsLoading(false)
                setMessage(true)
            })
        })
    }
    const openSlidingPane = () => {
        setState({ isPaneOpen: true })
    }

    const getFiscalYear = (event) => {
        const selectedOption = event.target[event.target.selectedIndex];
        const dataValue = selectedOption.dataset.value;
        const getYear = dataValue.match(/\d{4}/)
        if(getYear) {
            setSelectedFiscalYearList("FY"+getYear[0].toString().substring(2))
            console.log("FY"+getYear[0].toString().substring(2))
        }
    }

    const onHandleChange = (event) =>{
        setAllow(event.target.checked)
    }



    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            {message ? <Box className={Styles.successMessage}> Created aspiration successfully  </Box> : false }  
            <Button float={'right'} className={`${Styles.addAspiration} buttonPrimary`}  onClick={openSlidingPane}> New Aspiration</Button>
            <SlidingPane
                className={Styles.slidingPane}
                overlayClassName="some-custom-overlay-class"
                isOpen={state.isPaneOpen}
                title="Create Aspiration"
                subtitle=""
                width="50%"
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setState({ isPaneOpen: false });
                }}
            >
                <SimpleGrid columns={[1, 2]} spacing='20px' mt={'10px'}>
                    <Box>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Name</FormLabel>
                            <Input type='text' id={'aspiration_name'} mb={'15px'} className={validationError.name ? 'redBorder' : ''} />
                            <Text color="red">{validationError.name}</Text>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Value</FormLabel>
                            <Input type='text' id={'aspiration_value'} mb={'15px'} className={validationError.value ? 'redBorder' : ''} />
                            <Text color="red">{validationError.value}</Text>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Target Fiscal Year</FormLabel>
                            <Select id={'aspiration_targetfiscalyear'} mb={'15px'} onChange={getFiscalYear} className={validationError.targetfiscalyear ? 'redBorder' : ''}>
                                <option value={''}> Select fiscal year </option>
                                {
                                    fiscalYearList && fiscalYearList.map(item => 
                                        <option value={item.id} data-value={item.name}> {item.name} </option>
                                    )
                                }
                            </Select>
                            <Text color="red">{validationError.targetfiscalyear}</Text>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Target Fiscal Quarter </FormLabel>
                            <Select id={'aspiration_targetfiscalquarter'} mb={'15px'} className={validationError.targetfiscalquarter ? 'redBorder' : ''}>
                                <option value={''}> Select fiscal quarter </option>
                                {
                                    fiscalQtrList && fiscalQtrList.map(item =>
                                        selectedFiscalYearList === item.name.substring(0, 4) ? 
                                        <option value={item.id}> {item.name} </option> : null
                                    )
                                }
                            </Select>
                            <Text color="red">{validationError.targetfiscalquarter}</Text>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl display='flex' alignItems='center' mt={'0px'}>
                                <FormLabel htmlFor='share_data_externally' mb='0' fontWeight={'bold'}>
                                    Share Data Externally
                                </FormLabel>
                            <Switch id='share_data_externally' mt={'10px'} onChange={onHandleChange}  />
                        </FormControl>
                    </Box>
                </SimpleGrid>
                <Box>
                    <FormControl>   
                        <FormLabel> Description </FormLabel>
                        <JoditEditor
                            id={"aspiration_description"}
                            ref={editor}
                            tabIndex={1} // tabIndex of textarea
                            onChange={newContent => {}}
                        />
                        <Button colorScheme='blue' onClick={newAspiration} mt={'20px'} float={'right'}>Add Aspiration</Button>
                    </FormControl>
                </Box>
            </SlidingPane>
        </>
    )
}

export default CreateAspiration