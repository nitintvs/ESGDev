import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom'
import API from '../../../Services/API';
import $ from 'jquery'
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import LoaderSpinner from '../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const Form = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const editor = useRef(null);
    const [file, setFile] = useState(null);
    const {id} = useParams();    

    function bannerUpload(e) {
        setFile(e.target.files[0]);
    }

    const updatePillar = () =>{
        setIsLoading(true)
        const formData = new FormData()
        if(file != null){
            formData.append('banner', file)
        }
        formData.append('id', parseInt(props.moduleInfo && props.moduleInfo.id))
        formData.append('name', $("#title").val())
        formData.append('description', $("#description").val())
        API.put(`/pillar`, formData, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            props.getUpdate(response.data)
            const formData1 =  new FormData()
            formData1.append('id', id)
            formData1.append('name', $("#title").val())
            API.put(`/project-modules`, formData1, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(response=>{
                setIsLoading(false)
                window.location.reload()
            })
            
        })
    }


    return (
        <>
            {   
                isLoading ? <LoaderSpinner />: null
            }
            <Input id={'title'} placeholder='medium size' defaultValue={props.moduleInfo && props.moduleInfo.name} size='md' mb={'15px'} />
            <Input type="file" onChange={bannerUpload} mb={'15px'} padding={"4px"}/>
            <JoditEditor
                id={"description"}
                ref={editor}
                value={props.moduleInfo && props.moduleInfo.description}
                tabIndex={1} // tabIndex of textarea
                onChange={newContent => {}}
            />
            <Button mt={'15px'} onClick={updatePillar} mb={'10px'} className={"saveButton"}> Update Pillar </Button>
        </>
    )
}

export default Form