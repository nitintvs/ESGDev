import React, { useState, useEffect, useRef, useMemo } from 'react';
import Select from 'react-select';
import $ from 'jquery'
import Styles from './siotabs.module.css'
import { Link, useLocation } from 'react-router-dom';
import API from '../../../Services/API'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {Heading, SimpleGrid, Box, FormControl, Switch, Card, CardHeader, CardBody, CardFooter, Image, Text, Input, Button,Wrap,WrapItem, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import UserPlaceholderImage from '../../../../assets/images/userPlaceholder.svg'

const SioTabs = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [selectedUser, setSelectedUser] = useState()
    const [selectedUser1, setSelectedUser1] = useState()
    const editor = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading]  = useState(false)
    const [tabs, setTabs] = useState()
    const [team, setTeam] = useState()
    const [users, setUsers] = useState()
    const [isOpenUp, setIsOpenUp] = useState(false);
    const [isOpenUp1, setIsOpenUp1] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(true);
    const [buttonVisible1, setButtonVisible1] = useState(true);
    const [showSubmit, setShowSubmit] = useState()
    const [showSubmit1, setShowSubmit1] = useState()

    useEffect(() => {
        API.get(`/sio-info/`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
            setTabs(response.data.results)
        })
        API.get(`/pillar-team`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }).then(response => {
            setTeam(response.data)
        })
        API.get(`/list-user`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            setUsers(response.data)
            setIsLoading(false)
        }).catch(error => {
            
        });
    },[])

    const toggleDropdown = () => {
        setIsOpenUp(!isOpenUp1);
        setButtonVisible(false);
    };
    const toggleDropdown1 = () => {
        setIsOpenUp1(!isOpenUp1);
        setButtonVisible1(false);
    };

    const options = users && users.map(user => ({
        value: user.id,
        label: user.first_name || user.last_name ? `${user.first_name} ${user.last_name}` : user.email
    }));

    const addNewTab = (event) =>{
        setIsLoading(true)
        const formData = new FormData()
        formData.append('prop_label', $("#tabheading").val())
        API.post(`/sio-info/`, formData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
            API.get(`/sio-info/`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(response=>{
                setTabs(response.data.results)
                setIsLoading(false)
            })
        })
    }

    const updateSIOInfo = (event) =>{
        setIsLoading(true)
        const formData = new FormData()
        formData.append('id', event.target.id)
        formData.append('prop_label', $("#tabheading"+event.target.id).val())
        formData.append('description', $("#tabdesc"+event.target.id).val())
        API.put(`/sio-info/`, formData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
            API.get(`/sio-info/`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(response=>{
                setTabs(response.data.results)
                setIsLoading(false)
            })
        })
    }
    
    const handleSelect = (selectedOption) => {
        setShowSubmit(true)
        setSelectedUser(selectedOption.value)
    };
    const handleSelect1 = (selectedOption) => {
        setShowSubmit1(true)
        setSelectedUser1(selectedOption.value)
    };

    const addTeamLead = (event) =>{
        setIsLoading(true)
        const formData = new FormData()
        if(event.target.name === 'level1'){
            formData.append('user', selectedUser)
            formData.append('level', 'level1')
        }else if(event.target.name === 'level2'){
            formData.append('user', selectedUser1)
            formData.append('level', 'level2')
        }

        API.post(`/pillar-team`, formData,  {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            API.get(`/pillar-team`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then(response => {
                setTeam(response.data)
                setIsLoading(false)
            })
        })
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            {
                props.editable ? 
                    <Button className={Styles.addButton} mb={'10px'} position={'absolute'} right={'40px'} onClick={onOpen}>
                        <AddIcon /> Add new tab
                    </Button> 
                : null
            }
            {
                tabs && tabs.length > 0 ? 
            <Tabs
                defaultActiveKey={tabs && tabs[0].prop_label}
                id="uncontrolled-tab-example"
                className={"mb-3 customTabClass"}
                variant="underline"
            >
                {
                    tabs && tabs.map(item =>
                        <Tab eventKey={item.prop_label} title={item.prop_label}>
                            {
                                props.editable ?
                                    <>
                                        <Input 
                                            type='text' 
                                            placeholder='Please proved Tab Heading' 
                                            id={"tabheading"+item.id}
                                            mb={'10px'}
                                            defaultValue={item.prop_label}
                                        />
                                        <JoditEditor
                                            id={"tabdesc"+item.id}
                                            ref={editor}
                                            placeholder={'Provide tab content / Description'}
                                            tabIndex={1} // tabIndex of textarea
                                            onChange={newContent => {}}
                                            value={item.description}
                                        />
                                        <Button id={item.id} colorScheme='teal' variant='outline' w={100} onClick={updateSIOInfo} mt={'20px'}>
                                            Save
                                        </Button>
                                    </> 
                                    
                                : <Text> {item.description !== null ? parse(item.description) : null} </Text>
                            }
                        </Tab>
                    )
                }
                <Tab eventKey="leradershipteam" title="SIO Leadership Team">
                    <SimpleGrid columns={[1, 2, 3,]} spacing='20px' mt={'10px'}>
                        {
                            team && team.map(item=>
                                ((item.level === 'level1')) ?
                                <>
                                    <Box className={Styles.customBorder}>
                                        <Link to={`team/${item.id}/${item.member_name}`}>
                                            <Card padding={'0'}>
                                                <CardBody padding={'0'}>
                                                    <Box className={Styles.clearfix}>
                                                        {
                                                            <>
                                                                <Box float={'left'} maxWidth={'80px'}>
                                                                    <Image src={item.image ? item.image : UserPlaceholderImage} h={'106.66px'} maxW={'80px'} />
                                                                </Box>
                                                                <Box className={Styles.floaterBox} float={'left'} p={'5px'}>
                                                                    <Text className={Styles.teamLink +' '+ Styles.textFocus}> {item.member_name} </Text>
                                                                    <Text py='2' className={Styles.textCaption}>{item.job_title}</Text>
                                                                </Box>
                                                            </> 
                                                        }
                                                    </Box>
                                                </CardBody>
                                            </Card>
                                        </Link>
                                    </Box>
                                </> : null
                            )
                        }
                        {
                            props.editable ? 
                                <>
                                    <Box>
                                        {
                                            buttonVisible && 
                                            <Button className={Styles.addNewButton} onClick={toggleDropdown}> 
                                                <AddIcon mr={'10px'} /> Add 
                                            </Button>
                                        }
                                        {isOpenUp && (
                                            <>
                                                <Select
                                                    defaultValue={selectedUser}
                                                    options={options}
                                                    onChange={handleSelect}
                                                />
                                                
                                            </>
                                        )}
                                    </Box>
                                    {
                                        showSubmit ? <Box>
                                            <Button className='buttonPrimary' onClick={addTeamLead} name={'level2'}> Add Selected User </Button>
                                        </Box> : null
                                    }
                                </>
                            :null
                        }
                    </SimpleGrid>

                    
                    <SimpleGrid columns={[1, 2, 3, ]} spacing='20px' mt={'40px'}>
                        {
                            team && team.map(item=>
                                item.level === 'level2' ?
                                <>
                                    <Box className={Styles.customBorder}>
                                        <Link to={`team/${item.id}/${item.member_name}`}>
                                            <Card padding={'0'}>
                                                <CardBody padding={'0'}>
                                                    <Box className={Styles.clearfix}>
                                                        {
                                                            <>
                                                                <Box float={'left'} maxWidth={'80px'}>
                                                                    <Image src={item.image ? item.image : UserPlaceholderImage} h={'106.66px'} maxW={'80px'} />
                                                                </Box>
                                                                <Box className={Styles.floaterBox} float={'left'} p={'5px'}>
                                                                    <Text className={Styles.teamLink +' '+ Styles.textFocus}> {item.member_name} </Text>
                                                                    <Text py='2' className={Styles.textCaption}>{item.job_title}</Text>
                                                                </Box>
                                                            </> 
                                                        }
                                                    </Box>
                                                </CardBody>
                                            </Card>
                                        </Link>
                                    </Box>
                                </> : null
                            )
                        }
                        {
                            props.editable ? 
                                <>
                                    <Box>
                                        {
                                            buttonVisible1 && 
                                            <Button className={Styles.addNewButton} onClick={toggleDropdown1}> 
                                                <AddIcon mr={'10px'} /> Add 
                                            </Button>
                                        }
                                        {isOpenUp1 && (
                                            <>
                                                <Select
                                                    defaultValue={selectedUser}
                                                    options={options}
                                                    onChange={handleSelect1}
                                                />
                                                
                                            </>
                                        )}
                                    </Box>
                                    {
                                        showSubmit1 ? <Box>
                                            <Button className='buttonPrimary' onClick={addTeamLead} name={'level2'}> Add Selected User </Button>
                                        </Box> : null
                                    }
                                </>
                            :null
                        }
                    </SimpleGrid>
                    <SimpleGrid columns={[1, 2, 3, ]} spacing='20px' mt={'10px'}>
                        {
                            team && team.map(item=>
                                ((item.role === 'lead') && (item.level === 'level3')) ?
                                <>
                                    <Box>
                                        <Link to={`team/${item.id}/${item.name}`}>
                                            <Card padding={'0'}>
                                                <CardBody padding={'0'}>
                                                    <Box className={Styles.clearfix}>
                                                        {
                                                            (item.image !== null) ? 
                                                                <>
                                                                    <Box float={'left'} maxWidth={'86px'}>
                                                                        <Image src={item.image} h={'86px'} maxW={'86px'} />
                                                                    </Box>
                                                                    <Box className={Styles.floaterBox} float={'left'} p={'5px'}>
                                                                        <Text as={'span'} className={Styles.teamLink}> {item.member_name} </Text>
                                                                        <Text py='2' className={Styles.designation}>{item.job_title}</Text>
                                                                    </Box>
                                                                </> 
                                                            : 
                                                            <Wrap ml={'10px'} p={'11px 0'}>
                                                                <WrapItem>
                                                                    <Avatar
                                                                        size='md'
                                                                        name={item.member_name}
                                                                        src={item.image}
                                                                        mr={'10px'}
                                                                    />
                                                                    <Box>
                                                                        <Text  w={'100%'} maxW={'170px'} minW={'170px'} as={'p'} display={'block'} marginBottom={'0'}>
                                                                            {item.member_name}
                                                                        </Text>
                                                                        <Text as={'span'} w={'100%'} minW={'170px'} maxW={'170px'}>
                                                                            {item.job_title}
                                                                        </Text>
                                                                    </Box>
                                                                </WrapItem>
                                                            </Wrap>
                                                        }
                                                    </Box>
                                                </CardBody>
                                            </Card>
                                        </Link>
                                    </Box>
                                </> : null
                            )
                        }
                    </SimpleGrid>
                </Tab>
            </Tabs>
            : null
            }

            <Modal isOpen={isOpen} onClose={onClose}  closeOnOverlayClick={false} width='500px'>
                <ModalOverlay className={Styles.overLay} />
                <ModalContent className={Styles.contentZindex}>
                    <ModalHeader>Create tab</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Input type='text' placeholder='Please proved Tab Heading' id={"tabheading"} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter className={Styles.modelFooter}>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' onClick={addNewTab} backgroundColor={'#ffffff'}>Create</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SioTabs
