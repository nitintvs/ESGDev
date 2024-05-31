import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import $ from 'jquery'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import API from '../../../../../Services/API'
import BreadCrumbs from '../../../../../Components/Widgets/BreadCrumbs/BreadCrumbs'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import BreadCrumbsNav from '../../../../../Components/Shared/Navbar/BreadCrumbsNav';
import { EditContext } from '../../../../../Context/BreadcrumbsContext';

const ViewArticle = () => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const [editable, setEditable] = useState();
    const [viewArticle, setViewArticle] = useState()
    const {id} = useParams();
    const editor = useRef(null);
    const [file, setFile] = useState(null);
    const {edit, setEdit } = useContext(EditContext);
    
    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        setIsLoading(true)
        API.get(`/about-article/?id=${id}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setViewArticle(response.data.results[0])
            setIsLoading(false)
        })
    },[id])

    const updateArticle = () =>{
        setIsLoading(true)
        const formData = new FormData()
        if(file != null){
            formData.append('banner', file)
        }
        
        formData.append('id', parseInt(id))
        formData.append('article_name', $("#prop_label").val())
        formData.append('description', $("#description").val())
        API.put(`/about-article/`, formData, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setViewArticle(response.data.results)
            API.get(`/about-article/?id=${id}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                setViewArticle(response.data.results[0])
            })
            setIsLoading(false)
        })
    }

    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }

    function bannerUpload(e) {
        setFile(e.target.files[0]);
    }

    return (
        <>
            { 
                isLoading ? <LoaderSpinner />: null
            }
            <BreadCrumbs geteditStatus={geteditStatus} title={viewArticle && viewArticle.article_name}/>
            <Card>
                <CardBody>
                    <Box>
                        {
                            edit ? 
                            <>
                                <Input id={'prop_label'} placeholder='medium size' defaultValue={viewArticle && viewArticle.article_name} size='md' mb={'15px'} />
                                <Input type="file" onChange={bannerUpload} mb={'15px'} padding={"4px"} />
                                <JoditEditor
                                    id={"description"}
                                    ref={editor}
                                    value={viewArticle && viewArticle.description}
                                    tabIndex={1} // tabIndex of textarea
                                    onChange={newContent => {}}
                                />
                                <Button className='buttonPrimary' mt={'15px'} onClick={updateArticle}> Update Article </Button>
                            </> : 
                            <>
                                <Heading as='h2' size='lg' mb={'25px'}>
                                    {viewArticle && viewArticle.article_name}
                                </Heading>
                                <Image
                                    src={viewArticle && viewArticle.banner}
                                    width={'100%'}
                                    alt={viewArticle && viewArticle.article_name}
                                    borderRadius='lg'
                                />
                                <Text mt={'25px'}>
                                    {viewArticle && viewArticle.description != null  ? parse(viewArticle && viewArticle.description) : ''}
                                </Text>
                            </>
                        }
                    </Box>
                </CardBody>
            </Card>
        </>
    )
}

export default ViewArticle