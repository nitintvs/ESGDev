import React,{useState} from 'react'
import $ from 'jquery'
import Styles from './newpopup.module.css'
import API from '../../../../../Services/API'
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
const NewPopup = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [addAnother, setAddAnother] = useState(false)

    const saveAndAddNew = (event) =>{
        setAddAnother(event.target.checked)
    }

    const newArticle = () => {
        const formData = new FormData()
        formData.append('about_info', props.id)
        formData.append('prop_label', $("#prop_label").val())
        formData.append('article_name', $("#article_name").val())
        API.post(`/about-article/`, formData, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            if(addAnother){
                onOpen()
                $("#article_name").val('')
                API.get(`/about-article/`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                })
                .then((response) => {
                    //setFaqList(response.data.results)
                    //setFaqListCount(response.data && response.data.results && response.data.results.length)
                    props.getUpdated(response.data.results)
                })
            }else{
                onClose()
                API.get(`/about-article/`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                })
                .then((response) => {
                    //setFaqList(response.data.results)
                    //setFaqListCount(response.data && response.data.results && response.data.results.length)
                    props.getUpdated(response.data.results)
                })
            }
        })
    }

    return (
        <>
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
                    <ModalHeader>Add new article</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Article Name</FormLabel>
                            <Input type='text' id={'article_name'} mb={'15px'} />
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
                        <Button variant='ghost' onClick={newArticle}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default NewPopup
