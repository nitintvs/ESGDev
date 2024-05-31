import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from './maptab.module.css'
import { ReactCountryFlag } from 'react-country-flag';
import { fromCountryName } from 'iso-3166-1-alpha-2';
import { getAlpha2Code } from 'i18n-iso-countries';
import $ from 'jquery'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import API from '../../../../Services/API';
import { Heading, CardHeader, Card, CardBody, Box, Image, Text, Input, Textarea, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

import MetricsMap from './MetricsMap/MetricsMap'
import ImpactGalleryMap from './ImpactGalleryMap/ImpactGalleryMap';

const MapTabs = (props) => {
    const [activeTab, setActiveTab] = useState('metricsmap');
    const renderTabContent = () => {
        switch (activeTab) {
            case 'metricsmap': return <MetricsMap code={props.code && props.code} />;
            case 'impactgallerymap': return <ImpactGalleryMap />;
            default : return null;
        }
    };
    return (
        <>
            <Card mb={'15px'}>
                <CardHeader pt={'0'} pb={'0'}>
                    <Heading className={Styles.customHeadingH3}> Map Tabs </Heading>
                </CardHeader>
                <CardBody>
                    <Box className={Styles.tabGroup}>
                        <Button onClick={() => setActiveTab('metricsmap')} className={activeTab === 'metricsmap' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Metrics Map</Button>
                        <Button onClick={() => setActiveTab('impactgallerymap')} className={activeTab === 'impactgallerymap' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Impact Gallery Map</Button>
                    </Box>
                    <Box className={Styles.tabContent}>
                        {renderTabContent()}
                    </Box>
                </CardBody>
            </Card>
        </>
    )
}

export default MapTabs