import React, { useState } from 'react'
import API from '../../../Services/API'
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
import LoaderSpinner from '../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'

const MainBannerEdit = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const [banner, setBanner] = useState()
    
    function bannerUpload(e) {
        setBanner(e.target.files[0]);
    }
    const updateAboutSIoInfo = (event) =>{
        setIsLoading(true)
        const formData = new FormData()
        if(banner != null){
            formData.append('banner', banner)
        }
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
                props.getUpdatedBanner(response1.data.banner)
                setIsLoading(false)
            })
            
        })
    }

    return (
        <>
            {
                isLoading ? <LoaderSpinner /> : null
            }
            <Stack spacing={3} mb={'30px'}>
                {/* Start Banner */}
                    <FormLabel>Change Banner</FormLabel>
                    <Input type="file" onChange={bannerUpload}  padding={"4px"}  />
                    <Image src={props.banner && props.banner} />
                {/*End Banner*/}
                <Button colorScheme='teal' variant='outline' w={100} onClick={updateAboutSIoInfo}>
                    Save
                </Button>
            </Stack>
        </>
    )
}

export default MainBannerEdit
