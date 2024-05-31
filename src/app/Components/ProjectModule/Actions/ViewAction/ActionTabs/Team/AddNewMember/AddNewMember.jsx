import React, { useState, useEffect, useRef, useMemo } from 'react';
import $ from 'jquery'
import Styles from './addnewmember.module.css'
import Select from 'react-select';
import { Link, useParams } from 'react-router-dom'
import { Box, Button,} from '@chakra-ui/react'
import API from '../../../../../../../Services/API';
import { PhoneIcon, AddIcon, WarningIcon, } from '@chakra-ui/icons'
import LoaderSpinner from '../../../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const AddNewMember = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(true);
    const [users, setUsers] = useState()
    const [showSubmit, setShowSubmit] = useState()
    const [selectedUser, setSelectedUser] = useState()

    useEffect(() => {
        API.get(`/list-user`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            setUsers(response.data)
            setIsLoading(false)
        }).catch(error => {
            
        });
    },[])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setButtonVisible(false);
    };

    const options = users && users.map(user => ({
        value: user.id,
        label: user.first_name || user.last_name ? `${user.first_name} ${user.last_name}` : user.email
    }));

    const handleSelect = (selectedOption) => {
        setShowSubmit(true)
        setSelectedUser(selectedOption.value)
    };

    const addTeamLead = () =>{
        setIsLoading(true)
        let pillarId = props.pillarId
        const formData = new FormData()
        formData.append('user', selectedUser)
        formData.append('action', pillarId)
        if(props.teamType === 'lead'){
            formData.append('role', 'lead')
        }else if(props.teamType === 'member'){
            formData.append('role', 'member')
        }else if(props.teamType === 'eltsponsor'){
            formData.append('position', 'elt_sponsor')
            formData.append('role', 'member')
        }

        API.post(`/pillar-team`, formData,  {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            console.log("team", response)
            API.get(`/pillar-team?action_id=${props.pillarId}`,
            {
                headers: {
                'Authorization': 'Bearer ' + token
                }
            }).then((response2) => {
                props.getUpdatedTeam(response2.data)
                setSelectedUser()
                setIsLoading(false)
            })
        })
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            <Box>
                {buttonVisible && <Button className='buttonSecondary' onClick={toggleDropdown}> <AddIcon mr={'10px'} /> Add </Button>}
                {isOpen && (
                    <>
                        <Select
                            defaultValue={selectedUser}
                            options={options}
                            onChange={handleSelect}
                        />
                        
                    </>
                )}
            </Box>
            {
                showSubmit ? <Box>
                    <Button className='buttonPrimary' onClick={addTeamLead}> Add Selected User </Button>
                </Box> : null
            }
        </>
    )
}

export default AddNewMember