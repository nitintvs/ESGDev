import React, { useState, useEffect, useRef, useMemo } from 'react';
import Select from 'react-select';
import Styles from './metricdashboard.module.css'
import $ from 'jquery'
import API from '../../../../Services/API';
import { Link } from 'react-router-dom';
import { Heading, Card, CardBody, Box, Text, Stack, StackDivider, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid} from '@chakra-ui/react'
import OPSMetrics from './OPSMetrics/OPSMetrics'
import Financials from './Financials/Financials';
import ImpactMetrics from './ImpactMetrics/ImpactMetrics'
import BoardMetrics from './BoardMetrics/BoardMetrics'
import AllMetrics from './AllMetrics/AllMetrics'


const MetricDashboard = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const [activeTab, setActiveTab] = useState('operational');
    const [fiscalYearList, setFiscalYearList] = useState([])
    const [fiscalQtrList, setFiscalQtrList] = useState([])
    const[filterStatus, setFilterStatus] = useState(0);
    const [filteredMetric, setFilteredMetric] = useState('null');
    const [metricType, setMetricType] = useState('operational');
    const [selectedOption, setSelectedOption] = useState(null);
    const [matchedData, setMatchedData] = useState([]);

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
        setIsLoading(true)
        setFilterStatus(1)
        if(event.name ==='year'){
            setSelectedOption(event)
            setFilteredMetric([])
            let fiscal_year = event.value
            if(metricType === 'allmetric'){
                API.get(`/metric-filter?fiscal_year=${fiscal_year}`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                }).then(response=>{
                    setFilteredMetric(response.data)
                    setIsLoading(false)
                })
            }else if(metricType === 'operational'){
                API.get(`/get-pillar-action`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then(response=>{
                    API.get(`/metric-filter?fiscal_year=${fiscal_year}&query=${'operational'}`, {
                        headers: {
                          'Authorization': 'Bearer ' + token
                        }
                    }).then(response1=>{
                        setFilteredMetric(response1.data)
                        setIsLoading(false)
                        const matchedDataArray = response.data && response.data.filter(data1Obj =>
                            response1.data && response1.data.some(dataObj => dataObj.action_id === data1Obj.id)
                        );
                        setMatchedData(matchedDataArray);
                        setIsLoading(false)
                    })
                })
            }else{
                API.get(`/metric-filter?fiscal_year=${fiscal_year}&query=${metricType}`, {
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
                API.get(`/metric-filter?fiscal_qtr=${fiscal_qtr}`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                }).then(response=>{
                    setFilteredMetric(response.data)
                    setIsLoading(false)
                })
            }else{
                API.get(`/metric-filter?fiscal_qtr=${fiscal_qtr}&query=${metricType}`, {
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
            case 'operational': return <OPSMetrics matchedData={matchedData} selectedOption={selectedOption} emptyMetric={emptyMetric} metricType={getMetricType} metric={filteredMetric && filteredMetric} filterStatus={filterStatus} isLoading={isLoading} />;
            case 'financials': return <Financials selectedOption={selectedOption} emptyMetric={emptyMetric} metricType={getMetricType} metric={filteredMetric && filteredMetric} filterStatus={filterStatus} isLoading={isLoading} />;
            case 'impactmetrics': return <ImpactMetrics pillars={props.pillars && props.pillars} selectedOption={selectedOption} emptyMetric={emptyMetric} metricType={getMetricType} metric={filteredMetric && filteredMetric} filterStatus={filterStatus} isLoading={isLoading} />;
            case 'allmetrics': return <AllMetrics selectedOption={selectedOption} emptyMetric={emptyMetric} metricType={getMetricType} metric={filteredMetric && filteredMetric} filterStatus={filterStatus} isLoading={isLoading} />;
            default : return null;
        }
    };

    return (
        <>
            <Heading className={Styles.cardTitle}>Dashboard</Heading>
            <Text> Here you can see all the SIO metrics for the selected quarter. </Text>
            <Box mb={'15px'} width={'100%'} maxW={'520px'}>
                <Select
                    onChange={handleChange}
                    options={options}
                />
            </Box>
            <Box mt={'15px'}>
                <Card>
                    <CardBody>
                        <Box className={Styles.tabGroup}>
                            <Button onClick={() => setActiveTab('operational')} className={activeTab === 'operational' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>OPS Metrics</Button>
                            <Button onClick={() => setActiveTab('financials')} className={activeTab === 'financials' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Financials</Button>
                            <Button onClick={() => setActiveTab('impactmetrics')} className={activeTab === 'impactmetrics' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Impact Metrics</Button>
                            <Button onClick={() => setActiveTab('allmetrics')} className={activeTab === 'allmetrics' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>All Metrics</Button>
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


