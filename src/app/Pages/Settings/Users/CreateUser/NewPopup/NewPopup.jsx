import React from 'react'
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
    const { isOpen, onOpen, onClose } = useDisclosure()

    const newArticle = () => {
        const body = {
            "about_info": props.id,
            "prop_label": $("#prop_label").val(),
            "article_name": $("#article_name").val(),
            "description": $("#articleDescription").val()
        }
        API.post(`/about-article/`, body)
        .then((response) => {
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
                    <ModalHeader>Add new Fiscal Year</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input type='text' id={'prop_label'} mb={'15px'} />
                            <FormLabel>Article Name</FormLabel>
                            <Input type='text' id={'article_name'} mb={'15px'} />
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                id={"articleDescription"}
                                backgroundColor={"#ffffff"}
                                placeholder='Please Enter Description'
                                defaultValue={props.info && props.info.description}
                                size='sm'
                                height={'200px'}
                            />

                            <Stack spacing={5} direction='row' mt={'10px'}>
                                <Checkbox colorScheme='green'>
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
