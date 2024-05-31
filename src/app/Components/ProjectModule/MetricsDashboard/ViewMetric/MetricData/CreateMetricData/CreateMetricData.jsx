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
    Stack,
    Switch,
} from '@chakra-ui/react'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const CreateMetricData = (props) => {
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
    const [selectedFiscalYearList, setSelectedFiscalYearList] = useState(false)
    const [allow, setAllow] = useState(false)
    const [validationError, setValidationError] = useState({
        name: '',
        value: '',
        metricstatus: '',
        fiscalyear: '',
        fiscalquarter: '',
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
            metricstatus: '',
            fiscalyear: '',
            fiscalquarter: '',
        };

        if (!$("#metricData_name").val()) {
            errors.name = 'Name is required';
            valid = false;
        }

        if (!$("#metricData_value").val()) {
            errors.value = 'Value is required';
            valid = false;
        }

        if (!$("#metricData_metricStatus").val()) {
            errors.metricstatus = 'Metric status is required';
            valid = false;
        }

        if (!$("#metricData_targetfiscalyear").val() && !$("#metricData_targetfiscalquarter").val()) {
            errors.targetfiscalyear = 'Fiscal Year or Quarter is required';
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
            "name": $("#metricData_name").val(),
            "approval_status": "pending",
            "metric_status": $("#metricData_metricStatus").val(),
            "value": parseInt($("#metricData_value").val()),
            "fiscal_year": parseInt($("#metricData_targetfiscalyear").val()),
            "fiscal_quarter": parseInt($("#metricData_targetfiscalquarter").val()),
            "allow_export_externally": allow
        }
        API.post(`/metric-data`, body, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            API.get(`/metric-data?metric_id=${metricId}`)
            .then(response1 => {
                props.getMetricData(response1.data)
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
            {message ? <Box className={Styles.successMessage}> Created Metric data successfully  </Box> : false }
            <Button float={'right'} className={Styles.addAspiration}  onClick={openSlidingPane}> Create Metric Data </Button>
            <SlidingPane
                className={Styles.slidingPane}
                overlayClassName="some-custom-overlay-class"
                isOpen={state.isPaneOpen}
                title="Create Metric Data"
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
                            <Input type='text' id={'metricData_name'} mb={'15px'} className={validationError.name ? 'redBorder' : ''} />
                            <Text color="red">{validationError.name}</Text>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Value</FormLabel>
                            <Input type='text' id={'metricData_value'} mb={'15px'} className={validationError.value ? 'redBorder' : ''} />
                            <Text color="red">{validationError.value}</Text>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Metric Status</FormLabel>
                            <Select id={'metricData_metricStatus'} mb={'15px'} className={validationError.metricstatus ? 'redBorder' : ''}>
                                <option value={''}> Select metric status </option>
                                <option value={'on-track'}> On Track </option>
                                <option value={'delay'}> Delay </option>
                                <option value={'acceleration'}> Acceleration </option>
                            </Select>
                            <Text color="red">{validationError.metricstatus}</Text>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Fiscal Year</FormLabel>
                            <Select id={'metricData_targetfiscalyear'} mb={'15px'} onChange={getFiscalYear} className={validationError.targetfiscalyear ? 'redBorder' : ''}>
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
                            <FormLabel fontWeight={'bold'}>Fiscal Quarter </FormLabel>
                            <Select id={'metricData_targetfiscalquarter'} mb={'15px'}>
                                <option value={''}> Select fiscal quarter </option>
                                {
                                    fiscalQtrList && fiscalQtrList.map(item =>
                                        selectedFiscalYearList === item.name.substring(0, 4) ? 
                                        <option value={item.id}> {item.name} </option> : null
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl display='flex' alignItems='center' mt={'30px'}>
                                <FormLabel htmlFor='share_data_externally' mb='0' fontWeight={'bold'}>
                                    Share Data Externally
                                </FormLabel>
                            <Switch id='share_data_externally' mt={'10px'} onChange={onHandleChange}  />
                        </FormControl>
                    </Box>
                </SimpleGrid>
                <Box mb={'20px'}>
                    <FormControl>   
                        <FormLabel> Description </FormLabel>
                        <JoditEditor
                            id={"metricData_description"}
                            ref={editor}
                            tabIndex={1} // tabIndex of textarea
                            onChange={newContent => {}}
                        />
                        <Button colorScheme='blue' onClick={newAspiration} mt={'20px'} float={'right'}>Add Metric Data</Button>
                    </FormControl>
                </Box><br />
            </SlidingPane>
        </>
    )
}

export default CreateMetricData