import React, { useEffect, useState } from 'react'
import API from '../../../Services/API'
import { Heading, SimpleGrid, Box} from '@chakra-ui/react'
import List from './List/List'
import NewPopup from './List/NewPopup/NewPopup'
import InfoComponent from '../../../Components/Widgets/CommonWidgets/Info/InfoComponent'

const Article = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [articleList, setArticleList] = useState()
    const [articleCount, setArticleCount] = useState()
    const [message, setMessage] = useState()
    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        API.get(`/about-article/`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setArticleList(response.data.results)
            setArticleCount(response.data && response.data.results && response.data.results.length)
        })
    },[])

    const getUpdated = (updatedData) =>{
        setArticleList(updatedData)
    }
    const getUpdatedMessage = (messageInfo) =>{
        setMessage(messageInfo)
    }

    return (
        <>
            {
                props.count && props.count ? 
                    <>
                        <Heading as='h2' size='lg'>
                            Articles
                        </Heading>
                        {
                            message && message ? 
                                <Box className={'successInfoNew'}>
                                    Article deleted successfully
                                </Box>  
                            : null
                        }

                        <SimpleGrid columns={[1, 2, 3, 5]} spacing='20px' mt={'10px'}>
                            {
                                props.editable ? <NewPopup id={props.id} getUpdated={getUpdated} /> : null
                            }
                            {
                                articleList && articleList.map((list, index) => 
                                    <List
                                        key={index}
                                        id={list.id}
                                        article_name={list.article_name}
                                        banner={list.banner}
                                        editable={props.editable}
                                        getUpdated={getUpdated}
                                        getUpdatedMessage={getUpdatedMessage}
                                    />
                                )
                            }
                        </SimpleGrid>
                        {
                            props.editable || articleCount > 0 ? null : <InfoComponent />
                        }
                    </>
                : null
            }
        </>
    )
}

export default Article