import React, { useEffect, useState } from 'react'
import Styles from './permissons.module.css'
import API from '../../../Services/API'
import { useParams } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Select from 'react-select';
import { CloseIcon } from '@chakra-ui/icons'
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
import PermissionsForm from './PermissionsForm';



const Permissons = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const pillarId = window.localStorage.getItem("pillarId")
    const {id} = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [addAnother, setAddAnother] = useState(false)
    const [permissionType, setPermissionType] = useState()
    const [groupList, setGroupList] = useState()
    const [groupUserList, setGroupUserList] = useState()

    const [state, setState] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false,
    });

    const openSlidingPane = () => {
        setState({ isPaneOpen: true })
    }

    const getUpdate = (updateAction) =>{
        setState({ isPaneOpen: updateAction })
    }

    return (
        <>
            <li className="">
                <Button className={Styles.pButton} onClick={openSlidingPane} title='Permissions'> 
                    <i className="mdi mdi-lock-outline" onClick={() => setState({ isPaneOpen: true })}></i>
                </Button>
            </li>

            <SlidingPane
                className="some-custom-class"
                overlayClassName="some-custom-overlay-class"
                isOpen={state.isPaneOpen}
                title="Permissions"
                subtitle=""
                width="50%"
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setState({ isPaneOpen: false });
                }}
            >
                <Button onClick={() => setState({ isPaneOpen: false })} float={'right'}> <CloseIcon /> </Button>
                <PermissionsForm pillarId={props.pillarId} getUpdate={getUpdate} />
            </SlidingPane>
        </>
    )
}

export default Permissons