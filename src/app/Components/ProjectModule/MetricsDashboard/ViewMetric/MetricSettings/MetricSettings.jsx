import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from './metricsettings.module.css'
import $ from 'jquery'
import API from '../../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import {Box, Input, Textarea, Button, Select, SimpleGrid} from '@chakra-ui/react'
import {Switch, FormControl, FormLabel, Checkbox, CheckboxGroup, FormErrorMessage, FormHelperText,} from '@chakra-ui/react'
import Form from 'react-bootstrap/Form';
import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'
  
const MetricSettings = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading] = useState()
    const [metric, setMetric] = useState();
    const {metricId} = useParams();
    const [isQbr, setIsQbr] = useState(false)
    const [isReportEx, setIsReportEx] = useState(false)
    const [isPublic, setIsPublic] = useState(false)
    const [isElr, setIsElr] = useState(false)
    const [isSioDashboard, setIsSioDashboard] = useState(false)
    const [isActionDashboard, setIsActionDashboard] = useState(false)
    const [isBoard, setIsBoard] = useState(false)
    const [isMap, setIsMap] = useState(false)
    const [message, setMessage] =  useState(false)

    useEffect(() => {
        API.get(`/get-metric?metric_id=${metricId}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            setMetric(response.data[0])
        })
    },[])

    const changeIsChecked = (event) =>{
        if(event.target.id === "isQbr"){
            setIsQbr(event.target.checked)
        }
        if(event.target.id === "isReportEx"){
            setIsReportEx(event.target.checked)
        }
        if(event.target.id === "isPublic"){
            setIsPublic(event.target.checked)
        }
        if(event.target.id === "isElr"){
            setIsElr(event.target.checked)
        }
        if(event.target.id === "isSioDashboard"){
            setIsSioDashboard(event.target.checked)
        }
        if(event.target.id === "isActionDashboard"){
            setIsActionDashboard(event.target.checked)
        }
        if(event.target.id === "isBoard"){
            setIsBoard(event.target.checked)
        }
        if(event.target.id === "isMap"){
            setIsMap(event.target.checked)
        }
    }

    const saveSettings = () => {
        setIsLoading(true)
        const body = {
            "id": parseInt(metricId),
            "metrictype": $("#settingsMetrictype").val(),
            "aggregate": $("#settingsMetricaggregate").val(),
            "datatype": $("#settingsMetricDatatype").val(),
            "dashboard": $("#isSioDashboard").is(':checked'),
            "action": $("#isActionDashboard").is(':checked'),
            "qbr": $("#isQbr").is(':checked'),
            "board": $("#isBoard").is(':checked'),
            "map": $("#isMap").is(':checked'),
        }
        API.put(`/metric`, body, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
            API.get(`/get-metric?metric_id=${metricId}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                setMetric(response.data[0])
                setMessage(true)
                setIsLoading(false)
            })
        })
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            {
                message ? 
                <Box className={Styles.successMessage}>
                    Successfully saved Metric Settings
                </Box> : null
            }
            
            <FormControl>
                <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                    <Box>
                        <FormLabel className={Styles.metricFont}>Strategy</FormLabel>
                        <Select className={Styles.metricFont} disabled={props.editable ? false : true}>
                            <option className={Styles.metricFont} value=''> Please select strategy</option>
                        </Select>
                    </Box>
                    <Box>
                        <FormLabel className={Styles.metricFont}>Type of data</FormLabel>
                        <Select className={Styles.metricFont} id={'settingsMetricDatatype'} placeholder='Select option' disabled={props.editable ? false : true}>
                            <option className={Styles.metricFont} value='percent' selected={metric && metric.datatype === 'percent' ? true : false}>Percent</option>
                            <option value='number' className={Styles.metricFont} selected={metric && metric.datatype === 'number' ? true : false}>Number</option>
                            <option value='money' className={Styles.metricFont} selected={metric && metric.datatype === 'money' ? true : false}>Money</option>
                        </Select>
                    </Box>
                    <Box>
                        <FormLabel className={Styles.metricFont}>Type of metric</FormLabel>
                        <Select className={Styles.metricFont} id='settingsMetrictype' placeholder='Select option' disabled={props.editable ? false : true}>
                            <option className={Styles.metricFont} value='operational' selected={metric && metric.metrictype === 'operational' ? true : false}>Operational</option>
                            <option className={Styles.metricFont} value='financial' selected={metric && metric.metrictype === 'financial' ? true : false}>Financial</option>
                            <option className={Styles.metricFont} value='impact' selected={metric && metric.metrictype === 'impact' ? true : false}>Impact</option>
                        </Select>
                    </Box>
                    <Box>
                        <FormLabel className={Styles.metricFont}>Aggregate Function</FormLabel>
                        <Select className={Styles.metricFont} id={'settingsMetricaggregate'} placeholder='Select option' disabled={props.editable ? false : true}>
                            <option  className={Styles.metricFont} value='sum' selected={metric && metric.aggregate === 'sum' ? true : false}>Sum</option>
                            <option  className={Styles.metricFont}value='avg' selected={metric && metric.aggregate === 'avg' ? true : false}>Avg</option>
                            <option className={Styles.metricFont} value='max' selected={metric && metric.aggregate === 'max' ? true : false}>Max</option>
                            <option className={Styles.metricFont} value='last' selected={metric && metric.aggregate === 'last' ? true : false}>Last</option>
                        </Select>
                    </Box>
                </SimpleGrid>
                <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}> 
                    <Box>
                        <FormControl className={Styles.topcontainer}  as={SimpleGrid} columns={{ base: 2 }}>
                            <FormLabel  className={Styles.metricFont} htmlFor='isQbr'>ELR Dashboard:</FormLabel>
                            {metric && metric.qbr ? <> <Switch id='isQbr' defaultChecked={true}  onChange={changeIsChecked} /> </>  : <Switch id='isQbr' defaultChecked={false}  onChange={changeIsChecked}  />}
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl as={SimpleGrid} columns={{ base: 2 }} className={Styles.topcontainer}>
                            <FormLabel  className={Styles.metricFont} htmlFor='isReportEx'>Report Externally:</FormLabel>
                            {metric && metric.reportex ? <><Switch id='isReportEx' defaultChecked={true} onChange={changeIsChecked}  /></> : <Switch id='isReportEx' defaultChecked={false} onChange={changeIsChecked}  />}
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl as={SimpleGrid} columns={{ base: 2 }} className={Styles.topcontainer}>
                            <FormLabel className={Styles.metricFont} htmlFor='isPublic'>Public:</FormLabel>
                            {metric && metric.isPublic ? <><Switch id='isPublic' defaultChecked={true}  onChange={changeIsChecked}  /></> : <Switch id='isPublic' defaultChecked={false}  onChange={changeIsChecked}  />}
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl as={SimpleGrid} columns={{ base: 2 }} className={Styles.topcontainer}>
                            <FormLabel className={Styles.metricFont} htmlFor='isElr'>Executive Leadership Review:</FormLabel>
                            {metric && metric.isElr ? <><Switch id='isElr' defaultChecked={true}  onChange={changeIsChecked}  /></> : <Switch id='isElr' defaultChecked={false}  onChange={changeIsChecked}  />}
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl as={SimpleGrid} columns={{ base: 2 }} className={Styles.topcontainer}>
                            <FormLabel className={Styles.metricFont} htmlFor='isSioDashboard'>SIO Dashboard:</FormLabel>
                            {metric && metric.dashboard ? <><Switch id='isSioDashboard' defaultChecked={true}  onChange={changeIsChecked}  /></> : <Switch id='isSioDashboard' defaultChecked={false}  onChange={changeIsChecked}  />}
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl as={SimpleGrid} columns={{ base: 2 }} className={Styles.topcontainer}>
                            <FormLabel className={Styles.metricFont} htmlFor='isActionDashboard'>Action Dashboard:</FormLabel>
                            {metric && metric.action ? <><Switch id='isActionDashboard' defaultChecked={true}  onChange={changeIsChecked}  /></> : <Switch id='isActionDashboard' defaultChecked={false}  onChange={changeIsChecked}  />}
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl as={SimpleGrid} columns={{ base: 2 }} className={Styles.topcontainer}>
                            <FormLabel className={Styles.metricFont} htmlFor='isBoard'>Board Metric:</FormLabel>
                            {metric && metric.board ? <><Switch id='isBoard' defaultChecked={true}  onChange={changeIsChecked}  /></> : <Switch id='isBoard' defaultChecked={false}  onChange={changeIsChecked}  />}
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl as={SimpleGrid} columns={{ base: 2 }} className={Styles.topcontainer}>
                            <FormLabel className={Styles.metricFont} htmlFor='isMap'>Map:</FormLabel>
                            {metric && metric.map ? <><Switch id='isMap' defaultChecked={true}  onChange={changeIsChecked}  /></> : <Switch id='isMap' defaultChecked={false}  onChange={changeIsChecked}  />}
                        </FormControl>
                    </Box>
                    <Box>
                       {props?.editable && <Button onClick={saveSettings} className={Styles.buttonNew}>
              {" "}
              Save Settings{" "}
            </Button>}
                    </Box>
                </SimpleGrid>
            </FormControl>
        </>
    )
}

export default MetricSettings