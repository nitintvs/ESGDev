import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from '../team.module.css'
import API from '../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button, SimpleGrid, Stack, CardFooter} from '@chakra-ui/react'
import Face10 from '../../../../../assets/images/defaultAvatar.png'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { DeleteIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import {
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Spinner,
} from '@chakra-ui/react'
import LoaderSpinner from '../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import userPlaceholder from '../../../../../assets/images/userPlaceholder.svg'

const TeamList = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const {category} = useParams();
    const {id} = useParams();
    const {name} = useParams();
    const [isLoading, setIsLoading]  = useState(false)

    async function deleteTeam() {
        setIsLoading(true)
        const dataToDelete = {
            "member_id": props.id
        };

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await API.delete(`/pillar-team`, {
                headers: headers,
                data: dataToDelete // Pass the data to delete
            });
            API.get(`/pillar-team?pillar_id=${props.pillarId}`,
            {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                props.getUpdatedTeam(response.data)
                onClose()
                setIsLoading(false)
            })
        } catch (error) {
            console.error("Error:", error.message);
            onClose()
            setIsLoading(false)
        }
    }

    return (
        <>
            {
                isLoading ? <LoaderSpinner /> : null
            }
            <Box>
                {
                    props.editable ? 
                        <Box className={Styles.deleteCont}>
                            <Button className={Styles.deleteButton} onClick={onOpen}>
                                <DeleteIcon color={'#00a0da'} onClick={onOpen} />
                            </Button>
                        </Box>
                    : null
                }
                
                <Link to={`team/${props.id}/${props.name}`}>
                    <Card padding={'0'} w={'100%'} className={props.editable ? Styles.customCardPo:''}>
                        <CardBody padding={'0'}>
                            <Box className={Styles.clearfix}>
                                <Box float={'left'} maxWidth={'86px'} className={Styles.imgContainer}>
                                    <Avatar name={props.name} src={props.image?props.image:userPlaceholder} height={'106px'} width={'86px'} borderRadius={'0'}/>
                                </Box>
                                <Box float={'left'} p={'5px'}>
                                    <Text as={'span'} className={Styles.teamLink}> {props.name} </Text>
                                    <Text py='2' className={Styles.designation}>{props.jobTitle}</Text>
                                </Box>
                            </Box>
                        </CardBody>
                    </Card>
                </Link>
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    isOpen={isOpen}
                    isCentered
                    closeOnOverlayClick={false} 
                    onClose={onClose}
                >
                    { isLoading ? 
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                            className={Styles.spinner}
                        />: null
                    }
                    <AlertDialogOverlay className={Styles.overLay}>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete {props.title}
                            </AlertDialogHeader>

                            <AlertDialogBody mb={'20px'}>
                                Are you sure? You can't undo this action afterwards.
                            </AlertDialogBody>
                            <AlertDialogCloseButton />
                            <AlertDialogFooter className={Styles.modelFooter} backgroundColor={'transparent'}>
                                <Button className={Styles.cancel} ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='blue' onClick={deleteTeam} ml={3} title={props.title} id={props.id} >
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Box>
        </>
    )
}

export default TeamList