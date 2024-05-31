import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { ReactCountryFlag } from 'react-country-flag';
import $ from 'jquery'
import API from '../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import Styles from './countryview.module.css'
import {
    Card, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image,
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Stack} from '@chakra-ui/react'
import BreadCrumbs from '../../Widgets/BreadCrumbs/BreadCrumbs';
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import MapTabs from './MapTabs/MapTabs';
import Metric from './Metric/Metric';
import { EditContext } from '../../../Context/BreadcrumbsContext';

const CountryView = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(true)
    const [editable, setEditable] = useState();
    const [action, setAction] = useState();
    const {countryId} = useParams();
    const editor = useRef(null);
    const [file, setFile] = useState(null);
    const [countryInfo, setCountryInfo] = useState(null);
    const [countryList, setCountryList] = useState(null);
    const [stateCount, setStateCount] = useState(null);
    const {edit, setEdit } = useContext(EditContext);

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        API.get(`/project-modules?module_id=${countryId}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            API.get(`/get-sub-modules?module_id=${countryId}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then((response1) => {
                setStateCount(response1.data.length)
                setCountryList(response1.data)
                setIsLoading(false)
            })
            setCountryInfo(response.data[0])
            setIsLoading(false)
        })
    },[countryId])

    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }

    const updatePageInfo = (event) => {
        setIsLoading(true)
        const formData = new FormData()
        if(file != null){
            formData.append('banner', file)
        }
        formData.append('name', $("#pagetitle").val())
        formData.append('description', $("#description").val())
        formData.append('id', countryInfo && countryInfo.id)
        API.put(`/project-modules`, formData, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            API.get(`/project-modules?module_id=${countryId}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then((response1) => {
                setCountryInfo(response1.data[0])
                setIsLoading(false)
            })
        })
    }
    function bannerUpload(e) {
        setFile(e.target.files[0]);
    }

    return (
        <>
            {
                isLoading ? <LoaderSpinner /> : null
            }
            <BreadCrumbs geteditStatus={geteditStatus} title={countryInfo && countryInfo.name} pillarId={action && action.id} />
            <Card mb={'15px'}>
                <CardBody>
                    {
                        edit ? 
                            <>
                                <Stack spacing={3} mb={'30px'}>
                                    <Input
                                        id={"pagetitle"} 
                                        placeholder='Please Enter Title' 
                                        size='md' 
                                        backgroundColor={"#ffffff"} 
                                        defaultValue={countryInfo && countryInfo.name}
                                    />
                                    <Input type="file" onChange={bannerUpload}  padding={"4px"}/>
                                    <Image src={countryInfo && countryInfo.banner} />
                                    {/* <JoditEditor
                                        id={"description"}
                                        ref={editor}
                                        value={props.info && props.info.description}
                                        tabIndex={1} // tabIndex of textarea
                                        onChange={newContent => {}}
                                    /> */}
                                    <Button colorScheme='teal' variant='outline' w={100} onClick={updatePageInfo}>
                                        Save
                                    </Button>
                                </Stack>
                            </>
                        : 
                        <>
                            <ReactCountryFlag countryCode={countryInfo && countryInfo.country_code} svg className={Styles.flagImage} />
                            <Image src={countryInfo && countryInfo.banner} />
                        </>
                    }
                </CardBody>
            </Card>
            {
                stateCount && stateCount > 0 ? <MapTabs code={countryInfo && countryInfo.country_code} /> : null
            }
            <Metric />
        </>
    )
}

export default CountryView