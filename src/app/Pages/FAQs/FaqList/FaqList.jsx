import React, { useEffect, useState } from 'react'
import Styles from './faqList.module.css'
import API from '../../../Services/API'
import { SimpleGrid, Box} from '@chakra-ui/react'
import ListItem from './ListItem/ListItem'
import NewFaq from './NewFaq/NewFaq'

const FaqList = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [faqList, setFaqList] = useState()
    const [faqListCount, setFaqListCount] = useState()
    const [message, setMessage] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState(false)
    
    
    useEffect(() => {
        API.get(`/faq-detail/`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setFaqList(response.data.results)
            setFaqListCount(response.data && response.data.results && response.data.results.length)
        })
    },[])

    const getUpdated = (updatedData) =>{
        setFaqList(updatedData)
        setFaqListCount(updatedData && updatedData.length)
        setMessage(true)
        const timer = setTimeout(() => {
            setMessage(false); 
        }, 10 * 1000);
        return () => clearTimeout(timer);
    }

    const getDeleteUpdated = (updatedData) =>{
        setFaqList(updatedData)
        setFaqListCount(updatedData && updatedData.length)
        setDeleteMessage(true)
        const timer = setTimeout(() => {
            setDeleteMessage(false); 
        }, 10 * 1000);
        return () => clearTimeout(timer);
    }



    return (
        <>
            { message ? <Box className='successInfoNew'> FAQ created successfully </Box> : null}
            { deleteMessage ? <Box className='successInfoNew'> FAQ deleted successfully </Box> : null}
            
            <SimpleGrid columns={[1, 2, 3, 5]} spacing='20px' mt={'10px'}>
                {props.editable ? <NewFaq faqInfo={props.faqInfo} getUpdated={getUpdated} /> : null}
                <>
                    {
                        faqList && faqList.map((faqItem, index) =>
                            <ListItem editable={props.editable} id={faqItem.id} faqName={faqItem.name} getUpdated={getDeleteUpdated} />
                        )
                    }
                </>
            </SimpleGrid>
        </>

        
    )
}

export default FaqList