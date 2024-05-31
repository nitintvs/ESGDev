import React,{useState} from 'react'
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
import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'


const NewPopup = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [addAnother, setAddAnother] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const saveAndAddNew = (event) =>{
        setAddAnother(event.target.checked)
    }

    const addNewYear = () => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('fiscal_year_info', props.fieldId)
        formData.append('name', $('#yearTitle').val())

        API.post(`/fiscal-year/`, formData, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            API.get(`/fiscal-year/`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                props.getUpdatedList(response.data.results)
            })
            if(addAnother){
                onOpen()
                $('#yearTitle').val('')
                setIsLoading(false)
            }else{
                onClose()
                //alert("Please refresh the page to see changes")
                props.getAddedMessage(true)
                setIsLoading(false)
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
                    <ModalHeader>Add new Fiscal Year</ModalHeader>
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
                        <Button className={Styles.cancel} mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className={Styles.deleteConfirm} onClick={addNewYear}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default NewPopup
