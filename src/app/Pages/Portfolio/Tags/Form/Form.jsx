import React, { useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom'
import $ from 'jquery'
import Styles from './form.module.css'
import API from '../../../../Services/API';
import {Input, Stack, Button, Spinner, Image, } from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import LoaderSpinner from '../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const Form = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const [file, setFile] = useState(null);
    const editor = useRef(null);
    const {id} = useParams();

    function bannerUpload(e) {
        setFile(e.target.files[0]);
    }

    const updateAboutSIoInfo = (event) =>{
        setIsLoading(true)
        if(props.count && props.count > 0){
            const formData = new FormData()
            if(file != null){
                formData.append('banner', file)
            }
            formData.append('prop_label', $("#pagetitle").val())
            formData.append('description', $("#description").val())
            formData.append('id', props.pageInfo && props.pageInfo.id)
            API.put(`/tag-info/`, formData, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                API.get(`/tag-info/`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                })
                .then((response) => {
                    props.getUpdateStatus(response.data.results[0])
                    setIsLoading(false)
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
            const formData = new FormData()
            if(file != null){
                formData.append('banner', file)
            }
            formData.append('prop_label', $("#pagetitle").val())
            formData.append('description', $("#description").val())
            API.post(`/tag-info/`, formData, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                API.get(`/tag-info/`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                })
                .then((response) => {
                    props.getUpdateStatus(response.data.results[0])
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

            <Stack spacing={3} mb={'30px'}>
                <Input
                    id={"pagetitle"} 
                    placeholder='Please Enter Title' 
                    size='md' 
                    backgroundColor={"#ffffff"} 
                    defaultValue={props.pageInfo && props.pageInfo.prop_label}
                />
                <Input type="file" onChange={bannerUpload} padding={"4px"}   />
                <Image src={props.pageInfo && props.pageInfo.banner} />
                <JoditEditor
                    id={"description"}
                    ref={editor}
                    value={props.pageInfo && props.pageInfo.description}
                    tabIndex={1} // tabIndex of textarea
                    onChange={newContent => {}}
                />
                <Button colorScheme='teal' variant='outline' w={100} onClick={updateAboutSIoInfo}>
                    Save
                </Button>
            </Stack>
        </>
    )
}

export default Form
