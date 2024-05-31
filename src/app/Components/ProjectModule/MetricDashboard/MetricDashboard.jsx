import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from './metricdashboard.module.css'
import $ from 'jquery'
import API from '../../../Services/API';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Heading, Card, CardBody, Box, Text, Stack, StackDivider, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid} from '@chakra-ui/react'
import CreateMetric from './CreateMetric/CreateMetric'
import OPSMetrics from './OPSMetrics/OPSMetrics'
import Financials from './Financials/Financials';
import ImpactMetrics from './ImpactMetrics/ImpactMetrics'
import BoardMetrics from './BoardMetrics/BoardMetrics'
import AllMetrics from './AllMetrics/AllMetrics'
import Initiatives from './Initiatives/Initiatives';

const MetricDashboard = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const [activeTab, setActiveTab] = useState('operational');
    const [fiscalYearList, setFiscalYearList] = useState()
    const [fiscalQtrList, setFiscalQtrList] = useState()
    const [selectedOption, setSelectedOption] = useState(null);
    const [metricType, setMetricType] = useState(null);
    const [filteredMetric, setFilteredMetric] = useState(null);
    const[value, setValue] = useState();
    const[filterStatus, setFilterStatus] = useState(0);

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
    
    const handleChange = (event) => {
        setFilterStatus(1)
        if(event.name ==='year'){
            setSelectedOption(event)
            setFilteredMetric([])
            setIsLoading(true)
            let fiscal_year = event.value
            if(metricType === 'allmetric'){
                API.get(`/metric-filter?fiscal_year=${fiscal_year}&pillar_id=${props.pillarId && props.pillarId}`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                }).then(response=>{
                    setFilteredMetric(response.data)
                    setIsLoading(false)
                })
            }else{
                API.get(`/metric-filter?fiscal_year=${fiscal_year}&query=${metricType}&pillar_id=${props.pillarId && props.pillarId}`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                }).then(response=>{
                    setFilteredMetric(response.data)
                    setIsLoading(false)
                })
            }
        }else if(event.name ==='qtr'){
            setSelectedOption(event)
            setFilteredMetric([])
            setIsLoading(true)
            let fiscal_qtr = event.value
            if(metricType === 'allmetric'){
                API.get(`/metric-filter?fiscal_qtr=${fiscal_qtr}&pillar_id=${props.pillarId && props.pillarId}`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                }).then(response=>{
                    setFilteredMetric(response.data)
                    setIsLoading(false)
                })
            }else{
                API.get(`/metric-filter?fiscal_qtr=${fiscal_qtr}&query=${metricType}&pillar_id=${props.pillarId && props.pillarId}`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                }).then(response=>{
                    setFilteredMetric(response.data)
                    setIsLoading(false)
                })
            }
            
        }
    };

    const options = [
        ...(fiscalYearList && fiscalYearList.length > 0 ? fiscalYearList.map(year => ({ value: year.id, label: year.name, name: 'year'})) : []),
        ...(fiscalQtrList && fiscalQtrList.length > 0 ? fiscalQtrList.map(quarter => ({ value: quarter.id, label: quarter.name, name: 'qtr'})) : [])
    ];

    const getMetricType = (metrictype) =>{
        setMetricType(metrictype)
    }
    
    const emptyMetric = () =>{
        setFilterStatus(0)
        setFilteredMetric([])
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'operational': return <OPSMetrics selectedOption={selectedOption} emptyMetric={emptyMetric} pillarId={props.pillarId} metricType={getMetricType} metric={filteredMetric && filteredMetric} filterStatus={filterStatus} isLoading={isLoading} />;
            case 'financials': return <Financials selectedOption={selectedOption} emptyMetric={emptyMetric} pillarId={props.pillarId} metricType={getMetricType} metric={filteredMetric && filteredMetric} filterStatus={filterStatus} isLoading={isLoading} />;
            case 'impactmetrics': return <ImpactMetrics selectedOption={selectedOption} emptyMetric={emptyMetric} pillarId={props.pillarId} metricType={getMetricType} metric={filteredMetric && filteredMetric} filterStatus={filterStatus} isLoading={isLoading} />;
            case 'allmetrics': return <AllMetrics selectedOption={selectedOption} emptyMetric={emptyMetric} pillarId={props.pillarId} metricType={getMetricType} metric={filteredMetric && filteredMetric} filterStatus={filterStatus} isLoading={isLoading} />;
            case 'initiatives': return <Initiatives pillarId={props.pillarId} editable={props.editable} actions={props.actions} />;
            default : return null;
        }
    };

    return (
        <>
            <Heading className={Styles.customHeadingH3}>
                Metrics Dashboard
                {props.editable ? <CreateMetric pillarMetricId={props.pillarMetricId && props.pillarMetricId} pillarId={props.pillarId && props.pillarId} /> : null } 
                <Box className={Styles.clearFix}></Box>
            </Heading>
            <Box mb={'15px'} width={'100%'} maxW={'520px'}>
                <Select
                    onChange={handleChange}
                    options={options}
                />
            </Box>
            <Box>
                <Card>
                    <CardBody>
                        <Box className={Styles.tabGroup}>
                            <Button onClick={() => setActiveTab('operational')} className={activeTab === 'operational' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>OPS Metrics</Button>
                            <Button onClick={() => setActiveTab('financials')} className={activeTab === 'financials' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Financials</Button>
                            <Button onClick={() => setActiveTab('impactmetrics')} className={activeTab === 'impactmetrics' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Impact Metrics</Button>
                            {/* <Button onClick={() => setActiveTab('boardmetrics')} className={activeTab === 'boardmetrics' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Board Metrics</Button> */}
                            <Button onClick={() => setActiveTab('allmetrics')} className={activeTab === 'allmetrics' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>All Metrics</Button>
                            <Button onClick={() => setActiveTab('initiatives')} className={activeTab === 'initiatives' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Initiatives</Button>
                        </Box>
                        
                        <Box className={Styles.tabContent}>
                            {renderTabContent()}
                        </Box>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}

export default MetricDashboard

