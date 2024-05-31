import React, { useState } from 'react'
import Styles from './createModule.module.css'
import $ from 'jquery'
import API from '../../../../../Services/API'
import { Button, ButtonGroup, Select, IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Text
} from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'
import LoaderSpinner from '../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'


const CreateModule = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)
    const [isGlobalView, setIsGlobalView ] = useState(false)
    const [moduleName, setModuleName] = useState(null)
    const [message, setMessage] = useState()
    


    const getCategory = (event) =>{
        setCategory(event.target.value)
    }

    const getSubCategory = (event) => {
        setSubCategory(event.target.value)
    }

    const newModule = () => {
        setIsLoading(true)
        const body = {
            "name": $("#moduleName").val(),
            "category": 'pillar',
            "parent_id": subCategory,
            "unique_name": (($("#moduleName").val()).match(/\b(\w)/g)).join(''),
        }

        API.post(`/project-modules`, body, {headers: {'Authorization': 'Bearer ' + token}})
        .then((response) => {
            API.get(`/project-modules`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then(response=>{
                props.updateMenu(response.data)
                setIsLoading(false)
                setMessage(true)
                const timeoutId = setTimeout(() => {
                    setMessage(false)
                }, 5000);
                $('#moduleName').val('')
                $('#rootMenu').val('')
                
                // Clean up the timeout to avoid memory leaks
                return () => clearTimeout(timeoutId);
            })
            
            
        })
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            <li className="nav-item nav-profile">
                <ButtonGroup size='sm' isAttached variant='outline'  onClick={onOpen}>
                    <Button onClick={onOpen} className={Styles.createButton}>Add new</Button>
                    <IconButton aria-label='Add to friends' icon={<AddIcon />} onClick={onOpen} />
                </ButtonGroup>
                <Modal isOpen={isOpen} onClose={onClose}  closeOnOverlayClick={false}>
                    <ModalOverlay className={Styles.overLay} />
                    <ModalContent className={Styles.contentZindex}>
                        <ModalHeader>Add new pillar / action</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {
                                message ? 
                                    <Text className={Styles.successmessage}>
                                        The new action/pillar has been added now.
                                    </Text>
                                : null
                            }
                            <FormControl mb={'10px'}>
                                <FormLabel>Pillar / Action Name</FormLabel>
                                <Text fontSize='xs'>Select the pillar if you have added a new action</Text>
                                <Input type='text' id={'moduleName'} />
                            </FormControl>
                            <FormControl mb={'10px'}>
                                <FormLabel>Select pillar (Optional)</FormLabel>
                                <Select id={'rootMenu'} size='md' placeholder='please select sub category from list' onChange={getSubCategory}>
                                    {
                                        props.menuList && props.menuList.map((item, index) =>
                                            ((item.category === 'pillar') && (item.parent_id === null)) ?
                                                <option value={item.id}> {item.name} </option> 
                                            : null
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter className={Styles.modelFooter}>
                            <Button mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button className={Styles.confirmButton} onClick={newModule}>Confirm</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </li>
        </>
    )
}

export default CreateModule