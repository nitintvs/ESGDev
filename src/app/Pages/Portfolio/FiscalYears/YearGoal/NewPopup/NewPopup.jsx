import React, {useState} from 'react'
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
const NewPopup = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [addAnother, setAddAnother] = useState(false)

    const saveAndAddNew = (event) =>{
        setAddAnother(event.target.checked)
    }

    const addNewYear = () => {
        const formData = new FormData()
        formData.append('fiscal_year_info', props.fieldId)
        formData.append('name', $('#yearTitle').val())
        formData.append('fiscal_year', props.fiscal_year)
        
        API.post(`/fiscal-year-quarter/`, formData, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            if(addAnother){
                $("#yearTitle").val('')
                onOpen()
            }else{
                onClose()
                alert("Please refresh the page to see changes")
            }
        })
    }

    return (
        <>
            <Box className='cardHover'>
                <Card height='100px' bg='white' position={'relative'} cursor={'pointer'} onClick={onOpen}>
                    <Heading 
                        as='h1' 
                        size='sm' 
                        noOfLines={1} 
                        position={'relative'} 
                        top={'50%'} 
                        className={Styles.verticalAlign}
                        textAlign={'center'}
                    >
                        <AddIcon boxSize={3} /> Add New
                    </Heading>
                </Card>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add new Fiscal Year QTR</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input type='text' id={'yearTitle'} />
                            <Stack spacing={5} direction='row' mt={'10px'}>
                                <Checkbox colorScheme='green' defaultChecked={addAnother} onChange={saveAndAddNew}>
                                    Save and Add another
                                </Checkbox>
                            </Stack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter className={Styles.modelFooter}>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' onClick={addNewYear}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default NewPopup
