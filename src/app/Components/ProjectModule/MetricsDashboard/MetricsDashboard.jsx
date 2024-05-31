import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from './metricsdashboard.module.css'
import API from '../../../Services/API';
import $ from 'jquery'
import { Link } from 'react-router-dom';
import { Heading, Card, CardBody, Box, Select, Text, Input, Textarea, Button, Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'
import AddNewInitiative from './ViewInitiative/AddNewInitiative/AddNewInitiative';
import CreateMetric from './CreateMetric/CreateMetric';
import AreaChartComponent from '../../Modules/Charts/AreaChartComponent';

const MetricsDashboard = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [pillarAction, setPillarAction] = useState([]);
    const [fiscalYearList, setFiscalYearList] = useState()
    const [fiscalQtrList, setFiscalQtrList] = useState()
    

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

    const filter = (event) =>{
        //metric-filter?fiscal_year=1
        API.get(`/metric-filter?fiscal_year=${event.target.value}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
            
        })
    }

    const getUpdated = (updatedMetric) => {
        props.getUpdatedMetric(updatedMetric)
    }

    return (
        <>
            <Heading className={Styles.customHeadingH3}>
                Metrics Dashboard
                {props.editable ? <CreateMetric getUpdated={getUpdated} pillarMetricId={props.pillarMetricId && props.pillarMetricId} pillarId={props.pillarId && props.pillarId} /> : null } 
                <Box className={Styles.clearFix}></Box>
            </Heading>
            <Card mt={'0px'}>
                <CardBody>
                    <Box float={'right'} width={'350px'} position={'relative'} zIndex={'9999'}>
                        <Select variant='outline' className={Styles.selectYear} onChange={filter}>
                            <option value={''}> Please select year </option>
                            {
                                fiscalYearList && fiscalYearList.map(item =>
                                    <option value={item.id}> {item.name} </option>
                                )
                            }
                            {
                                fiscalQtrList && fiscalQtrList.map(item =>
                                    <option value={item.id}> {item.name} </option>
                                )
                            }
                        </Select>
                    </Box>
                </CardBody>
            </Card>
        </>
  )
}

export default MetricsDashboard