import React, { useState } from 'react'
import $ from 'jquery'
import Styles from './newFaq.module.css'
import API from '../../../../Services/API'
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
    Box,
    Card,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Checkbox, 
    Stack,
    Textarea 
} from '@chakra-ui/react'
import LoaderSpinner from '../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'


const NewFaq = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [addAnother, setAddAnother] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const saveAndAddNew = (event) =>{
        setAddAnother(event.target.checked)
    }

    const newFaq = () =>{
        setIsLoading(true)
        const formData = new FormData()
        formData.append('faq_info', props.faqInfo && props.faqInfo.id)
        formData.append('name', $("#prop_label").val())
        API.post(`/faq-detail/`, formData, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            if(addAnother){
                onOpen()
                $("#prop_label").val('')
                API.get(`/faq-detail/`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                })
                .then((response) => {
                    //setFaqList(response.data.results)
                    //setFaqListCount(response.data && response.data.results && response.data.results.length)
                    props.getUpdated(response.data.results)
                    setIsLoading(false)
                })
            }else{
                onClose()
                API.get(`/faq-detail/`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                })
                .then((response) => {
                    //setFaqList(response.data.results)
                    //setFaqListCount(response.data && response.data.results && response.data.results.length)
                    props.getUpdated(response.data.results)
                    setIsLoading(false)
                })
            }
        })
    }

    return (
        <>
        {
            isLoading ? <LoaderSpinner /> : null
        }
            <Box className='cardHover' mb={'30px'}>
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

            <Modal isOpen={isOpen} onClose={onClose}  closeOnOverlayClick={false}>
                <ModalOverlay className={Styles.overLay} />
                <ModalContent className={Styles.contentZindex}>
                    <ModalHeader>Add new FAQ</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input type='text' id={'prop_label'} mb={'15px'} />

                            <Stack spacing={5} direction='row' mt={'10px'}>
                                <Checkbox colorScheme='green' defaultChecked={addAnother} onChange={saveAndAddNew}>
                                    Save and Add another
                                </Checkbox>
                            </Stack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter className={Styles.modelFooter}>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={newFaq}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default NewFaq