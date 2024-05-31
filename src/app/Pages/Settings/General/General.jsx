import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import {SketchPicker} from "react-color";
import Styles from './General.module.css'
import API from '../../../Services/API';
import {
    Box, 
    Text, 
    Heading, 
    Image, 
    Input, 
    FormControl, 
    FormLabel,
    Stack, Button
} from '@chakra-ui/react'
import LogoMini from '../../../../assets/images/logo-mini.svg'
import LoaderSpinner from '../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const General = (props) => {
    document.documentElement.scrollTo(0, 0);
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const [file, setFile] = useState();
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
    const [logo, setLogo] = useState()
    const [favIcon, setFavIcon] = useState()
    const [banner, setBanner] = useState()
    const [websiteInfo, setWebsiteInfo] = useState()

    useEffect(() => {
        API.get(`/website-info?id=3`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setWebsiteInfo(response.data)
            window.localStorage.removeItem('favIcon')
            window.localStorage.setItem('favIcon', response.data.favicon)
            setIsLoading(false)
        })
    },[]);

    

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const colorPicker = (event) => {
        setIsColorPickerOpen(!isColorPickerOpen)
    }
    

    function bannerUpload(e) {
        setBanner(e.target.files[0]);
    }

    function logoUpload(e) {
        setLogo(e.target.files[0]);
    }

    function favIconUpload(e) {
        setFavIcon(e.target.files[0]);
    }

    const updateAboutSIoInfo = (event) =>{
        setIsLoading(true)
        const formData = new FormData()
        if(logo != null){
            formData.append('logo', logo)
        }

        if(favIcon != null){
            formData.append('favicon', favIcon)
        }

        if(banner != null){
            formData.append('banner', banner)
        }

        formData.append('workspace_name', $("#workspaceName").val())
        formData.append('id',3)

        API.put(`/website-info/`, formData, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            API.get(`/website-info?id=3`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response1) => {
                setWebsiteInfo(response1.data)
                
                setIsLoading(false)
                window.location.reload(false)
            })
            
        })
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            <Stack spacing={3} mb={'30px'}>
                {/* Start Banner */}
                    <FormLabel>Upload Banner</FormLabel>
                    <Input type="file" onChange={bannerUpload} padding={"4px"}/>
                    <Image src={websiteInfo && websiteInfo.banner} />
                {/*End Banner*/}

                {/* Start Banner */}
                    <FormLabel>Upload Logo</FormLabel>
                    <Input type="file" onChange={logoUpload}  padding={"4px"}/>
                    <Image src={websiteInfo && websiteInfo.logo} maxW={'77px'} />
                {/*End Banner*/}

                {/* Start Banner */}
                    <FormLabel>Upload Favicon</FormLabel>
                    <Input type="file" onChange={favIconUpload} padding={"4px"} />
                    <Image src={websiteInfo && websiteInfo.favicon} maxW={'77px'} />
                {/*End Banner*/}

                <FormControl mb={'15px'}>
                    <FormLabel>Workspace Name</FormLabel>
                    <Input
                        id={"workspaceName"} 
                        placeholder='Please provide Workspace Name' 
                        size='md' 
                        backgroundColor={"#ffffff"} 
                        defaultValue={websiteInfo && websiteInfo.workspace_name}
                    />
                </FormControl>



                <Button className='primary' variant='outline' w={100} onClick={updateAboutSIoInfo}>
                    Save
                </Button>
            </Stack>
            

            
{/* 

            <FormLabel>Logo</FormLabel>
            <Box maxW={'100px'} p={'0'} className={Styles.uploadFileCont}>
                <Text as={'p'} className={Styles.dragDrop}>
                    <Box className={Styles.editContainer}>
                        <Text className={Styles.newText}> 
                            Upload or Drop Image 
                        </Text>
                    </Box>
                    <Input className={Styles.logoUpload} type='file' onChange={logoUpload} />
                    <Image src={file} maxW={'77px'} />
                </Text>
            </Box>
            <Text fontSize='xs'>Upload your workspace's logo.</Text>

            <FormLabel>Favicon</FormLabel>
            <Box maxW={'100px'} p={'0'} className={Styles.uploadFileCont}>
                <Text as={'p'} className={Styles.dragDrop}>
                    <Box className={Styles.editContainer}>
                        <Text className={Styles.newText}> 
                            Upload or Drop Image 
                        </Text>
                    </Box>
                    <Input className={Styles.logoUpload} type='file' onChange={favIconUpload} />
                    <Image src={file} maxW={'77px'} />
                </Text>
            </Box>

            <Box>
                <FormControl mb={'15px'}>
                    <FormLabel>Workspace Name</FormLabel>
                    <Input
                        id={"workspaceName"} 
                        placeholder='Please provide Workspace Name' 
                        size='md' 
                        backgroundColor={"#ffffff"} 
                        defaultValue={props.info && props.info.prop_label}
                    />
                </FormControl>
            </Box>

             */}
        </>
    )
}

export default General
