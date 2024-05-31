import React,{useState} from 'react'
import $ from 'jquery'
import Styles from './addNewTag.module.css'
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
import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'
const AddNewTag = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [addAnother, setAddAnother] = useState(false)
    const [error, setError] = useState(false)
    const [errorCount, setErrorCount] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const saveAndAddNew = (event) =>{
        setAddAnother(event.target.checked)
    }

    const newTag = () => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('tag_info', props.id)
        formData.append('name', $("#tagName").val())
        API.post(`/tag-detail/`, formData, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            if(addAnother){
                onOpen()
                $("#prop_label").val('')
                $("#article_name").val('')
                setIsLoading(false)
            }else{
                onClose()
                setIsLoading(false)
            }
            API.get(`/tag-detail/`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                props.getUpdatedList(response.data.results)
            })
            
        }).catch ((error) => {
            setErrorCount(true)
            setError(error.response.data.name[0]);
            setIsLoading(false)
        })
    }
    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
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
                    <ModalHeader>Add new Tag</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            {
                                errorCount ? <Box className='validRed' textTransform={'initial'}> {error.charAt(0).toUpperCase()}{error.slice(1)} </Box> : null
                            }
                            
                            <FormLabel>Title</FormLabel>
                            <Input type='text' id={'tagName'} mb={'15px'} />
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
                        <Button variant='ghost' onClick={newTag}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddNewTag