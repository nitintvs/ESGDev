import React, { useState, useEffect, useRef, useMemo } from 'react';
import $ from 'jquery'
import API from '../../../../../../../Services/API';
import Styles from '../style.module.css'
import { Heading, Card, CardBody, Box, Image, Text, Input, useDisclosure, Textarea, Button, SimpleGrid, Stack, CardFooter, Select} from '@chakra-ui/react'
import { FormControl, FormLabel, Switch  } from '@chakra-ui/react'
import {Tabs, TabList, TabPanels, Tab, TabPanel,} from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import JoditEditor from 'jodit-react';

const CreateStrategy = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [state, setState] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false,
    });
    const [isLoading, setIsLoading] =useState(false)
    const editor = useRef(null);
    const [message, setMessage] = useState(false)

    const openSlidingPane = () => {
        setState({ isPaneOpen: true })
    }

    const newStrategy = () =>{
        setIsLoading(true)
        const body = {
            "name":$('#strategyname').val(),
            "action":props.actionId && props.actionId,
            "description":$("#strategydescription").val()
        }
        API.post(`/strategy`, body, {
            headers: {
            'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setState({ isPaneOpen: false });
            API.get(`/strategy?action_id=${props.actionId && props.actionId}`, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
            }).then(response3 => {
                props.getUpdate(response3.data)
                setIsLoading(false)
                setMessage(true)
            })
        })
    }

    return (
        <>
            <Button className={Styles.addButton}  onClick={openSlidingPane}> <AddIcon /> <Text as={'span'} ml={'5px'}> Add Strategy </Text> </Button>
            
            <SlidingPane
                className={Styles.slidingPane}
                overlayClassName="some-custom-overlay-class"
                isOpen={state.isPaneOpen}
                title="Create Strategy"
                subtitle=""
                width="50%"
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setState({ isPaneOpen: false });
                }}
            >
                <SimpleGrid columns={[1]} spacing='20px' mt={'10px'}>
                    <Box>
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Name <text as='span' className='hilightStar'>*</text></FormLabel>
                            <Input type='text' id={'strategyname'} mb={'0px'} errorBorderColor='crimson' />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>   
                            <FormLabel fontWeight={'bold'}> Description </FormLabel>
                            <JoditEditor
                                id={"strategydescription"}
                                ref={editor}
                                tabIndex={1} // tabIndex of textarea
                                onChange={newContent => {}}
                            />
                            <Button colorScheme='blue' onClick={newStrategy} mt={'20px'} float={'right'}>Add Strategy</Button>
                        </FormControl>
                    </Box>
                </SimpleGrid>
            </SlidingPane>
        </>
    )
}

export default CreateStrategy