import {React, useEffect, useState, useRef} from 'react'
import Styles from './deleteyear.module.css'
import API from '../../../../../Services/API'
import { DeleteIcon } from '@chakra-ui/icons'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
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
import DeletePopup from './DeletePopup/DeletePopup'

const DeleteYear = (props) => {
    document.documentElement.scrollTo(0, 0);
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const [openPopup, setOpenPopup] = useState(false)
    const [message, setMessage] = useState('Fiscal year entry deleted successfully')
    const [isLoading, setIsLoading]  = useState(false)

    const deleteYear = (event) => {
        setIsLoading(true)
        API.delete(`/fiscal-year-quarter/`, {data: {"id": props.id}}, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setOpenPopup(true)
            //setMessage(response)
            setIsLoading(false)
        })
    }
    const reload = () => {
        window.location.reload(false);
    }
    return (
        <>
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
                            Delete {props.title}
                        </AlertDialogHeader>

                        <AlertDialogBody mb={'20px'}>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogCloseButton />
                        <AlertDialogFooter className={Styles.modelFooter}>
                            <Button className={Styles.cancel} ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={deleteYear} ml={3} title={props.title} id={props.id} >
                                Delete
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

export default DeleteYear
