import {React, useEffect, useState} from 'react'
import { Chips } from "primereact/chips";
import Styles from './createUser.module.css'
import API from '../../../../Services/API';
import { PhoneIcon, AddIcon, WarningIcon, } from '@chakra-ui/icons'
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
    FormControl,
    Text
} from '@chakra-ui/react'

import NewPopup from './NewPopup/NewPopup'

const CreateUser = ({ pattern, chips, placeholder, save, maxlength, title, forwardedRef }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [value, setValue] = useState([]);
    const [emails, setEmails] = useState()

    const sendInvite = async (e) =>{
        const body = {
            "email": value
        }
        API.post(`/user-regestration`, body)
        .then((response) => {
            if((response.data && response.data.Success.length < 1) &&  (response.data && response.data.Failure.length < 1)){
                alert("please enter email address in valid format and hit enter")
            }else if((response.data && response.data.Success.length > 0) &&  (response.data && response.data.Failure.length < 1)){
                alert("Sent invitaion mail to given emails")
                onClose()
                setValue([])
            }else if((response.data && response.data.Success.length < 1) &&  (response.data && response.data.Failure.length > 0)){
                alert("User already registered or there is some issue, Please try again later.")
                setValue([])
            }
        })
    }

    const getEmail = (e) =>{
        setValue(e.value)
    }

    return (
        <>
            <Button mb={'15px'} className={Styles.invite} onClick={onOpen}> + Invite </Button>
           

            <Modal isOpen={isOpen} onClose={onClose}  closeOnOverlayClick={false}>
                <ModalOverlay className={Styles.overLay} />
                <ModalContent className={Styles.contentZindex}>
                    <ModalHeader>Add email addresses</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Text className={Styles.note}> Type email address and press Enter ... </Text>
                            <Chips className={Styles.chipsNew} value={value} onChange={(e) => setValue(e.value)} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter className={Styles.modelFooter}>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' onClick={sendInvite} backgroundColor={'#ffffff'}>Invite</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateUser;
