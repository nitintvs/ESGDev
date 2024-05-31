import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ReactCountryFlag } from 'react-country-flag';
import { fromCountryName } from 'iso-3166-1-alpha-2';
import { getAlpha2Code } from 'i18n-iso-countries';
import Styles from './regions.module.css'
import $ from 'jquery'
import { Link, useParams } from 'react-router-dom';
import API from '../../Services/API';
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import WorldMap from 'react-svg-worldmap';

import Breadcrumb from '../Widgets/BreadCrumbs/BreadCrumbs';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import RegionMap from './RegionMap/RegionMap';

const Regions = () => {
    const token = window.localStorage.getItem("accessToken")
    const mapRef = useRef(null);
    const [initialScale, setInitialScale] = useState(1.2);
    const [isLoading, setIsLoading]  = useState(false)
    const [editable, setEditable] = useState();
    const [moduleInfo, setModuleInfo] = useState();
    const [actions, setActions] = useState();
    const {id} = useParams();
    const [pillarId, setPillarId] = useState()
    const [pillarTeam, setPillarTeam] = useState()
    const [metric, setMetric] = useState()
    const [initiative, setInitiative] = useState()
    const [countryList, setCountryList] = useState()

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        setIsLoading(true)
        API.get(`/project-modules?module_id=${id}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            setModuleInfo(response.data[0])
            window.localStorage.removeItem("pillarId")
            window.localStorage.setItem("pillarId", response.data && response.data.id)
            setPillarId(response.data && response.data.id)
            API.get(`/get-sub-modules?module_id=${id}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then((response1) => {
                setCountryList(response1.data)
                setIsLoading(false)
            })
        })

        if (mapRef.current) {
            const mapWidth = mapRef.current.offsetWidth;
            const containerWidth = mapRef.current.parentElement.offsetWidth;
            const mapHeight = mapRef.current.offsetHeight;
            const containerHeight = mapRef.current.parentElement.offsetHeight;

            const scaleX = containerWidth / mapWidth;
            const scaleY = containerHeight / mapHeight;
            const initialScale = Math.min(scaleX, scaleY);
            setInitialScale(initialScale);
        }
        
    },[id])

    const handleRegionClick = (region) => {
        alert(`Clicked on ${region}`);
    };

    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }

    const getUpdate = (updatedInfo) =>{
        setModuleInfo(updatedInfo)
    }

    const dataNew = countryList && countryList.map(item =>
        ({country: item.country_code !== null ? item.country_code.toLowerCase() : '' , value: 52220})
    )

    // const handleCountryClick = (countryCode) => {
    //     // Handle click event for the country
    //     console.log(`Country ${countryCode} clicked`);
    //     // Add your custom logic here, such as redirecting to another component
    // };

    const handleCountryClick = (event, countryName) => {
        console.log(`Clicked on ${countryName}`);
        // You can perform any action you want here, based on the clicked country
    }

    return (
        <>
            {
                isLoading ? <LoaderSpinner /> : null
            }
            <Breadcrumb geteditStatus={geteditStatus} title={moduleInfo && moduleInfo.name} pillarId={pillarId && pillarId} />
            {/* <Heading as='h3' size='lg' mb={'25px'} fontSize={'19px'} mt={'20px'} className={Styles.customHeadingH3}>
                Subtitle
            </Heading>
            <Text> Asia Pacific, Japan, and China </Text> */}
            <Card>
                <CardBody>
                    <Heading as='h3' size='lg' mb={'25px'} fontSize={'19px'} mt={'0px'} className={Styles.customHeadingH3}>
                        Map Tabs
                    </Heading>
                    <Tabs variant='underline'>
                        <TabList>
                            <Tab  className={Styles.tabsGroup}
                _selected={{
                  color: "#00aae0",
                  borderBottom: "2px solid #00aae0",
                }}>Metrics map</Tab>
                            <Tab className={Styles.tabsGroup}
                _selected={{
                  color: "#00aae0",
                  borderBottom: "2px solid #00aae0",
                }}>Impact Gallery map</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <RegionMap dataNew={dataNew && dataNew} />
                                <SimpleGrid columns={[1, 2, 3, 4,]} spacing='20px' mt={'25px'}>
                                    {
                                        countryList && countryList.map(country =>
                                            <Box className='countryCon'>
                                                <Link to={`country/${country.id}/${country.name}`}>
                                                    <Card>
                                                        <CardBody p={'0px'}>
                                                            <Box float={'left'} mr={'5px'} className={'flagContainer'}>
                                                                <ReactCountryFlag countryCode={country.country_code} svg className={'flagImage'} />
                                                            </Box>
                                                            <Box float={'left'} w={'68%'} className={'countryName'}>
                                                                {country.name}
                                                            </Box>
                                                            <Box className={Styles.clearfix}></Box>
                                                        </CardBody>
                                                    </Card>
                                                </Link>
                                            </Box>
                                        )
                                    }
                                </SimpleGrid>
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </CardBody>
            </Card>
        </>
    )
}

export default Regions