import React, {useEffect, useState} from 'react'
import API from '../../../../../Services/API'
import Styles from './deleteUser.module.css'
import { useToast } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'

const DeleteUser = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    
    const deleteUser = () => {
        setIsLoading(true)
        API.delete(`/user-group-relation`, {data: {"id": props.id}, headers: {
            'Authorization': 'Bearer ' + token
          }})
        .then((response) => {
            toast({
                title: 'Deleted user from group' ,
                description: "Deleted "+ props.personName +" from "+ props.groupName,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            API.get(`/user-group-relation`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
              })
            .then((response) => {
                props.getUpdatedList(response.data.results)
                setIsLoading(false)
            })
        }).catch(error => {
            
        });
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            <DeleteIcon className={Styles.deleteIcon} onClick={deleteUser} />
        </>
    )
}

export default DeleteUser