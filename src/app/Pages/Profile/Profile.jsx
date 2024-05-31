import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import Styles from './profile.module.css'
import $ from 'jquery'
import API from '../../Services/API';
import {  FormControl, FormLabel, FormErrorMessage, Text, Box, Button, Card, CardBody, Image, Input, SimpleGrid  } from '@chakra-ui/react'
import BreadCrumbs from '../../Components/Widgets/BreadCrumbs/BreadCrumbs';
import LoaderSpinner from '../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import BreadCrumbsNav from '../../Components/Shared/Navbar/BreadCrumbsNav';
import { EditContext } from '../../Context/BreadcrumbsContext';
import { Typography } from '@mui/material';
const Profile = () => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading] = useState()
    const [editable, setEditable] = useState();
    const[profile, setProfile] = useState();
  const [file, setFile] = useState(null);
  const [error,setError]=useState("")
    
    const {edit, setEdit } = useContext(EditContext);
    const geteditStatus = (isEdit) =>{
      setEditable(isEdit)
    }

    useEffect(()=>{
        document.documentElement.scrollTo(0, 0);
        setIsLoading(true)
        API.get(`/user-management`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response=>{
          setProfile(response.data)
          setIsLoading(false)
        })
    },[])

    function bannerUpload(e) {
      setFile(e.target.files[0]);
    }

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload(false);
    window.location.href = "/";
  };
  const updateProfile = () => {
    setIsLoading(true);
    setError("")

    const formData = new FormData();
    if (file != null) {
        formData.append('profile_picture', file);
    }

    formData.append('id', parseInt(profile && profile.id));
    formData.append('first_name', $('#profileFirstName').val());
    formData.append('last_name', $('#profileLastName').val());

    const currentPassword = $('#profilePassword').val();  
    const newPassword = $('#changePassword').val();
    const confirmPassword = $('#confirmPassword').val();

    if (currentPassword && (!newPassword || !confirmPassword)) {
        setIsLoading(false);
        // alert('To change your password, all three fields (current password, change password, and confirm password) are required.');
        setError('To change your password, all three fields (current password, change password, and confirm password) are required.');
        return;
    }

    if (!currentPassword && (newPassword || confirmPassword)) {
        setIsLoading(false);
        // alert('Current password is required to change your password.');
        setError('Current password is required to change your password.');
        return;
    }

    if (newPassword && confirmPassword) {
        if (newPassword === confirmPassword) {
            if (currentPassword) { 
                formData.append('password', newPassword);  // Update to new password
            }
        } else {
            setIsLoading(false);
            // alert('Change password and confirm password do not match.');
            setError('Change password and confirm password do not match.');
            return;
        }
    }

    API.put('/user-management', formData, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (newPassword) {
            logoutUser(); 
        } else {
            return API.get('/user-management', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
        }
    })
    .then(response1 => {
        if (response1) {  
            setProfile(response1.data);
            window.localStorage.removeItem('user');
            window.localStorage.setItem('user', JSON.stringify(response1.data));
        }
        setIsLoading(false);
    })
    .catch(error => {
        console.error('Error updating profile:', error);
        setIsLoading(false);
    });
};
    
    return (
        <>
          {
            isLoading ? <LoaderSpinner /> : null
          }
          <BreadCrumbs geteditStatus={geteditStatus} title={'Profile'} />
          <Card>
            <CardBody>
              <SimpleGrid columns={2} spacing={10}>
                <Box>
                  <FormControl mb={'10px'}>
                    <FormLabel>First Name *</FormLabel>
                    {
                      edit ? 
                        <Input type='text' id={'profileFirstName'} defaultValue={profile && profile.first_name} /> 
                      : <Text> {profile && profile.first_name} </Text>
                    }
                  </FormControl>
                  <FormControl mb={'10px'}>
                    <FormLabel>Last Name *</FormLabel>
                    {
                      edit ? 
                        <Input type='text' id={'profileLastName'} defaultValue={profile && profile.last_name} />
                      : <Text> {profile && profile.last_name} </Text>
                    }
                  </FormControl>
                  <FormControl mb={'10px'}>
                    <FormLabel>Email *</FormLabel>
                    {
                      edit ? 
                        <Input type='email' id={'profileEmail'} defaultValue={profile && profile.email} readOnly />
                      : <Text> {profile && profile.email} </Text>
                    }
                    
                  </FormControl>
                  {
                      edit ? 
                      <FormControl mb={'10px'}>
                        <FormLabel> Current password </FormLabel>
                        <Input type='password' id={'profilePassword'} />
                      </FormControl> : null
                  } 
                   {
                      edit ? 
                      <FormControl mb={'10px'}>
                        <FormLabel>Change  password *</FormLabel>
                        <Input type='password' id={'changePassword'} />
                      </FormControl> : null
                  } 
                   {
                      edit ? 
                      <FormControl mb={'10px'}>
                        <FormLabel>Confirm  password *</FormLabel>
                        <Input type='password' id={'confirmPassword'} />
                      </FormControl> : null
                  }
                </Box>

                <Box>
                  <FormControl className={Styles.imgCon}>
                    <Image
                      borderRadius='full'
                      boxSize='150px'
                      src={profile && profile.profile_picture}
                      alt='Dan Abramov'
                      border={'1px solid #00a0da'}
                    m={'0 auto'}
                    mb={3.5}
                    />
                  </FormControl>
                  {
                    edit ?
                    <FormControl mb={'10px'}>
                      <FormLabel>Change Profile Image</FormLabel>
                      <Input type="file" onChange={bannerUpload} padding={"4px"}  />
                    </FormControl> : null
                  }
                </Box>
            </SimpleGrid>
            {error && <p style={{color:"red"}}>{error}</p>}
           
              {
                edit ? <Button onClick={updateProfile} className={Styles.updateButton}> Update Profile </Button> : null
              }
            </CardBody>
          </Card>
        </>
    )
}

export default Profile