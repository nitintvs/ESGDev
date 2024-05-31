import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import Styles from './mytasks.module.css'
import $ from 'jquery'
import API from '../../Services/API';
import { Box, Button, Card, CardBody } from '@chakra-ui/react'
import BreadCrumbs from '../../Components/Widgets/BreadCrumbs/BreadCrumbs';
import MetricData from './MetricData/MetricData';
import ImpactGalleryItems from './ImpactGalleryItems/ImpactGalleryItems';

import BreadCrumbsNav from "../../Components/Shared/Navbar/BreadCrumbsNav";
import { EditContext } from "../../Context/BreadcrumbsContext";

const MyTasks = () => {
    const [editable, setEditable] = useState();
    const geteditStatus = (isEdit) =>{
      setEditable(isEdit)
    }
    const [activeTab, setActiveTab] = useState('metricDataPending');
    const { edit, setEdit } = useContext(EditContext);
    const renderTabContent = () => {
        switch (activeTab) {
            case 'metricDataPending': return <MetricData />;
            case 'impactGalleryItems': return <ImpactGalleryItems />;
            default : return null;
        }
    };
    return (
        <>
            <BreadCrumbs geteditStatus={geteditStatus} title={'My Tasks'} />
            <Box>
                <Card>
                    <CardBody>
                        <Box>
                            <Button onClick={() => setActiveTab('metricDataPending')} className={activeTab === 'metricDataPending' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Metric data - Pending Approval</Button>
                            <Button onClick={() => setActiveTab('impactGalleryItems')} className={activeTab === 'impactGalleryItems' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Impact Gallery Items - Pending Approval</Button>
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

export default MyTasks