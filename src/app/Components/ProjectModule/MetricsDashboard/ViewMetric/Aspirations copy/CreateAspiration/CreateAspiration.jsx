import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom'
import Styles from './createaspiration.module.css'
import $ from 'jquery'
import API from '../../../../../../Services/API'
import {Card, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Select, Box, Input, Textarea, Button, Image, SimpleGrid} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Checkbox, 
    Stack,
} from '@chakra-ui/react'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';

const CreateAspiration = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [state, setState] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false,
    });
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {metricId} = useParams();
    const editor = useRef(null);
    const [fiscalYearList, setFiscalYearList] = useState()
    const [fiscalQtrList, setFiscalQtrList] = useState()



    
    if(state.isPaneOpen){
        $("body").css('position', 'fixed')
    }else{
        $("body").css('position', 'static')
    }

    useEffect(()=>{
        API.get(`/fiscal-year-detail`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
            setFiscalYearList(response.data[0].fiscalyear)
            setFiscalQtrList(response.data[1].fiscalquarter)
        })
    },[])

    const newAspiration = () =>{
        const body = {
            "metric": metricId,
            "name": $("#aspiration_name").val(),
            "value": parseInt($("#aspiration_value").val()),
            "targetfiscalyear": parseInt($("#aspiration_targetfiscalyear").val()),
            "targetfiscalquarter": parseInt($("#aspiration_targetfiscalquarter").val())
        }
        API.post(`/metric-target`, body, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            
        })
    }
    const openSlidingPane = () => {
        setState({ isPaneOpen: true })
    }

    return (
        <>
            <Button float={'right'} className={Styles.addAspiration}  onClick={openSlidingPane}> New Aspiration</Button>
            <SlidingPane
                className={Styles.slidingPane}
                overlayClassName="some-custom-overlay-class"
                isOpen={state.isPaneOpen}
                title="Create Aspiration"
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
                            <FormLabel>Name</FormLabel>
                            <Input type='text' id={'aspiration_name'} mb={'15px'} />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel>Value</FormLabel>
                            <Input type='text' id={'aspiration_value'} mb={'15px'} />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel>Target Fiscal Year</FormLabel>
                            <Select id={'aspiration_targetfiscalyear'} mb={'15px'}>
                                <option> Select fiscal year </option>
                                {
                                    fiscalYearList && fiscalYearList.map(item => 
                                        <option value={item.id}> {item.name} </option>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel>Target Fiscal Quarter </FormLabel>
                            <Select id={'aspiration_targetfiscalquarter'} mb={'15px'}>
                                <option> Select fiscal quarter </option>
                                {
                                    fiscalQtrList && fiscalQtrList.map(item => 
                                        <option value={item.id}> {item.name} </option>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Box>
                </SimpleGrid>
                <Box>
                    <FormControl>   
                        <FormLabel> Description </FormLabel>
                        <JoditEditor
                            id={"aspiration_description"}
                            ref={editor}
                            tabIndex={1} // tabIndex of textarea
                            onChange={newContent => {}}
                        />
                        <Button colorScheme='blue' onClick={newAspiration} mt={'20px'} float={'right'}>Add Aspiration</Button>
                    </FormControl>
                </Box>
            </SlidingPane>
        </>
    )
}

export default CreateAspiration