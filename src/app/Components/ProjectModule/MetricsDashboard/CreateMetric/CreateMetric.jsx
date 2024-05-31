import React, { useState, useEffect, useRef, useMemo } from 'react';
import $ from 'jquery'
import Styles from './createmetric.module.css'
import { Link, useParams } from 'react-router-dom'
import { Heading, Card, CardBody, Box, Image, Text, Input, useDisclosure, Textarea, Button, SimpleGrid, Stack, CardFooter, Select} from '@chakra-ui/react'
import { FormControl, FormLabel, Switch  } from '@chakra-ui/react'
import API from '../../../../Services/API';
import { PhoneIcon, AddIcon, WarningIcon, } from '@chakra-ui/icons'
import LoaderSpinner from '../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';

const CreateMetric = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [state, setState] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false,
    });
    const [isLoading, setIsLoading] =useState(false)
    const editor = useRef(null);
    const [message, setMessage] = useState(false)
    const [pillarAction, setPillarAction] = useState([]);
    const [isDashboard, setIsDashboard] = useState(false)
    const [isAction, setIsAction] = useState(false)
    const [isPillar, setIsPillar] = useState(false)
    const [isQbr, setIsQbr] = useState(false)
    const [isBoard, setIsBoard] = useState(false)
    const [isInterlock, setIsInterlock] = useState(false)
    const [isMap, setIsMap] = useState(false)
    


    useEffect(()=>{
        API.get(`/get-pillar-action`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setPillarAction(response.data[0])
        })
    },[])


    const openSlidingPane = () => {
        setState({ isPaneOpen: true })
    }

    const metricdashboard = (event) =>{
        setIsDashboard(event.target.checked)
    }
    const metricactioncheck = (event) =>{
        setIsAction(event.target.checked)
    }
    const metricpillarcheck = (event) =>{
        setIsPillar(event.target.checked)
    }
    const metricqbr = (event) =>{
        setIsQbr(event.target.checked)
    }
    
    const metricboard = (event) =>{
        setIsBoard(event.target.checked)
    }

    const metricinterlock = (event) =>{
        setIsInterlock(event.target.checked)
    }

    const metricmap = (event) =>{
        setIsMap(event.target.checked)
    }
    
    const newMetric =  () => {
        setIsLoading(true)
        const body = {
            "name": $('#metricname').val(),
            "description": $("#metricdescription").val(),
            "datatype": $("#metricdatatype").val(),
            "metrictype": $("#metrictype").val(),
            "aggregate": $("#metricaggregate").val(),
            "dashboard": isDashboard,
            "pillar": isPillar,
            "action": isAction,
            "qbr": isQbr,
            "board": isBoard,
            "interlock": isInterlock,
            "map": isMap,
            "pillar_id": props.pillarMetricId && props.pillarMetricId,
            "action_id": parseInt($("#metricaction").val())
        }

        API.post(`/metric`, body, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setState({ isPaneOpen: false });
            API.get(`/metric?pillar_id=${props.pillarMetricId}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then(response3 => {
                props.getUpdated(response3.data)
                setIsLoading(false)
                setMessage(true)
            })
        })
    }


    return (
        <>
            {isLoading ? <LoaderSpinner /> : null }
            <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid' float={'right'} onClick={openSlidingPane}>
                Add Metric 
            </Button>
            {message ? <Box className={Styles.successMessage}> Created Metric successfully  </Box> : false }
            <SlidingPane
                className={Styles.slidingPane}
                overlayClassName="some-custom-overlay-class"
                isOpen={state.isPaneOpen}
                title="Create Metric"
                subtitle=""
                width="50%"
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setState({ isPaneOpen: false });
                }}
            >
                <SimpleGrid columns={[1, 2]} spacing='20px' mt={'10px'}>
                    <Box>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Name</FormLabel>
                            <Input type='text' id={'metricname'} mb={'0px'} />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Datatype</FormLabel>
                            <Select id={'metricdatatype'} mb={'0px'}>
                                <option> Please select datatype </option>
                                <option value={'percent'}> Percent </option>
                                <option value={'number'}> Number </option>
                                <option value={'money'}> Money </option>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Metrictype</FormLabel>
                            <Select id={'metrictype'} mb={'0px'}>
                                <option> Please select metrictype </option>
                                <option value={'operational'}> Operational </option>
                                <option value={'financial'}> Financial </option>
                                <option value={'impact'}> Impact </option>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Aggregate</FormLabel>
                            <Select id={'metricaggregate'} mb={'0px'}>
                                <option> Please select aggregate </option>
                                <option value={'sum'}> Sum </option>
                                <option value={'avg'}> Avg </option>
                                <option value={'max'}> Max </option>
                                <option value={'last'}> Last </option>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Select Action</FormLabel>
                            <Select id={'metricaction'} mb={'0px'}>
                                <option> Please select aggregate </option>
                                {
                                    pillarAction && pillarAction.map(item =>
                                        item.type === 'action' ?
                                        <option value={item.id}> {item.name} </option> : null
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='metricdashboard' mb='0' fontWeight={'bold'} className={Styles.frmLabel}>
                                Dashboard 
                            </FormLabel>
                            <Switch id='metricdashboard' mt={'14px'} onChange={metricdashboard} />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='metricactioncheck' mb='0' fontWeight={'bold'} className={Styles.frmLabel}>
                                Action
                            </FormLabel>
                            <Switch id='metricactioncheck' mt={'14px'} onChange={metricactioncheck} />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='metricpillarcheck' mb='0' fontWeight={'bold'} className={Styles.frmLabel}>
                                Pillar
                            </FormLabel>
                            <Switch id='metricpillarcheck' mt={'14px'} onChange={metricpillarcheck} />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='metricqbr' mb='0' fontWeight={'bold'} className={Styles.frmLabel}>
                                Executive Leadership Review
                            </FormLabel>
                            <Switch id='metricqbr' mt={'14px'} onChange={metricqbr} />
                        </FormControl>
                    </Box>
                    {/* <Box>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='metricboard' fontWeight={'bold'} mb='0' className={Styles.frmLabel}>
                                Board
                            </FormLabel>
                            <Switch id='metricboard' mt={'14px'} onChange={metricboard} />
                        </FormControl>
                    </Box> */}
                    <Box>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='metricinterlock ' fontWeight={'bold'} mb='0' className={Styles.frmLabel}>
                                Interlock 
                            </FormLabel>
                            <Switch id='metricinterlock' mt={'14px'} onChange={metricinterlock} />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='metricmap' mb='0' fontWeight={'bold'} className={Styles.frmLabel}>
                                Map 
                            </FormLabel>
                            <Switch id='metricmap' mt={'14px'} onChange={metricmap} />
                        </FormControl>
                    </Box>
                </SimpleGrid>
                <Box>
                    <FormControl>   
                        <FormLabel fontWeight={'bold'}> Description </FormLabel>
                        <JoditEditor
                            id={"metricdescription"}
                            ref={editor}
                            tabIndex={1} // tabIndex of textarea
                            onChange={newContent => {}}
                        />
                        <Button colorScheme='blue' onClick={newMetric} mt={'20px'} float={'right'}>Add Metric</Button>
                    </FormControl>
                </Box>
            </SlidingPane>
        </>
    )
}

export default CreateMetric