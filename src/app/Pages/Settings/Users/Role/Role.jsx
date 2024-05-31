import {React, useEffect, useState} from 'react'
import $ from 'jquery'
import Styles from './role.module.css'
import API from '../../../../Services/API'
import { Td, Select, Stack, useToast} from '@chakra-ui/react'

const Role = (props) => {
    const toast = useToast()
    const token = window.localStorage.getItem("accessToken")
    const changeRole = (event) => {
        const body = {
            "user_id": event.target.id,
            "role": event.target.value
        }
        API.post(`/change-role`, body, {headers: {'Authorization': 'Bearer ' + token}})
        .then((response) => {
            toast({
                title: 'Changed Role',
                description: "Changed Role to "+ event.target.value +".",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        })
    }
    return (
        <>
            <Td pb={'0px'} pt={'0px'} width={'320px'}>
                <Stack spacing={3}>
                    <Select variant='filled' id={props.id} name={props.assignedRole} onChange={changeRole}>
                        <option value={props.assignedRole} selected={true}>{props.assignedRole}</option>
                        {
                            props.role && props.role.map((item, index) => 
                                props.assignedRole !== item.name ? 
                                <option value={item.name}> {item.name} </option> : null
                            )
                        }
                    </Select>
                </Stack>
            </Td>
        </>
    )
}

export default Role