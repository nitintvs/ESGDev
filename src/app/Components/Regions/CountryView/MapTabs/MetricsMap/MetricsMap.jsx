import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ReactCountryFlag } from 'react-country-flag';
import Styles from '../../../regions.module.css'
import { Link, useParams } from 'react-router-dom';
import API from '../../../../../Services/API';
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid} from '@chakra-ui/react'
import LoaderSpinner from '../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import RegionMap from './RegionMap/RegionMap';
import StateImage from './StateImage/StateImage';
import { Hidden } from '@mui/material';

const MetricsMap = (props) => {
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
    const {countryId} = useParams();

    useEffect(() => {
        API.get(`/get-sub-modules?module_id=${countryId}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response1) => {
            setCountryList(response1.data)
            setIsLoading(false)
        })
    },[countryId])

    const dataNew = countryList && countryList.map(item =>
        ({country: item.country_code !== null ? item.country_code.toLowerCase() : '' , value: 52220})
    )

    return (
        <>
            <RegionMap dataNew={dataNew && dataNew} code={props.code && props.code} />

            <SimpleGrid columns={[1, 2, 3, 4,]} spacing='20px' mt={'25px'}>
                {
                    countryList && countryList.map(country =>
                        <Box height='80px'>
                            <Link to={`country/${country.id}/${country.name}`}>
                                <Card>
                                    <CardBody p={'0px'} overflow={'hidden'}>
                                        <Box float={'left'} mr={'5px'} className={Styles.flagContainer}>
                                            {/* <ReactCountryFlag countryCode={country.country_code} svg className={Styles.flagImage} /> */}
                                            <StateImage countryCode={country.country_code} />
                                        </Box>

                                        <Box className={Styles.countryName}>
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
            
        </>
    )
}

export default MetricsMap