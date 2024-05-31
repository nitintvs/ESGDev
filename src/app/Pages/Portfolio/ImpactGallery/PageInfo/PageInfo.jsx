import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom'
import $ from 'jquery'
import API from '../../../../Services/API';
import { Text, Heading, Stack, Image, Box, Input, Button, Spinner  } from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const PageInfo = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [info, setInfo] = useState()
    const [length, setLength] = useState()
    const [isLoading, setIsLoading]  = useState(false)
    const [file, setFile] = useState(null);
    const editor = useRef(null);
    const {id} = useParams();

    function bannerUpload(e) {
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        API.get(`/impact-gallery/`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setLength(response.data.results.length)
            if(response.data.results.length > 0){
                setInfo(response.data.results[0])
                props.mainHeading(response.data.results[0].prop_label)
            }
        })
    },[])

    const updatePageInfo = (event) =>{
        setIsLoading(true)

        const formData = new FormData()
        if(file != null){
            formData.append('banner', file)
        }
        formData.append('prop_label', $("#pagetitle").val())
        formData.append('description', $("#description").val())

        if(length > 0){
            formData.append('id', info && info.id)
            API.put(`/impact-gallery/`, formData, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                API.get(`/impact-gallery/`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then((response) => {
                    setLength(response.data.results.length)
                    setInfo(response.data.results[0])
                    props.mainHeading(response.data.results[0].prop_label)
                })
                const formData1 =  new FormData()
                formData1.append('id', id)
                formData1.append('name', $("#pagetitle").val())
                API.put(`/project-modules`, formData1, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then(response=>{
                    setIsLoading(false)
                    window.location.reload()
                })
            })
        }else{
            API.post(`/impact-gallery/`, formData, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                API.get(`/impact-gallery/`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then((response) => {
                    setLength(response.data.results.length)
                    setInfo(response.data.results[0])
                    props.mainHeading(response.data.results[0].prop_label)
                    setIsLoading(false)
                })
            })            
        }
    }

    return (
        <>
            { 
                isLoading ? <LoaderSpinner />: null
            }
            {
                props.editable ? 
                <Box>
                    <Stack spacing={3} mb={'30px'}>
                        <Input
                            id={"pagetitle"} 
                            placeholder='Please Enter Title' 
                            size='md' 
                            backgroundColor={"#ffffff"} 
                            defaultValue={info && info.prop_label}
                        />
                        <Input type="file" onChange={bannerUpload} padding={"4px"} />
                        <Image src={info && info.banner} />
                        <JoditEditor
                            id={"description"}
                            ref={editor}
                            value={info && info.description}
                            tabIndex={1} // tabIndex of textarea
                            onChange={newContent => {}}
                        />
                        <Button colorScheme='teal' variant='outline' w={100} onClick={updatePageInfo}>
                            Save
                        </Button>

                        
                    </Stack>                    
                </Box>
                : 
                <Box>
                    <Box mb={'15px'}>
                        {
                            info && info.banner !== null ? 
                            <Image 
                                src={info && info.banner}
                                width={'100%'}
                            /> : null
                        }                
                    </Box>
                    <Box>
                        {info && info.description != null  ? parse(info && info.description) : ''}
                    </Box>
                </Box>
            }
        </>
    )
}

export default PageInfo