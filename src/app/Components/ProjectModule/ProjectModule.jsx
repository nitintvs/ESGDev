import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import API from "../../Services/API";
import {
  Heading,
  Card,
  CardBody,
  Box,
  Image,
  Text,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
import LoaderSpinner from "../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner";
import Breadcrumb from "../Widgets/BreadCrumbs/BreadCrumbs";
import Banner from "./Banner/Banner";
import Form from "./Form/Form";
import Team from "./Team/Team";
import GeographicImpact from "./GeographicImpact/GeographicImpact";
import Actions from "./Actions/Actions";
import MetricsDashboard from "./MetricsDashboard/MetricsDashboard";
import MetricDashboard from "./MetricDashboard/MetricDashboard";
import { EditContext } from "../../Context/BreadcrumbsContext";

const ProjectModule = () => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(true)
    const [editable, setEditable] = useState();
    const [moduleInfo, setModuleInfo] = useState();
    const [actions, setActions] = useState();
    const {id} = useParams();
    const [pillarId, setPillarId] = useState()
    const [pillarTeam, setPillarTeam] = useState()
    const [metric, setMetric] = useState()
    const [initiative, setInitiative] = useState()
    const [pillarMetricId, setPillarMetricId] = useState()
      const {edit, setEdit } = useContext(EditContext);

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        API.get(`/pillar?module_id=${id}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            setModuleInfo(response.data)
            window.localStorage.removeItem("pillarId")
            window.localStorage.setItem("pillarId", response.data && response.data.id)
            setPillarId(response.data && response.data.id)
            API.get(`/action?pillar_id=${response.data.id}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then((response1) => {
                setActions(response1.data)
                API.get(`/pillar-team?pillar_id=${response.data.id}`,
                {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                }).then((response2) => {
                    setPillarTeam(response2.data)
                    API.get(`/metric?pillar_id=${response.data.id}`, {
                        headers: {
                          'Authorization': 'Bearer ' + token
                        }
                    }).then(response3 => {
                        setMetric(response3.data)
                        setPillarMetricId(response.data.id)
                        API.get(`/initiative?pillar_id=${response.data.id}`, {
                            headers: {
                              'Authorization': 'Bearer ' + token
                            }
                        }).then(response3 => {
                            setInitiative(response3.data)
                            setIsLoading(false)
                        })
                    })
                })
            })
        })
    },[id])

    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }

    const getUpdate = (updatedInfo) =>{
        setModuleInfo(updatedInfo)
    }

    const getUpdatedTeam = (team) =>{
        setPillarTeam(team)
    }

    const getUpdatedActions = (action) =>{
        setActions(action)
    }

    return (
        <>
            {
                isLoading ? <LoaderSpinner /> : null
            }
            <Breadcrumb geteditStatus={geteditStatus} title={moduleInfo && moduleInfo.name} pillarId={pillarId && pillarId} />
            <Card mt={'15px'} pb={'0'}>
                <CardBody pb={'0'}>
                    <Box>
                        {
                            edit ? 
                                <Form moduleInfo={moduleInfo} getUpdate={getUpdate} /> 
                            : 
                            <>
                                {
                                    moduleInfo && moduleInfo.banner !== null ? <Banner banner={moduleInfo && moduleInfo.banner} alt={moduleInfo && moduleInfo.name} /> : null
                                }
                                {
                                    moduleInfo && moduleInfo.description !== null ? 
                                        <Box mt={'10px'}>
                                            {parse(moduleInfo && moduleInfo.description)}
                                        </Box> 
                                    : null
                                }
                            </>
                        }
                    </Box>
                </CardBody>
            </Card>
            <Team 
                team={pillarTeam && pillarTeam} 
                editable={edit} 
                pillarId={pillarId && pillarId} 
                actions={actions && actions}
                getUpdatedTeam = {getUpdatedTeam}
                title={moduleInfo && moduleInfo.name} 
            />
            <GeographicImpact pillarId={pillarId && pillarId} />
            <Actions pillarId={pillarId && pillarId} actions={actions && actions} editable={edit} getUpdatedActions={getUpdatedActions} />

            <MetricDashboard
                pillarId={pillarId && pillarId} 
                pillarMetricId={pillarMetricId && pillarMetricId} 
                editable={edit}  
                actions={actions && actions}
            />
        </>
    )
}

export default ProjectModule

