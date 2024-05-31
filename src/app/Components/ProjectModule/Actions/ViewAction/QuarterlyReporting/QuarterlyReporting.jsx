import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from './quarterlyreporting.module.css'
import $ from 'jquery'
import API from '../../../../../Services/API';
import { Link } from 'react-router-dom';
import { Heading, Card, CardHeader, CardBody, Box, Text, Stack, StackDivider, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid} from '@chakra-ui/react'
import Select from 'react-select';
import QuarterlyActions from './ReportingTabs/QuarterlyActions/QuarterlyActions'
import OPSSummary from './ReportingTabs/OPSSummary/OPSSummary'
import ImpactStories from './ReportingTabs/ImpactStories/ImpactStories'
import KeyTakeaways from './ReportingTabs/KeyTakeaways/KeyTakeaways'
import KeyRecommendations from './ReportingTabs/KeyRecommendations/KeyRecommendations'
import KeyActions from './ReportingTabs/KeyActions/KeyActions'

const QuarterlyReporting = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [activeTab, setActiveTab] = useState('quarterlyactions');
    const [selectedOption, setSelectedOption] = useState(null);
    const [fiscalYearQtrDetail, setFiscalYearQtrDetail] = useState(null);
    

    useEffect(()=>{
        API.get(`/fiscal-year-detail`, {
          headers: {
              'Authorization': 'Bearer ' + token
          }
        }).then(response=>{
          setFiscalYearQtrDetail(response.data[1].fiscalquarter)
        })
    },[])

    const fiscalYearQtrList = fiscalYearQtrDetail && fiscalYearQtrDetail.map(item => ({
        value: item.id,
        label: item.name
    }));

    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'quarterlyactions': return <QuarterlyActions actionId={props.actionPillarId} description={props.description} />;
            case 'opssummary': return <OPSSummary actionId={props.actionPillarId} editable={props.editable} />;
            case 'impactstories': return <ImpactStories actionId={props.actionPillarId} />;
            case 'keytakeaways': return <KeyTakeaways actionId={props.actionPillarId} />;
            case 'keyrecommendations': return <KeyRecommendations actionId={props.actionPillarId} />;
            case 'keyactions': return <KeyActions actionId={props.actionPillarId} />;
            default : return null;
        }
    };

    return (
        <>
            <Box mt={'10px'}>
                <Card>
                    <CardHeader>
                        <Heading className={Styles.cardTitle}>
                            Quarterly Reporting
                        </Heading>
                        
                        <Box className={Styles.selectDropdown}>
                            <Select
                                onChange={handleChange}
                                options={fiscalYearQtrList}
                                placeholder="Please select quarter"
                            />
                        </Box>
                    </CardHeader>
                    <CardBody>
                        <Box className={Styles.tabGroup}>
                            <Button onClick={() => setActiveTab('quarterlyactions')} className={activeTab === 'quarterlyactions' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Quarterly Actions</Button>
                            <Button onClick={() => setActiveTab('opssummary')} className={activeTab === 'opssummary' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>OPS Summary</Button>
                            <Button onClick={() => setActiveTab('impactstories')} className={activeTab === 'impactstories' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Impact Stories</Button>
                            <Button onClick={() => setActiveTab('keytakeaways')} className={activeTab === 'keytakeaways' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Key Takeaways</Button>
                            <Button onClick={() => setActiveTab('keyrecommendations')} className={activeTab === 'keyrecommendations' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Key Recommendations</Button>
                            <Button onClick={() => setActiveTab('keyactions')} className={activeTab === 'keyactions' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Key Actions</Button>
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

export default QuarterlyReporting