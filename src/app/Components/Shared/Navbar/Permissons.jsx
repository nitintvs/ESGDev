import React, { useEffect, useState } from 'react'
import Styles from './permissons.module.css'
import API from '../../../Services/API'
import { Dropdown } from 'react-bootstrap';
import Select from 'react-select';
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

const Permissons = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [addAnother, setAddAnother] = useState(false)
    const [permissionType, setPermissionType] = useState()

    const token = window.localStorage.getItem("accessToken")
    const [groupList, setGroupList] = useState()
    const [groupUserList, setGroupUserList] = useState()

    const [editor, setEditor] = useState()
    const [contributor, setContributor] = useState()
    const [viewer, setViewer] = useState()

    
    useEffect(() => {
        API.get(`/user-permissions`)
        .then(response => {
            setPermissionType(Object.keys(response.data))
        })

        API.get(`/user-group`, {
            headers: {
            'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setGroupList(response.data)
        }).catch(error => {
            if(error.response.data.code === 'token_not_valid'){
                window.localStorage.removeItem('accessToken')
                window.localStorage.removeItem('refreshToken')
                window.localStorage.removeItem('user')
                window.location.href = '/login'
            }
        });

    },[])
    const saveAndAddNew = (event) =>{
        setAddAnother(event.target.checked)
    }
    const addPermission = () =>{
    }

    const handleChange = (event, actionMeta)=>{

    }

    const options = groupList && groupList.map(item => (
        { id: item.id, value: item.name, label: item.name }
    ))

    return (
        <>
            <li className="nav-item">
                <Dropdown align={'right'}>
                    <Dropdown.Toggle className="nav-link count-indicator">
                        <i className="mdi mdi-lock-outline" onClick={onOpen}></i>
                    </Dropdown.Toggle>
                </Dropdown>
            </li>
            <Modal isOpen={isOpen} onClose={onClose}  closeOnOverlayClick={false}>
                <ModalOverlay className={Styles.overLay} />
                <ModalContent className={Styles.contentZindex}>
                    <ModalHeader>Permissions</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            {
                                permissionType && permissionType.map(item => 
                                    item !== 'is_global_view' ?
                                        <>
                                            <FormLabel className={Styles.selectFormLabel}>{item}</FormLabel>
                                            <Select 
                                                options={options} 
                                                isMulti isSearchable={true} 
                                                className={Styles.mbSelect}
                                                name={item}
                                                onChange={handleChange}
                                             />
                                        </>
                                    :null
                                )
                            }
                            <Stack spacing={5} direction='row' mt={'10px'}>
                                <Checkbox colorScheme='green' defaultChecked={addAnother} onChange={saveAndAddNew}>
                                    Disable edit propagation
                                </Checkbox>
                            </Stack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter className={Styles.modelFooter}>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' onClick={addPermission}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            
        </>
    )
}

export default Permissons