import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import $ from 'jquery'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Styles from './viewFaq.module.css'
import API from '../../../../Services/API';
import BreadCrumbs from '../../../../Components/Widgets/BreadCrumbs/BreadCrumbs';
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import BreadCrumbsNav from '../../../../Components/Shared/Navbar/BreadCrumbsNav';
import { EditContext } from '../../../../Context/BreadcrumbsContext';

const ViewFaq = () => {
    const token = window.localStorage.getItem("accessToken")
    const navigate = useNavigate();
    const [isLoading, setIsLoading]  = useState(false)
    const [editable, setEditable] = useState();
    const [viewFaq, setViewFaq] = useState()
    const {id} = useParams();
    const editor = useRef(null);
    const [file, setFile] = useState(null);
    const {edit, setEdit } = useContext(EditContext);

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        setIsLoading(true)
        API.get(`/faq-detail/?id=${id}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setViewFaq(response.data.results[0])
            setIsLoading(false)
        })
    },[])

    const updateFaq = () =>{
        setIsLoading(true)
        const formData = new FormData()
        if(file != null){
            formData.append('banner', file)
        }
        formData.append('id', parseInt(id))
        formData.append('name', $("#prop_label").val())
        formData.append('description', $("#description").val())
        API.put(`/faq-detail/`, formData, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            API.get(`/faq-detail/?id=${id}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                setViewFaq(response.data.results[0])
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
            <BreadCrumbs geteditStatus={geteditStatus} title={viewFaq && viewFaq.name} />
            <Card>
                <CardBody>
                    <Box>
                        {
                            edit ? 
                            <>
                                <Input id={'prop_label'} placeholder='medium size' defaultValue={viewFaq && viewFaq.name} size='md' mb={'15px'} />
                                <Input type="file" onChange={bannerUpload} mb={'15px'} padding={"4px"} />
                                <Image
                                    src={viewFaq && viewFaq.banner}
                                    width={'100%'}
                                    alt={viewFaq && viewFaq.name}
                                    borderRadius='lg'
                                    mb={'15px'}
                                />
                                <JoditEditor
                                    id={"description"}
                                    ref={editor}
                                    value={viewFaq && viewFaq.description}
                                    tabIndex={1} // tabIndex of textarea
                                    onChange={newContent => {}}
                                />
                                <Button colorScheme='purple' mt={'15px'} onClick={updateFaq}> Update Faq </Button>
                            </> : 
                            <>
                                <Heading as='h2' size='lg' mb={'25px'}>
                                    {viewFaq && viewFaq.name}
                                </Heading>
                                <Image
                                    src={viewFaq && viewFaq.banner}
                                    width={'100%'}
                                    alt={viewFaq && viewFaq.name}
                                    borderRadius='lg'
                                />
                                <Text mt={'25px'}>
                                    {viewFaq && viewFaq.description != null  ? parse(viewFaq && viewFaq.description) : ''}
                                </Text>
                            </>
                        }
                    </Box>
                </CardBody>
            </Card>
        </>
    )
}

export default ViewFaq