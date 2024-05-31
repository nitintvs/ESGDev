import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from './actions.module.css'
import $ from 'jquery'
import API from '../../../Services/API';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button, Badge, SimpleGrid} from '@chakra-ui/react'
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
import { PhoneIcon, AddIcon, WarningIcon, } from '@chakra-ui/icons'
import ActionsList from './ActionsList/ActionsList';
import LoaderSpinner from '../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const Actions = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const {id} = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading]  = useState(false)
    const [success, setSuccess]  = useState(false)


    const newAction = () => {
        setIsLoading(true)
        const body = {
            "name": $("#moduleName").val(),
            "category": 'pillar',
            "parent_id": id,
            "unique_name": (($("#moduleName").val()).match(/\b(\w)/g)).join(''),
        }
        API.post(`/project-modules`, body, {headers: {'Authorization': 'Bearer ' + token}})
        .then((response) => {
            onClose()
            API.get(`/pillar?module_id=${id}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                API.get(`/action?pillar_id=${response.data.id}`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                }).then((response1) => {
                    props.getUpdatedActions(response1.data)
                    setIsLoading(false)
                })
            })
        })
    }
    const getUpdated = (updatedAction) => {
        API.get(`/pillar?module_id=${id}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            API.get(`/action?pillar_id=${response.data.id}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then((response1) => {
                props.getUpdatedActions(response1.data)
                setIsLoading(false)
            })
        })
    }

    const getMessage = (message) =>{
        setSuccess(message)
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            <Heading as='h2' size='lg' mb={'15px'} fontSize={'19px'} mt={'20px'} className={Styles.customHeadingH3}>
                Actions
                {
                    props.editable ? 
                        <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid' float={'right'} onClick={onOpen}>
                            Add Action 
                        </Button>
                    : null
                }
                <Box className={Styles.clearFix}></Box>
            </Heading>
            <Card mt={'0px'}>
                <CardBody>
                    {success ? <Box className='successInfoNew'> Action deleted successfully </Box> : null}
                    <Box>
                        <SimpleGrid columns={[1, 2, 3, 5]} spacing='20px' mt={'10px'}>
                            {
                                props.actions && props.actions.map((item, index) =>
                                    <>
                                        <ActionsList
                                            id={item.id}
                                            name={item.name}
                                            banner={item.banner}
                                            module={item.module}
                                            editable={props.editable}
                                            getUpdated={getUpdated}
                                            getMessage={getMessage}
                                        />
                                    </>
                                )
                            }
                        </SimpleGrid>
                    </Box>
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}  closeOnOverlayClick={false}>
                <ModalOverlay className={Styles.overLay} />
                <ModalContent className={Styles.contentZindex}>
                    <ModalHeader>Add new action</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Action Name</FormLabel>
                            <Input type='text' id={'moduleName'} mb={'15px'} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter className={Styles.modelFooter}>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' onClick={newAction}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Actions