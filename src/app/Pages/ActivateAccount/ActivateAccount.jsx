import React,{useEffect, useState} from 'react'
import $ from 'jquery'
import Styles from './activateaccount.module.css'
import { Link, useParams, useNavigate } from 'react-router-dom';
import API from '../../Services/API'
import { Box, FormControl, FormLabel, Input, Button, Text, Heading, Stack, Image, Spinner, Card, CardBody } from '@chakra-ui/react'
import LoaderSpinner from '../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import Logo from './images/logo.png';


const ActivateAccount = () => {
    $("body").addClass('logiBody')
    const [loader, setLoader] = useState(true)
    const {id} = useParams();
    const {token} = useParams();
    const [msg, setMsg] = useState()
    const [email, setEmail] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [activationStatus, setActivationStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        API.get(`/activate_account/${id}/${token}`,)
        .then((response) => {
            setMsg(response.data.msg)
            setEmail(response.data.username)
            setIsLoading(false)
        }).catch(error => {
            if(error.response.data.msg = 'Account is already activated.'){
                setActivationStatus(true)
                setIsLoading(false)
            }
        })
    },[])

    const updateRegister = () => {
        setIsLoading(true)
        let firstName = $("#firstName").val()
        let lastName = $("#lastName").val()
        let password = $("#password").val()
        if((firstName === '') || (lastName === '') || (password === '')){
            setErrorMessage('Please fill all fields to proceed')
            setIsLoading(false)
            return
        }else{
            const body = {
                "username": email,
                "first_name": $("#firstName").val(),
                "last_name": $("#lastName").val(),
                "password": $("#password").val(),
            }
            API.post(`/register/`, body)
            .then((response) => {
                const body1 = {
                    "email": email,
                    "password": $("#password").val()
                }
                API.post(`/user-login`, body1)
                .then((response) => {
                    API.get(`/user-management`, {
                        headers:{
                        'Authorization': 'Bearer ' + response.data.access
                        }
                    }).then((response1) => {
                        window.localStorage.setItem('user', JSON.stringify(response1.data))
                        window.localStorage.setItem("accessToken", response.data.access)
                        window.localStorage.setItem("refreshToken", response.data.refresh)
                        window.location.href = "/dashboard";
                        setIsLoading(false)
                    })
                })
            })
        }
    }

    return (
        <>
            <Box className={Styles.limiter}>
                <Box className={Styles.container_login100}>
                    <Box className={Styles.wrap_login100}>
                        {
                            isLoading ? <LoaderSpinner /> : null
                        }
                        <Box textAlign={'center'} w={'100%'}>
                            <Image src={Logo} m={'0 auto'}/>
                        </Box>
                        <Card>
                            <CardBody>
                                {
                                    msg === 'Success' ? 
                                        <>
                                            <Text className={Styles.successMsg}> {email} verified successfully </Text> 
                                            <FormControl>
                                                <Input type='email' mb={'15px'} id={'userId'} defaultValue={email} readOnly disabled />
                                                <Input type='text' mb={'15px'} id={'firstName'}  placeholder='Please enter First name'/>
                                                <Input type='text' mb={'15px'} id={'lastName'}  placeholder='Please enter Last name'/>
                                                <Input type='password' mb={'15px'} id={'password'}  placeholder='Please enter Password'/>
                                                <Text className={Styles.errorMsg}> {errorMessage} </Text> 
                                                <Button colorScheme='blue' className={Styles.loginButton} onClick={updateRegister}> Update & Login </Button>
                                            </FormControl>
                                        </>
                                    : activationStatus ? 
                                    <Text className={Styles.successMsg}> 
                                        Account is already activated. please click on below link to login 
                                        <Link to={'/login'} className={Styles.loginLink}> Login </Link>
                                    </Text> : null
                                }
                            </CardBody>
                        </Card>
                        
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ActivateAccount