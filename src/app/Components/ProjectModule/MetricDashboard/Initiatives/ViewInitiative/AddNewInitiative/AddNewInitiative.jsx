import React, { useState, useEffect, useRef, useMemo } from 'react';
import $ from 'jquery'
import Styles from './addnewinitiative.module.css'
import API from '../../../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import { Heading, Card, CardBody, Box, Image, Text, Input, useDisclosure, Textarea, Button, SimpleGrid, Stack, CardFooter, Select} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Checkbox, 
} from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon, } from '@chakra-ui/icons'

const AddNewInitiative = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const newInitiative = () =>{
        let pillarId = props.pillarId
        const formData = new FormData()
        formData.append('name', $("#name").val())
        formData.append('pillar', pillarId)
        formData.append('action',  $("#action").val())
        API.post(`/initiative`, formData,  {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            API.get(`/initiative?pillar_id=${pillarId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(response1 =>{

            })
        })
    }

    return (
        <>
            <Button leftIcon={<AddIcon />} className={Styles.button} variant='solid' float={'right'} onClick={onOpen}>
                Add Initiative
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}  closeOnOverlayClick={false}>
                <ModalOverlay className={Styles.overLay} />
                <ModalContent className={Styles.contentZindex}>
                    <ModalHeader>Add Initiative</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Initiative Title</FormLabel>
                            <Input type='text' id={'name'} mb={'15px'} />
                        </FormControl>
                        <FormControl>
                            <FormLabel> Assign Action </FormLabel>
                            <Select id={'action'}>
                                <option value=''> Please select pillar to assign Initiative </option>
                                {
                                    props.actions && props.actions.map(item => 
                                        <option value={item.id}> {item.name} </option>
                                    )
                                }
                            </Select>                            
                        </FormControl>
                    </ModalBody>
                    <ModalFooter className={Styles.modelFooter}>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' onClick={newInitiative}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddNewInitiative