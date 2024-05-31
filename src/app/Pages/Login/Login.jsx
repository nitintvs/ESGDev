import React,{useState} from 'react'
import $ from 'jquery'
import Styles from './Login.module.css'
import API from '../../Services/API'
import { Box, FormControl, FormLabel, Input, Button, Text, Heading, Stack, Image, Spinner, Card, CardBody } from '@chakra-ui/react'
import Logo from './images/logo.png'
import LoaderSpinner from '../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'


const Login = () => {
    $("body").addClass('logiBody')
    const [passwordError, setPasswordError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const loginHandler = () => {
        setIsLoading(true)
        let email = $("#userId").val()
        let password = $("#password").val()

        if((email === '') || (password === '')){
            setPasswordError("Please provide Email and Password")
        }else if((email !== '') && (password !== '')){
            const body = {
                "email": $("#userId").val(),
                "password": $("#password").val()
            }
            API.post(`/user-login`, body)
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
            }).catch(error => {
                if(error.response.data.error === 'User not found'){
                    setPasswordError("Invalid credentials. Please try again with the correct email ID and password.")
                    setIsLoading(false)
                }else if(error.response.data.error === 'Incorrect password'){
                    setPasswordError("Invalid credentials. Please try again with the correct email ID and password.")
                    setIsLoading(false)
                }
            });
        }
    }

    return (
        <Box className={Styles.limiter}>
            <Box className={Styles.container_login100}>
                <Box className={Styles.wrap_login100}>
                    {
                        isLoading ? <LoaderSpinner /> : null
                    }
                    <Box textAlign={'center'} w={'100%'}>
                        <Image src={Logo} m={'0 auto'}/>
                    </Box>
                    <Card w={'100%'}>
                        <CardBody>
                            <Text className={Styles.error}>
                                {passwordError} 
                            </Text>
                            <FormControl>
                                <FormLabel>User Name / Email address</FormLabel>
                                <Input type='email' mb={'15px'} id={'userId'} placeholder='Please enter User Name / Email address'/>
                                <FormLabel>Password</FormLabel>
                                <Input type='password' mb={'15px'} id={'password'}  placeholder='Please enter Password'/>
                                <Button colorScheme='blue' className={Styles.loginButton} onClick={loginHandler}> Login </Button>
                            </FormControl>
                        </CardBody>
                    </Card>
                    
                </Box>
            </Box>
        </Box>
    )
}

export default Login