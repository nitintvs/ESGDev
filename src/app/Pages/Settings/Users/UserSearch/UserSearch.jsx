import React, { useState } from 'react'
import $ from 'jquery'
import Styles from './userSearch.module.css'
import { PhoneIcon, CheckIcon, Search2Icon, SmallCloseIcon } from '@chakra-ui/icons'
import { Stack, InputGroup, Input, InputLeftElement, InputRightElement } from '@chakra-ui/react'
const UserSearch = () => {
    const [inputValue, setInputValue] = useState('')
    const searchHandler = (event) =>{
        let searchbleValue = (event.target.value).toLowerCase()
        setInputValue(event.target.value)
        $("#userTable tbody tr").each(function(){
            $(this).addClass("d-none")
            let existingName = ($(this).find("td:first-child").attr('headers')).toLowerCase()
            let searchingName = existingName.includes(searchbleValue)
            if(searchingName){
                $(this).removeClass("d-none")
            }
        })
    }

    const closeInput = (event) =>{
        $("#searchField").val('')
        $("#userTable tbody tr").removeClass('d-none')
        setInputValue('')
    }

    return (
        <>
            <Stack spacing={4} float={'left'}>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                    >
                        <Search2Icon />
                    </InputLeftElement>
                    <Input id={'searchField'} placeholder='Search with User name' onChange={searchHandler} w={'320px'}/>
                    {
                        inputValue !== '' ? 
                        <InputRightElement id={'closeIcon'} onClick={closeInput} className={Styles.closeIcon}>
                            <SmallCloseIcon color='red.500' />
                        </InputRightElement> : null
                    }
                    
                </InputGroup>
                </Stack>
        </>
    )
}

export default UserSearch