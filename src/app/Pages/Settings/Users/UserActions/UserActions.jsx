import React, {useState} from 'react'
import $ from 'jquery'
import Styles from './userActions.module.css'
import API from '../../../../Services/API'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Td, Button, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Box, Card,
    Heading, FormControl, FormLabel, Input, Checkbox,  Stack, Textarea
} from '@chakra-ui/react'

import LoaderSpinner from '../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'

const UserActions = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const token = window.localStorage.getItem("accessToken")
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    
    function profilePicture(e) {
        setFile(e.target.files[0]);
    }

    const deleteUser = () =>{
        setIsLoading(true)
        API.delete(`/user-management?user_id=${props.id}`,  {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        },)
        .then((response) => {
            API.get(`/list-user`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                props.getUpdatedUserInfo(response.data)
                onClose()
                setIsLoading(false)
                toast({
                    title: 'Delete User',
                    description: "User deleted successfully",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }).catch(error => {
                
            });
        })
    }

    const updateUser = () => {
        let currentUser = JSON.parse(window.localStorage.getItem('user'))
        setIsLoading(true)
        onClose()
        const formData = new FormData()
        if(file != null){
            formData.append('profile_picture', file)
        }
        formData.append('user_id', props.id)
        formData.append('first_name', $("#first_name").val())
        formData.append('last_name', $("#last_name").val())
        if(($("#password").val() !== '')){
            formData.append('password', $("#password").val())
        }
        API.put(`/user-management`, formData, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        )
        .then((response) => {
            API.get(`/list-user`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                props.getUpdatedUserInfo(response.data)
                if(props.id === currentUser.id){
                    window.localStorage.removeItem(`user`)
                    window.localStorage.setItem('user', JSON.stringify(response.data.filter(item => item.id === props.id) && response.data.filter(item => item.id === props.id)[0]))
                    setIsLoading(false)
                    toast({
                        title: 'Updating User',
                        description: "User updated successfully, we are reloading the page to see updated details",
                        status: 'success',
                        isClosable: true,
                    })
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }else{
                    setIsLoading(false)
                    toast({
                        title: 'Updating User',
                        description: "User updated successfully, please reload the page to see changes",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            }).catch(error => {

            });
        })
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null }
            <Td pb={'0px'} pt={'0px'} isNumeric>
                <Button id={props.id} mr={'10px'}  onClick={onOpen}> <EditIcon /> </Button>  
                <Button id={props.id} onClick={deleteUser}> <DeleteIcon /> </Button>
            </Td>

            <Modal isOpen={isOpen} onClose={onClose} className={Styles.userActions}  closeOnOverlayClick={false}>
                <ModalOverlay className={Styles.overLay} />
                <ModalContent className={Styles.contentZindex}>
                    <ModalHeader> Update User Details </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input type='text' id={'first_name'} mb={'15px'} defaultValue={props.firstName} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input type='text' id={'last_name'} mb={'15px'} defaultValue={props.lastName} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Profile Picture</FormLabel>
                            <Input type="file" onChange={profilePicture} mb={'15px'} padding={"4px"}  />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' id={'password'} mb={'15px'} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter className={Styles.modelFooter}>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={updateUser}>Update User</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UserActions