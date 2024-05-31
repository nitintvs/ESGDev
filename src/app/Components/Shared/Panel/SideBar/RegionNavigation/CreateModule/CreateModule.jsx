import React, { useState } from 'react'
import Styles from './createModule.module.css'
import $ from 'jquery'
import API from '../../../../../../Services/API'
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
} from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'
import LoaderSpinner from '../../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'


const CreateModule = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)
    const [isGlobalView, setIsGlobalView ] = useState(false)
    const [moduleName, setModuleName] = useState(null)


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
            "category": 'region',
            "parent_id": subCategory,
            "unique_name": (($("#moduleName").val()).match(/\b(\w)/g)).join(''),
        }

        API.post(`/project-modules`, body, {headers: {'Authorization': 'Bearer ' + token}})
        .then((response) => {
            onClose()
            API.get(`/project-modules`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then(response=>{
                props.updateMenu(response.data)
            })
            setIsLoading(false)
        })
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            <li className="nav-item nav-profile">
                <ButtonGroup size='sm' isAttached variant='outline'  onClick={onOpen}>
                    <Button onClick={onOpen} className={Styles.createButton}>Add new region</Button>
                    <IconButton aria-label='Add to friends' icon={<AddIcon />} onClick={onOpen} />
                </ButtonGroup>
                <Modal isOpen={isOpen} onClose={onClose}  closeOnOverlayClick={false}>
                    <ModalOverlay className={Styles.overLay} />
                    <ModalContent className={Styles.contentZindex}>
                        <ModalHeader>Add new region</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl mb={'10px'}>
                                <FormLabel>Region Name</FormLabel>
                                <Input type='text' id={'moduleName'} />
                            </FormControl>
                            <FormControl mb={'10px'}>
                                <FormLabel>Select Sub Category (Optional)</FormLabel>
                                <Select size='md' placeholder='please select sub category from list' onChange={getSubCategory}>
                                    {
                                        props.menuList && props.menuList.map((item, index) =>
                                            ((item.category === 'region') && (item.parent_id === null)) ?
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