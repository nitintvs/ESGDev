import React, {useState} from 'react'
import $ from 'jquery'
import API from '../../../../Services/API'
import Styles from './userGroup.module.css'
import { Wrap, WrapItem, Input, Stack, Button, Switch, FormControl, FormLabel  } from '@chakra-ui/react'
import LoaderSpinner from '../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'

const UserGroup = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading] = useState(false)
    const [userGroup, setUserGroup] = useState()
    const [isSuperGroup, setIsSuperGroup] = useState(false)


    const createGroup = () => {
        setIsLoading(true)
        const body = {
            "name": $("#groupName").val(),
            "is_supergroup": isSuperGroup
        }
        API.post(`/user-group`, body, {headers: {'Authorization': 'Bearer ' + token}})
        .then((response) => {
            API.get(`/user-group`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response1) => {
                //setGroupList(response.data)
                props.getUpdatedGroup(response1.data)
                $("#groupName").val('')
                setIsLoading(false)
            })


            // if((response.data && response.data.Success.length < 1) &&  (response.data && response.data.Failure.length < 1)){
            //     alert("please enter email address in valid format and hit enter")
            // }else if((response.data && response.data.Success.length > 0) &&  (response.data && response.data.Failure.length < 1)){
            //     alert("Sent invitaion mail to given emails")
            // }else if((response.data && response.data.Success.length < 1) &&  (response.data && response.data.Failure.length > 0)){
            //     alert("User already registered or there is some issue, Please try again later.")
            // }
        })
    }

    const handleChange = (event) => {
        setIsSuperGroup(event.target.checked)
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null }
            <Wrap float={'right'}>
                <WrapItem>
                    <Input id={'groupName'} placeholder='Enter new group name' size='md' w={'320px'} />
                </WrapItem>
                <WrapItem>
                    <FormControl display='flex' alignItems='center'>
                        <FormLabel htmlFor='email-alerts' mb='0'>
                            Is Supergroup ?
                        </FormLabel>
                        <Switch id='email-alerts' mt={'10px'} onChange={handleChange} />
                    </FormControl>
                </WrapItem>
                <WrapItem>
                    <Button colorScheme='blue' onClick={createGroup}>Add Group</Button>
                </WrapItem>
            </Wrap>
        </>
    )
}

export default UserGroup