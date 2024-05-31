import React, { useEffect, useState } from 'react'
import API from '../../../../Services/API'
import { Heading, SimpleGrid, Box} from '@chakra-ui/react'
import AddNewTag from './AddNewTag/AddNewTag'
import List from './List/List'

const TagsList = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [tagList, setTagList] = useState()
    const [tagListCount, setTagListCount] = useState()
    const [message, setMessage] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState(false)
    

    useEffect(() => {
        API.get(`/tag-detail/`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setTagList(response.data.results)
            setTagListCount(response.data && response.data.results && response.data.results.length)
        })
    },[])

    const getUpdatedList = (updatedList) =>{
        setTagList(updatedList)
        setMessage(true)
    }

    const getUpdatedDelete = (updatedList) =>{
        setTagList(updatedList)
        setMessage(false)
        setDeleteMessage(true)
    }

    return (
        <>
            {
                message ? <Box className='successInfoNew'> Added new tag successfully </Box> : null
            }
            {
                deleteMessage ? <Box className='successInfoNew'> Deleted tag successfully </Box> : null
            }
            {
                props.count && props.count ? 
                    <SimpleGrid columns={[1, 2, 3, 5]} spacing='20px' mt={'10px'}>
                        {
                            props.editable ? <AddNewTag id={props.id} getUpdatedList={getUpdatedList} /> : null
                        }
                        {
                            tagList && tagList.map((list, index) => 
                                <List
                                    key={index}
                                    id={list.id}
                                    tagName={list.name}
                                    banner={list.banner}
                                    editable={props.editable}
                                    getUpdatedDelete={getUpdatedDelete}
                                />
                            )
                        }
                    </SimpleGrid>
                : ""
            }
        </>
    )
}

export default TagsList