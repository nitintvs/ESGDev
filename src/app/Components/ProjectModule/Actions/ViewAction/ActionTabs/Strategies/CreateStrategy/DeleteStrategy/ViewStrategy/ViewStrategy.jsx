import React, { useState, useEffect, useRef, useMemo } from 'react';
import $ from 'jquery'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import API from '../../../../../../../../../Services/API';
import BreadCrumbs from '../../../../../../../../Widgets/BreadCrumbs/BreadCrumbs';
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const ViewStrategy = () => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const [editable, setEditable] = useState();
    const [viewStrategy, setViewStrategy] = useState()
    const {strategyid} = useParams();
    const editor = useRef(null);
    const [file, setFile] = useState(null);
    
    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        setIsLoading(true)
        API.get(`/strategy?id=${strategyid}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            console.log(response.data?.[0])
            setViewStrategy(response.data?.[0])
            setIsLoading(false)
        })
    },[strategyid])
    
    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }

    const updateStrategy = () =>{
        setIsLoading(true)
        // const formData = new FormData()
        // formData.append('id', parseInt(strategyid))
        // formData.append('name', $("#prop_label").val())
        // formData.append('description', $("#description").val())

        const body = {
            'id': parseInt(strategyid),
            "name": $("#prop_label").val(),
            "description": $("#description").val()
        }

        API.put(`/strategy`, body, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            API.get(`/strategy?id=${strategyid}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                setViewStrategy(response.data)
            })
            setIsLoading(false)
        })
    }



    return (
        <>
            {
                isLoading ? <LoaderSpinner /> : null
            }
            <BreadCrumbs geteditStatus={geteditStatus} title={viewStrategy && viewStrategy.name}/>
            <Card>
                <CardBody>
                    <Box>
                        {
                            editable ? 
                            <>
                                <Input id={'prop_label'} placeholder='medium size' defaultValue={viewStrategy && viewStrategy.name} size='md' mb={'15px'} />
                                <JoditEditor
                                    id={"description"}
                                    ref={editor}
                                    value={viewStrategy && viewStrategy.description}
                                    tabIndex={1} // tabIndex of textarea
                                    onChange={newContent => {}}
                                />
                                <Button className='buttonPrimary' float={'right'} mt={'15px'} onClick={updateStrategy}> Update Strategy </Button>
                            </> 
                            : 
                            <>
                                <Heading as='h2' size='lg' mb={'25px'}>
                                    {viewStrategy && viewStrategy.name}
                                </Heading>
                                <Text mt={'25px'}>
                                    {viewStrategy && viewStrategy.description != null  ? parse(viewStrategy && viewStrategy.description) : ''}
                                </Text>
                            </>
                        }
                    </Box>
                </CardBody>
            </Card>
        </>
    )
}

export default ViewStrategy