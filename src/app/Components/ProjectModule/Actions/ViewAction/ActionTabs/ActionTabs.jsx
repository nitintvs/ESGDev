import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from './actiontabs.module.css'
import $ from 'jquery'
import API from '../../../../../Services/API';
import { Link } from 'react-router-dom';
import { Heading, Card, CardBody, Box, Select, Text, Stack, StackDivider, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid} from '@chakra-ui/react'
import Overview from './Overview/Overview'
import Team from './Team/Team'
import Strategies from './Strategies/Strategies'
import Metrics from './Metrics/Metrics'
import QuarterlyReporting from './QuarterlyReporting/QuarterlyReporting'
import Initiatives from './Initiatives/Initiatives'
import ImpactGallery from './ImpactGallery/ImpactGallery'

const ActionTabs = (props) => {
    const [activeTab, setActiveTab] = useState('overview');
    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview': return <Overview actionId={props.actionPillarId} description={props.description} />;
            case 'team': return <Team actionId={props.actionPillarId} editable={props.editable} />;
            case 'strategies': return <Strategies actionId={props.actionPillarId} editable={props.editable} />;
            case 'metrics': return <Metrics actionId={props.actionPillarId} />;
            case 'initiatives': return <Initiatives actionId={props.actionPillarId} />;
            case 'impactgallery': return <ImpactGallery actionId={props.actionPillarId} />;
            default : return null;
        }
    };

    return (
        <>
            <Box mt={'10px'}>
                <Card>
                    <CardBody>
                        <Box className={Styles.tabGroup}>
                            <Button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Overview</Button>
                            <Button onClick={() => setActiveTab('team')} className={activeTab === 'team' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Team</Button>
                            <Button onClick={() => setActiveTab('strategies')} className={activeTab === 'strategies' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Strategies</Button>
                            <Button onClick={() => setActiveTab('metrics')} className={activeTab === 'metrics' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Metrics</Button>
                            <Button onClick={() => setActiveTab('initiatives')} className={activeTab === 'initiatives' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Initiatives</Button>
                            <Button onClick={() => setActiveTab('impactgallery')} className={activeTab === 'impactgallery' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Impact Gallery</Button>
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

export default ActionTabs