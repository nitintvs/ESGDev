import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import $ from 'jquery'
import API from '../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import Styles from './viewmetric.module.css'
import {Card, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image} from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import Breadcrumb from '../../../../Components/Widgets/BreadCrumbs/BreadCrumbs'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import Aspirations from './Aspirations/Aspirations';
import MetrData from './MetricData/MetricData'
import MetricSettings from './MetricSettings/MetricSettings';
import { EditContext } from "../../../../Context/BreadcrumbsContext";



const ViewMetric = () => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(true)
    const [editable, setEditable] = useState();
    const [action, setAction] = useState();
    const {metricId} = useParams();
    const editor = useRef(null);
    const [file, setFile] = useState(null);
    const [metric, setMetric] = useState();
    const [aspirations, setAspirations] = useState()
    const [metricData, setMetricData] = useState()
    const {edit, setEdit } = useContext(EditContext);

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        setIsLoading(true)
        API.get(`/get-metric?metric_id=${metricId}`)
        .then((response) => {
            setMetric(response.data[0])
            API.get(`/metric-target?metric_id=${metricId}`)
            .then(response1 => {
                setAspirations(response1.data)
                API.get(`/metric-data?metric_id=${metricId}`)
                .then(response=>{
                    setMetricData(response.data)
                    setIsLoading(false)
                })
            })
        })
    },[metricId])

    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }

    const getUpdatedAspiration = (updatedAspiration) => {
        setAspirations(updatedAspiration)
    }

    const getUpdatedMetricData = (updatedAspiration) => {
        setMetricData(updatedAspiration)
    }


    return (
        <>
            { 
                isLoading ? <LoaderSpinner />: null
            }
            <Breadcrumb geteditStatus={geteditStatus} title={metric && metric.name} pillarId={metric && metric.id} />
            <Card>
                <CardBody>
                    <Tabs size='md' variant='enclosed'>
                        <TabList>
                            <Tab  className={Styles.tabsGroup}
                _selected={{
                  color: "#00a0da",
                  borderBottom: "2px solid #00a0da",
                }}>Aspirations</Tab>
                            <Tab>Metric Data</Tab>
                            <Tab  className={Styles.tabsGroup}
                _selected={{
                  color: "#00a0da",
                  borderBottom: "2px solid #00a0da",
                }}>Metric Settings</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Aspirations getUpdatedAspiration={getUpdatedAspiration} editable={edit} aspirations={aspirations && aspirations} />
                            </TabPanel>
                            <TabPanel>
                                <MetrData editable={edit} getUpdatedMetricData={getUpdatedMetricData} metricData={metricData && metricData} />
                            </TabPanel>
                            <TabPanel>
                                <MetricSettings editable={edit} metric={metric && metric} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </CardBody>
            </Card>

            
        </>
    )
}

export default ViewMetric