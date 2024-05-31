import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from '../viewmetric.module.css'
import { Link, useParams } from 'react-router-dom'
import {Grid, Card, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image} from '@chakra-ui/react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, useDisclosure} from '@chakra-ui/react'
import CreateAspiration from './CreateAspiration/CreateAspiration';
import { EditIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import API from '../../../../../Services/API';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import LoaderSpinner from '../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import EditAspiration from './EditAspiration/EditAspiration';

const Aspirations = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpenEdit, onOpenEdit, onCloseEdit } = useDisclosure()
    const [isLoading, setIsLoading] = useState()
    const {metricId} = useParams();

    const getUpdatedAspiration = (getUpdatedAspiration) => {
        props.getUpdatedAspiration(getUpdatedAspiration)
    }
    
    const editAction = () => {

    }

    const deleteAction = (event) => {
        setIsLoading(true)
        event.stopPropagation();
        onClose()
        const body = {
          "id": parseInt(event.currentTarget.id),
          "visible": false,
        }
        API.put(`/metric-target`,body, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response=>{
            API.get(`/metric-target?metric_id=${metricId}`)
            .then(response1 => {
                props.getUpdatedAspiration(response1.data)
                setIsLoading(false)
            })
        })
    }

    return (
        <>
            {
                isLoading ? <LoaderSpinner /> : null
            }
            <TableContainer>
                {props.editable ? <CreateAspiration getUpdatedAspiration={getUpdatedAspiration} /> : null}
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>Value</Th>
                            <Th>Title</Th>
                            <Th>Period - Fiscal Year</Th>
                            <Th>Period - Fiscal QTR</Th>
                            <Th>Action - elements</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            props.aspirations && props.aspirations.map(item => 
                                <Tr>
                                    <Td textTransform={'capitalize'}>
                                        {
                                            item.datatype === 'number' ? " # " : 
                                            item.datatype === 'money' ? " $ " : null
                                        } 
                                        {item.value}
                                        {
                                            item.datatype === 'percent' ? " % " :  null
                                        } 
                                    </Td>
                                    <Td textTransform={'capitalize'}>{item.name}</Td>
                                    <Td textTransform={'capitalize'}> {item.target_fiscal_year_name} </Td>
                                    <Td textTransform={'capitalize'}> {item.target_fiscal_quarter_name} </Td>
                                    <Td>
                                        <EditAspiration 
                                            id={item.id} 
                                            title={item.name}
                                            value={item.value}
                                            fiscalYear={item.target_fiscal_year_name}
                                            fiscalQtr={item.target_fiscal_quarter_name}
                                            getUpdatedAspiration={props.getUpdatedAspiration}
                                        />
                                        <Button className='deleteNButton' id={item.id} onClick={onOpen}>
                                            <DeleteIcon id={item.id} onClick={onOpen} /> 
                                        </Button>
                                        <Modal isOpen={isOpen} onClose={onClose}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>Delete Confirmation</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    Are you sure you want to delete <Text as='span' fontWeight={'bold'}>{item.name}</Text> ? This action cannot be reversed.
                                                </ModalBody>
                                                <ModalFooter backgroundColor={'transparent'}>
                                                    <Button mr={3} onClick={onClose}>
                                                        Cancel
                                                    </Button>
                                                    <Button className='buttonPrimary' id={item.id} onClick={deleteAction}>Confirm</Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </Td>
                                </Tr>
                            )
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Aspirations