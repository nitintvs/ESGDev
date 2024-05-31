import React, { useState, useRef, } from 'react';
import { useParams } from 'react-router-dom'
import $ from 'jquery'
import API from '../../../../Services/API'
import Styles from './topsection.module.css'
import {Text, Heading, Input, Stack, Button, Spinner, Image, } from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const TopSection = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const [file, setFile] = useState(null);
    const editor = useRef(null);
    const {id} = useParams();

    function bannerUpload(e) {
        setFile(e.target.files[0]);
    }

    const updateFiscalYearInfo = (event) =>{
        setIsLoading(true)
        const formData = new FormData()
        if(file != null){
            formData.append('banner', file)
        }
        formData.append('prop_label', $("#pagetitle").val())
        formData.append('description', $("#description").val())

        if(props.fiscalYearInfo && props.fiscalYearInfo.length < 1){
            API.post(`/fiscal-year-info/`, formData, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                setIsLoading(false)
            })
        }else{
            formData.append('id', props.fieldId)
            API.put(`/fiscal-year-info/`, formData ,{
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
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
                setIsLoading(false)
            })
        }
    }

    return (
        <>
            { isLoading ? <LoaderSpinner />: null}
            {
                props.editable ? <Stack spacing={3} mb={'30px'}>
                    <Input
                        id={"pagetitle"} 
                        placeholder='Please add fiscal year info here ...' 
                        size='md' 
                        backgroundColor={"#ffffff"} 
                        defaultValue={props.fiscalYearInfo && props.fiscalYearInfo[0]?.prop_label}
                    />
                    <Input type="file" onChange={bannerUpload} padding={"4px"} />
                    <Image src={props.fiscalYearInfo && props.fiscalYearInfo[0]?.banner} />
                    <JoditEditor
                        id={"description"}
                        ref={editor}
                        value={props.fiscalYearInfo[0]?.description}
                        tabIndex={1} // tabIndex of textarea
                        onChange={newContent => {}}
                    />

                    <Button colorScheme='teal' variant='outline' w={100} onClick={updateFiscalYearInfo}>
                        Save
                    </Button>
                </Stack> : 
                <Stack spacing={6} mb={'30px'}>
                    <Heading as='h2' size='lg'>
                        {props.fiscalYearInfo && props.fiscalYearInfo[0]?.prop_label}
                    </Heading>
                    <Image src={props.fiscalYearInfo && props.fiscalYearInfo[0]?.banner} />
                    <Text as='p' className={Styles.desc}>
                        {props.fiscalYearInfo && props.fiscalYearInfo[0]?.description != null  ? parse(props.fiscalYearInfo[0]?.description) : ''}
                    </Text>
                </Stack>
            }
        </>
    )
}

export default TopSection
