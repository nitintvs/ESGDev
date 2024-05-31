import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import $ from 'jquery'
import { Link, useParams, useNavigate } from 'react-router-dom';
import API from '../../../../../Services/API'
import BreadCrumbs from '../../../../../Components/Widgets/BreadCrumbs/BreadCrumbs';
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button, Code} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import BreadCrumbsNav from '../../../../../Components/Shared/Navbar/BreadCrumbsNav';
import { EditContext } from '../../../../../Context/BreadcrumbsContext';

const YearQTR = () => {
    const token = window.localStorage.getItem("accessToken")
    const navigate = useNavigate();
    const [isLoading, setIsloading] = useState(true)
    const [editable, setEditable] = useState();
    const [pageInfo, setPageInfo] = useState()
    const {yearid} = useParams();
    const {id} = useParams();
    const {qtrid} = useParams();
    const {name} = useParams();
    const editor = useRef(null);
    const [file, setFile] = useState(null);
    const {edit, setEdit } = useContext(EditContext);
    
    
    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        API.get(`/fiscal-year-quarter/?id=${qtrid}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setPageInfo(response.data.results[0])
            setIsloading(false)
        })
    },[])

    const updateQtr = () =>{
        setIsloading(true)
        const formData = new FormData()
        formData.append('id', parseInt(qtrid))
        if(file != null){
            formData.append('banner', file)
        }
        formData.append('name', $("#name").val())
        formData.append('description', $("#description").val())
        formData.append('note', $("#note").val())
        API.put(`/fiscal-year-quarter/`, formData, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            API.get(`/fiscal-year-quarter/?id=${qtrid}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response1) => {
                setPageInfo(response1.data.results[0])
                setIsloading(false)
            })
        })
    }
    
    function bannerUpload(e) {
        setFile(e.target.files[0]);
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            <BreadCrumbs geteditStatus={geteditStatus} title={pageInfo && pageInfo.name} />
            <Card>
                <CardBody>
                    <Box>
                        {
                            edit ? 
                            <>
                                <Input id={'name'} placeholder='medium size' defaultValue={pageInfo && pageInfo.name} size='md' mb={'15px'} />
                                <Input type="file" onChange={bannerUpload} mb={'15px'} padding={"4px"} />
                                <JoditEditor
                                    id={"description"}
                                    ref={editor}
                                    value={pageInfo && pageInfo.description}
                                    tabIndex={1} // tabIndex of textarea
                                    onChange={newContent => {}}
                                />
                                <Input 
                                    id={'note'} 
                                    placeholder='Add additional note or information about the fiscal year' 
                                    defaultValue={pageInfo && pageInfo.note} 
                                    size='md' 
                                    mb={'15px'} 
                                    mt={'15px'} 
                                />
                                <Button className='primary' mt={'15px'} onClick={updateQtr}> Update </Button>
                            </>
                            : 
                            <>
                                <Heading as='h2' size='lg' mb={'25px'}>
                                    {pageInfo && pageInfo.name}
                                </Heading>
                                <Image
                                    src={pageInfo && pageInfo.banner}
                                    width={'100%'}
                                    alt={pageInfo && pageInfo.name}
                                    borderRadius='lg'
                                />
                                {pageInfo && pageInfo.description != null  ? parse(pageInfo && pageInfo.description) : ''}
                                <Code> {pageInfo && pageInfo.note} </Code>
                            </>
                        }
                    </Box>
                </CardBody>
            </Card>
        </>
    )
}

export default YearQTR