import {React, useEffect, useState, useRef} from 'react'
import Styles from './deleteyear.module.css'
import API from '../../../../Services/API'
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
import LoaderSpinner from '../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'

const DeleteYear = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const [openPopup, setOpenPopup] = useState(false)
    const [message, setMessage] = useState('Fiscal year entry deleted successfully')
    const [isLoading, setIsLoading]  = useState(false)

    async function deleteYear () {
        setIsLoading(true)

        const dataToDelete = {
            "id": props.id // Example data to delete
            // Add any other necessary fields here
        };

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await API.delete(`/fiscal-year/`, {
                headers: headers,
                data: dataToDelete // Pass the data to delete
            });
            API.get(`/fiscal-year/`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                props.getUpdatedList(response.data.results)
                setOpenPopup(true)
                onClose()
                setIsLoading(false)
                props.getMessage(true)
            })
        } catch (error) {
            console.error("Error:", error.message);
            setIsLoading(false)
        }
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
                            Delete {props.title}
                        </AlertDialogHeader>

                        <AlertDialogBody mb={'20px'}>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogCloseButton />
                        <AlertDialogFooter className={Styles.modelFooter}>
                            <Button colorScheme='grey' className={Styles.cancel} ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button className={Styles.deleteConfirm}  onClick={deleteYear} ml={3} title={props.title} id={props.id} >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default DeleteYear
