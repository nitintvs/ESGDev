import {React, useState, useRef} from 'react'
import Styles from './deleteaction.module.css'
import API from '../../../../../Services/API'
import { DeleteIcon } from '@chakra-ui/icons'
import {
    useDisclosure,
    Button,
    Box,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Spinner
} from '@chakra-ui/react'
import LoaderSpinner from '../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'

const DeleteAction = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const [openPopup, setOpenPopup] = useState(false)
    const [message, setMessage] = useState('Deleted article successfully')
    const [isLoading, setIsLoading]  = useState(false)
    
    const deleteAction = (event) => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('id', parseInt(event.target.id))
        formData.append('visible', false)
        API.put(`/pillar`, formData, 
            {
                headers: {'Authorization': 'Bearer ' + token}
            }
        ).then(response =>{
            onClose()
            setIsLoading(false)
            props.getUpdated()
            props.getMessage(true)
        })
    }

    const reload = () => {
        window.location.reload(false);
    }

    return (
        <>
            {
                isLoading ? <LoaderSpinner /> : null
            }
            <Box className={Styles.deleteYearIcon} title={props.title} id={props.id} onClick={onOpen}>
                <DeleteIcon id={props.id} onClick={onOpen} />
            </Box>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                isOpen={isOpen}
                isCentered
                closeOnOverlayClick={false} 
                onClose={onClose}>
                    { isLoading ? 
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                            className={Styles.spinner}
                        />: null
                    }
                <AlertDialogOverlay className={Styles.overLay}>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Deletion Confirmation {props.title}
                        </AlertDialogHeader>

                        <AlertDialogBody mb={'20px'}>
                            Please note that once deleted, the action cannot be reversed.
                        </AlertDialogBody>
                        <AlertDialogCloseButton />
                        <AlertDialogFooter className={Styles.modelFooter}>
                            <Button className={Styles.cancel} ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button className={Styles.proceed} onClick={deleteAction} ml={3} title={props.title} id={props.id} >
                                Proceed
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            {
                openPopup ? 
                    <Box className={Styles.successConfirm}>
                        <Box className={Styles.centerBox}>
                            {message}
                            <Button onClick={reload} colorScheme='red' mt={'20px'} >
                                Close
                            </Button>
                        </Box>
                        
                    </Box>
                :null
            }
        </>
    )
}

export default DeleteAction