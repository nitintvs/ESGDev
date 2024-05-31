import {React, useState, useRef} from 'react'
import Styles from './deletetag.module.css'
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

import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'

const DeleteTag = (props) => {
  const token = window.localStorage.getItem("accessToken")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const [openPopup, setOpenPopup] = useState(false)
  const [message, setMessage] = useState('Deleted article successfully')
  const [isLoading, setIsLoading]  = useState(false)

  const deleteTag = (event) => {
    setIsLoading(true)
    API.delete(`/tag-detail/`, {data: {"id": props.id}}, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
  })
    .then((response) => {
      setOpenPopup(true)
      setIsLoading(false)
    })
  }
  
  const reload = () => {
    window.location.reload(false);
  }

  function deleteData() {
    setIsLoading(true)
    const dataToDelete = {
        "id": parseInt(props.id) // Example data to delete
        // Add any other necessary fields here
    };

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    API.delete(`tag-detail`, {
        headers: headers,
        data: dataToDelete // Pass the data to delete
    })
    .then(response => {
      onClose()
      API.get(`/tag-detail/`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then((response) => {
          props.getUpdatedDelete(response.data.results)
      })
      setIsLoading(false)
    })
    .catch(error => {
        console.error("Error:", error.message);
        // Handle errors
    });
}

  return (
    <>
      {isLoading ? <LoaderSpinner /> : null}
      <Box className={Styles.deleteYearIcon} title={props.title} id={props.id} onClick={onOpen}>
        <DeleteIcon id={props.id} onClick={onOpen} />
      </Box>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false} 
        onClose={onClose}
      >
        
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

export default DeleteTag