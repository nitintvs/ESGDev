import {React, useState, useRef} from 'react'
import Styles from './deleteyear.module.css'
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
    Spinner,
    Text
} from '@chakra-ui/react'
import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'

const DeleteArticle = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const [openPopup, setOpenPopup] = useState(false)
    const [message, setMessage] = useState('Deleted article successfully')
    const [isLoading, setIsLoading]  = useState(false)

    const deleteArticle = (event) => {
        setIsLoading(true)
        API.delete(`/about-article/`, {data: {"id": props.id}, headers: {
            'Authorization': 'Bearer ' + token
        }})
        .then((response) => {
            onClose()
            
            //setMessage(response)
            API.get(`/about-article/`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                props.getUpdated(response.data.results)
                setIsLoading(false)
                props.getUpdatedMessage(true)
            })
        })
    }
    const reload = () => {
        setOpenPopup(false);
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
                            <Button className={Styles.cancel} ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={deleteArticle} ml={3} title={props.title} id={props.id} >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default DeleteArticle
