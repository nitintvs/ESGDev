import React, { useEffect, useState } from 'react'
import Styles from './permissons.module.css'
import API from '../../../Services/API';
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

const PermissionPopup = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [addAnother, setAddAnother] = useState(false)
    const [permissionType, setPermissionType] = useState()
    const [groupList, setGroupList] = useState()
    const [groupUserList, setGroupUserList] = useState()
    const [editor, setEditor] = useState()
    const [contributor, setContributor] = useState()
    const [viewer, setViewer] = useState()

    useEffect(()=>{
        API.get(`/user-permissions?module_id=${props.pillarId}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response1 => {
            
        })
    },[])

    const saveAndAddNew = (event) =>{
        setAddAnother(event.target.checked)
    }
    const addPermission = () =>{
        const formData = new FormData()
        formData.append('module_id', parseInt(props.pillarId))
        formData.append('request_coming_from', "home")
    }

    const handleChange = (event, actionMeta)=>{
        
    }

    const options = groupList && groupList.map(item => (
        { id: item.id, value: item.name, label: item.name }
    ))

    return (
        <>
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

export default PermissionPopup