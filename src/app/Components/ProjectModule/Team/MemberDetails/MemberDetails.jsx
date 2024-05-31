import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import $ from 'jquery'
import API from '../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import {
    Card, 
    CardHeader, 
    CardBody, 
    Heading, 
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel, 
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Text, Box, Input, Textarea, Button, Image, Grid, GridItem, SimpleGrid, Switch,
    Select, Stack, useToast
} from '@chakra-ui/react'
import Breadcrumb from '../../../../Components/Widgets/BreadCrumbs/BreadCrumbs'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import Face10 from '../../../../../assets/images/defaultAvatar.png'
import { EditContext } from '../../../../Context/BreadcrumbsContext';

const MemberDetails = () => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(true)
    const [editable, setEditable] = useState();
    const editor = useRef(null);
    const [file, setFile] = useState(null);
    const [memberInfo, setMemberInfo] = useState()
    const {memberId} = useParams();
    const [actionOfficeUser, setActionOfficeUser] = useState(false)
    const {edit, setEdit } = useContext(EditContext);
    useEffect(()=>{
        document.documentElement.scrollTo(0, 0);
        setIsLoading(true)
        API.get(`/pillar-team?member_id=${memberId}`)
        .then((response) => {
            setMemberInfo(response.data[0])
            setIsLoading(false)
        })
    },[])

    const updateProfile = () =>{
        setIsLoading(true)
        const formData = new FormData()
        formData.append('id', memberId)
        if(file != null){
            formData.append('image', file)
        }
        formData.append('member_name', $("#member_name").val())
        formData.append('email', $("#email").val())
        formData.append('description', $("#description").val())
        formData.append('webex_url', $("#webex_url").val())
        formData.append('role', $("#role").val())
        formData.append('position', $("#position").val())
        formData.append('priority', $("#priority").val())
        formData.append('job_title', $("#job_title").val())
        formData.append('action_office_user', actionOfficeUser)
        
        API.put(`/pillar-team`, formData,  {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            API.get(`/pillar-team?member_id=${memberId}`)
            .then((response) => {
                setMemberInfo(response.data[0])
                setIsLoading(false)
            })
        })
    }
    
    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }
    
    function bannerUpload(e) {
        setFile(e.target.files[0]);
    }

    const onHandleChange = (event) =>{
        console.log(event.target.checked)
        setActionOfficeUser(event.target.checked)
    }

    return (
        <>
            { 
                isLoading ? <LoaderSpinner />: null
            }
            <Breadcrumb geteditStatus={geteditStatus} title={memberInfo && memberInfo.member_name} pillarId={''} />
            <Card>
                <CardBody>
                    <Grid
                        templateRows='repeat(1, 1fr)'
                        templateColumns='repeat(5, 1fr)'>
                        <GridItem rowSpan={2} colSpan={1}>
                            <Card>
                                <CardBody>
                                    <Image
                                        borderRadius='full'
                                        boxSize='220px'
                                        src={memberInfo && memberInfo.image !== null ? memberInfo && memberInfo.image : Face10}
                                        alt='Dan Abramov'
                                    />
                                    {
                                        edit ? 
                                            <>
                                                <Input type="file" onChange={bannerUpload} padding={"4px"} />
                                                <Box mt={'20px'}>
                                                    <FormControl>
                                                        <Input type='text' id={'member_name'} placeholder='Please provide the name' defaultValue={memberInfo && memberInfo.member_name} mb={'15px'} />
                                                    </FormControl>
                                                </Box>                                 
                                            </>
                                        :
                                        <Box mt={'20px'}>
                                            <FormLabel>{memberInfo && memberInfo.member_name}</FormLabel>
                                            <FormLabel>{memberInfo && memberInfo.email}</FormLabel>
                                        </Box>
                                    }
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem colSpan={4} p={'20px'} pt={'0'}>
                            <Card>
                                <CardBody>
                                <SimpleGrid columns={[1, 2]} spacing='20px' mt={'10px'}>
                                        <Box>
                                            <Stack>
                                                <FormLabel fontWeight={'bold'}> Job Title </FormLabel>
                                                {
                                                    edit ?
                                                        <Input type='text' id={'job_title'} placeholder='Please provide the job title' defaultValue={memberInfo && memberInfo.job_title} mb={'15px'} />
                                                    : <Text textTransform={'capitalize'}> {memberInfo && memberInfo.job_title} </Text>
                                                }
                                            </Stack>
                                        </Box>
                                        <Box>
                                            <Stack>
                                                <FormLabel fontWeight={'bold'}> Email </FormLabel>
                                                {
                                                    edit ?
                                                        <Input type='email' id={'email'} placeholder='Please provide the email' defaultValue={memberInfo && memberInfo.email} mb={'15px'} />
                                                    : <Text textTransform={'capitalize'}> {memberInfo && memberInfo.email} </Text>
                                                }
                                                
                                            </Stack>
                                        </Box>
                                        <Box>
                                            <Stack>
                                                <FormLabel fontWeight={'bold'}> WebEx URL</FormLabel>
                                                {
                                                    edit ? 
                                                        <Input type='url' id={'webex_url'} placeholder='Please provide webex URL' defaultValue={memberInfo && memberInfo.webex_url} /> 
                                                    : <Text textTransform={'capitalize'}> {memberInfo && memberInfo.webex_url} </Text>
                                                }
                                            </Stack>
                                        </Box>
                                        <Box>
                                            <Stack>
                                                <FormLabel fontWeight={'bold'}> Role </FormLabel>
                                                {
                                                    edit ? 
                                                        <Select variant='filled' id={'role'} name={''}>
                                                            {}
                                                            <option value={''}> Please select role from below list </option>
                                                            <option value={memberInfo && memberInfo.role} selected> {memberInfo && memberInfo.role} </option>
                                                            <option value={'owner'}>Owner</option>
                                                            <option value={'pm'}>PM</option>
                                                            <option value={'member'}>Member</option>
                                                            <option value={'lead'}>Lead</option>
                                                            <option value={'advisor'}>Advisor</option>
                                                            <option value={'vp'}>VP</option>
                                                            <option value={'action_leader'}>Action Leader</option>
                                                            <option value={'sio_leader'}>SIO Leader</option>
                                                            <option value={'sio_key_contact'}>SIO Key Contact</option>
                                                            <option value={'senior_executive_administrator'}>Senior Executive Administrator</option>
                                                            <option value={'director_corporate_affairs'}>Director Corporate Affairs</option>
                                                            <option value={'director_social_impact_office'}>Director Social Impact Office</option>
                                                            <option value={'director_social_justice_action_office'}>Director Social Justice Action Office</option>
                                                            <option value={'director_community_impact'}>Director Community Impact</option>
                                                            <option value={'svp_chief_impact_officer'}>SVP Chief Impact Officer</option>
                                                        </Select>
                                                    : <Text textTransform={'capitalize'}> {memberInfo && memberInfo.role} </Text>
                                                }
                                            </Stack>
                                        </Box>
                                        <Box>
                                            <Stack>
                                                <FormLabel fontWeight={'bold'}> Position </FormLabel>
                                                {
                                                    edit ? 
                                                        <Select variant='filled' id={'position'} name={''} placeholder=''>
                                                            <option value={''}> Please select position from below list </option>
                                                            <option value={'elt'}>ELT</option>
                                                            <option value={'elt_sponsor'}>ELT Sponsor</option>
                                                            <option value={'pillar_owner'}>Pillar Owner</option>
                                                            <option value={'action_owner'}>Action Owner</option>
                                                            <option value={'action_team_memeber'}>Action Team Memeber</option>
                                                        </Select>
                                                    : <Text textTransform={'capitalize'}>{memberInfo && memberInfo.position}</Text>
                                                }
                                            </Stack>
                                        </Box>
                                        <Box>
                                            <Stack>
                                                <FormLabel fontWeight={'bold'}> Priority </FormLabel>
                                                {
                                                    edit ? 
                                                        <Input type='number' id={'priority'} placeholder='Please provide number to set priority' defaultValue={memberInfo && memberInfo.priority} /> 
                                                    : <Text textTransform={'capitalize'}>{memberInfo && memberInfo.priority}</Text>
                                                }
                                            </Stack>
                                        </Box>
                                        <Box>
                                          <FormControl display='flex' alignItems='center'>
                                                <FormLabel htmlFor='action_office_user' mb='0' fontWeight={'bold'}>
                                                    Action Office User.?
                                                </FormLabel>
                                                {memberInfo && memberInfo.action_office_user ? <Switch id='action_office_user' mt={'10px'} defaultChecked={true} onChange={onHandleChange}  /> : <Switch id='action_office_user' mt={'10px'} defaultChecked={false} onChange={onHandleChange} />}
                                            </FormControl>
                                        </Box>
                                    </SimpleGrid>
                                    <Box>
                                        <FormLabel fontWeight={'bold'}> Description </FormLabel>
                                        {
                                            edit ?
                                                <JoditEditor
                                                    id={"description"}
                                                    ref={editor}
                                                    value={memberInfo && memberInfo.description}
                                                    tabIndex={1} // tabIndex of textarea
                                                    onChange={newContent => {}}
                                                /> 
                                            : <Text textTransform={'capitalize'}> {memberInfo && memberInfo.description != null  ? parse(memberInfo && memberInfo.description) : ''} </Text>
                                        }
                                    </Box>
                                    
                                    <Box>
                                        {
                                            edit ? 
                                            <Stack mt={'20px'}>
                                                <Button colorScheme='blue' onClick={updateProfile}> Update </Button>
                                            </Stack> : null
                                        }
                                    </Box>  
                                </CardBody>
                            </Card>
                        </GridItem>
                    </Grid>
                </CardBody>
            </Card>
        </>
    )
}

export default MemberDetails