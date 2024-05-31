import React, { useState, useRef, } from 'react';
import $ from 'jquery'
import API from '../../../../../Services/API'
import Styles from './qtrinfo.module.css'
import {Text, Heading, Input, Stack, Button, Spinner, Image, Code, } from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const SelectedYearInfo = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const [file, setFile] = useState(null);
    const editor = useRef(null);

    function bannerUpload(e) {
        setFile(e.target.files[0]);
    }

    const updateFiscalYearInfo = (event) =>{
        setIsLoading(true)
        const formData = new FormData()
        formData.append('id', props.selectedYearInfo && props.selectedYearInfo.id)
        if(file != null){
            formData.append('banner', file)
        }
        formData.append('name', $("#name").val())
        formData.append('description', $("#description").val())
        formData.append('note', $("#note").val())
        API.put(`/fiscal-year/`, formData,{
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            API.get(`/fiscal-year/?id=${props.selectedYearInfo && props.selectedYearInfo.id}`,{
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                props.getUpdated(response.data.results?.[0])
            })
            
            
            //
            setIsLoading(false)
        })
        
    }

    return (
        <>
            { isLoading ? <LoaderSpinner />: null}
            {
                props.editable ? <Stack spacing={3} mb={'30px'}>
                    <Input
                        id={"name"} 
                        placeholder='Please add fiscal year info here ...' 
                        size='md' 
                        backgroundColor={"#ffffff"} 
                        defaultValue={props.selectedYearInfo && props.selectedYearInfo.name}
                    />
                    <Input type="file" onChange={bannerUpload} padding={"4px"}/>
                    <Image src={props.selectedYearInfo && props.selectedYearInfo.banner} />
                    <JoditEditor
                        id={"description"}
                        ref={editor}
                        value={props.selectedYearInfo && props.selectedYearInfo.description}
                        tabIndex={1} // tabIndex of textarea
                        onChange={newContent => {}}
                    />
                    <Input
                        id={"note"} 
                        placeholder='Add additional note or information about the fiscal year' 
                        size='md' 
                        backgroundColor={"#ffffff"} 
                        defaultValue={props.selectedYearInfo && props.selectedYearInfo.note}
                    />

                    <Button colorScheme='teal' variant='outline' w={100} onClick={updateFiscalYearInfo}>
                        Save
                    </Button>
                </Stack> : 
                <Stack spacing={6} mb={'30px'}>
                    <Heading as='h2' size='lg'>
                        {props.selectedYearInfo && props.selectedYearInfo.name}
                    </Heading>
                    <Image src={props.selectedYearInfo && props.selectedYearInfo.banner} />
                    {props.selectedYearInfo && props.selectedYearInfo.description != null  ? parse(props.selectedYearInfo && props.selectedYearInfo.description) : ''}
                    <Code> {props.selectedYearInfo && props.selectedYearInfo.note} </Code>
                </Stack>
            }
        </>
    )
}

export default SelectedYearInfo