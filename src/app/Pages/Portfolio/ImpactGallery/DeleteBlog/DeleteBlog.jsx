import {React, useState, useRef} from 'react'
import Styles from './deleteblog.module.css'
import API from '../../../../Services/API'
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
import LoaderSpinner from '../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'
const DeleteBlog = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const [openPopup, setOpenPopup] = useState(false)
    const [message, setMessage] = useState('Deleted article successfully')
    const [isLoading, setIsLoading]  = useState(false)

    async function deleteData() {
        setIsLoading(true)
        const dataToDelete = {
            "blog_id": props.id // Example data to delete
        };

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await API.delete(`/blog`, {
                headers: headers,
                data: dataToDelete // Pass the data to delete
            });
            API.get(`/blog`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                onClose()
                props.getUpdatedList(response.data)
                props.getDeleteMessage(true)
                setIsLoading(false)
            })
        } catch (error) {
            console.error("Error:", error.message);
            setIsLoading(false)
            // Handle errors
        }
    }

    return (
        <>
            {
                isLoading  ?<LoaderSpinner /> : null
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
                            <Button className={Styles.cancel} ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={deleteData} ml={3} title={props.title} id={props.id} >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default DeleteBlog