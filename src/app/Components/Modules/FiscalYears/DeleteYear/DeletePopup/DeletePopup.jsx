import React from 'react'
import $ from 'jquery'
import Styles from './newpopup.module.css'
import API from '../../../../../Services/API'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    Card,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Checkbox, 
    Stack
} from '@chakra-ui/react'
const DeletePopup = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()

    const deleteYear = (event) => {
        API.delete(`/fiscal-year/`, {data: {"id": props.id}}, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
        })
    }

    return (
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add new Fiscal Year</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input type='text' id={'yearTitle'} />
                        <Stack spacing={5} direction='row' mt={'10px'}>
                            <Checkbox colorScheme='green'>
                                Save and Add another
                            </Checkbox>
                        </Stack>
                    </FormControl>
                </ModalBody>
                <ModalFooter className={Styles.modelFooter}>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant='ghost' onClick={deleteYear}>Add</Button>
                </ModalFooter>
            </ModalContent>
        </>
    )
}

export default DeletePopup
