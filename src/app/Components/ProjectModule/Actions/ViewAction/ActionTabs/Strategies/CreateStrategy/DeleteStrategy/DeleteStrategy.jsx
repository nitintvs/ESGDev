import React, { useState, useEffect, useRef, useMemo } from 'react';
import API from '../../../../../../../../Services/API';
import Styles from './deleteStrategy.module.css'
import LoaderSpinner from '../../../../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import {useDisclosure, Card, SimpleGrid, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image} from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon, DeleteIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

const DeleteStrategy = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] =useState(false)

    async function deleteData() {
        setIsLoading(true)
        const dataToDelete = {
            "id": props.id // Example data to delete
        };
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        try {
            const response = await API.delete(`/strategy`, {
                headers: headers,
                data: dataToDelete // Pass the data to delete
            });
            API.get(`/strategy?action_id=${props.actionId && props.actionId}`, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
            }).then(response3 => {
                props.getUpdate(response3.data)
                props.getDeleteUpdate()
                setIsLoading(false)
            })
        } catch (error) {
            console.error("Error:", error.message);
            setIsLoading(false)
        }
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            <Box className={Styles.delete} onClick={onOpen}>
                <DeleteIcon />
            </Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Box>
                            Are you sure? You can't undo this action afterwards.
                        </Box>
                    </ModalBody>
                    <ModalFooter backgroundColor={'transparent'}>
                        <Button onClick={onClose} mr={3}>Cancel</Button>
                        <Button colorScheme='blue' onClick={deleteData}> Delete </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteStrategy