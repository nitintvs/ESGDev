import React, {useState, useRef, useEffect } from 'react'
import $ from 'jquery'
import Styles from './form.module.css'
import API from '../../../Services/API'
import { Text, Heading, Input, Stack, Textarea, Button, Spinner, Image, } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react';

const Form = (props) => {
    const editorRef = useRef(null);
    const [isLoading, setIsLoading]  = useState(false)
    const [file, setFile] = useState();

    useEffect(() => {
        setFile(props.info && props.info.banner)
    },[])

    const log = () => {
        if (editorRef.current) {
        }
    };


    function bannerUpload(e) {
        setFile(e.target.files[0]);
    }

    const updateAboutSIoInfo = (event) =>{
        setIsLoading(true)
        if(props.fiscalYearInfo && props.fiscalYearInfo.length < 1){
            const body = {
                "prop_label": $("#pagetitle").val(),
                "description": editorRef.current.getContent(),
                "banner":file
            }
            API.post(`/about-info/`, body)
            .then((response) => {
                setIsLoading(false)
            })
        }else{
            const formData = new FormData()
            formData.append('banner', file)
            formData.append('prop_label', $("#pagetitle").val())
            formData.append('description', editorRef.current.getContent())
            formData.append('id', props.info && props.info.id)
            
            API.put(`/about-info/`, formData)
            .then((response) => {
                setIsLoading(false)
            })
        }
    }
    
    return (
        <>
            { 
                isLoading ? <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                    className={Styles.spinner}
                />: null
            }

            <Stack spacing={3} mb={'30px'}>
                <Input
                    id={"pagetitle"} 
                    placeholder='Please Enter Title' 
                    size='md' 
                    backgroundColor={"#ffffff"} 
                    defaultValue={props.info && props.info.prop_label}
                />
                <Textarea
                    id={"description"}
                    backgroundColor={"#ffffff"}
                    placeholder='Please Enter Description'
                    defaultValue={props.info && props.info.description}
                    size='sm'
                    height={'200px'}
                />
                
                <Input type="file" onChange={bannerUpload} padding={"4px"} />
                <Image src={file} />


                <Button colorScheme='teal' variant='outline' w={100} onClick={updateAboutSIoInfo}>
                    Save
                </Button>

                <Editor
                    apiKey='d1z0cvds32uq4agt8iiu3ecifqbwnncsusw6n8wni5by9vra'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={props.info && props.info.description}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />

                <button onClick={log}>Log editor content</button>
            </Stack>
        </>
    )
}

export default Form

