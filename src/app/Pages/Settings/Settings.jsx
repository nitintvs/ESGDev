import React, { useState, useEffect } from 'react';
import Styles from './Settings.module.css'
import {Card, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Button} from '@chakra-ui/react'
import BreadCrumbs from '../../Components/Widgets/BreadCrumbs/BreadCrumbs'
import General from './General/General';
import Users from './Users/Users';
import Logs from './Logs/Logs';
import Permissions from './Permissions/Permissions';
import Import from './Import/Import';
import Export from './Export/Export';

const Settings = () => {
    const userRole = JSON.parse(window.localStorage.getItem("user"))
    const [editable, setEditable] = useState();
    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }
    const [activeTab, setActiveTab] = useState('general');
    const renderTabContent = () => {
        switch (activeTab) {
            case 'general': return <General />;
            case 'users': return <Users />;
            case 'import': return <Import />;
            case 'export': return <Export />;
            case 'permissions': return <Permissions />;
            case 'logs': return <Logs />;
            default : return null;
        }
    };

    return (
        <>
            <Card mt={'-1px'}>
                <CardHeader pb={'0px'}>
                    <Heading size='md'>Workspace Settings</Heading>
                </CardHeader>
                <CardBody pt={'0px'}>
                    <Box className={Styles.tabGroup}>
                        <Button onClick={() => setActiveTab('general')} className={activeTab === 'general' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>General</Button>
                        <Button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Users</Button>
                        <Button onClick={() => setActiveTab('import')} className={activeTab === 'import' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Import</Button>
                        <Button onClick={() => setActiveTab('export')} className={activeTab === 'export' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Export</Button>
                        <Button onClick={() => setActiveTab('permissions')} className={activeTab === 'permissions' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Permissions</Button>
                        <Button onClick={() => setActiveTab('logs')} className={activeTab === 'logs' ? `${Styles.active} ${Styles.tabStyle}` : `${Styles.tabStyle}`}>Logs</Button>
                    </Box>
                    <Box className={Styles.tabContent}>
                        {
                            userRole.role === 'Admin' ?
                                <>
                                    {renderTabContent()}
                                </>
                            :<Text> You don't have permission to access this page, Please contact your admin to get permission </Text>
                        }
                    </Box>
                </CardBody>
            </Card>
        </>
    )
}

export default Settings
