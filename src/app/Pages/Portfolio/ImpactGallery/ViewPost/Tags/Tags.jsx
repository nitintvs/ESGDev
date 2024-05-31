import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from '../viewpost.module.css'
import $ from 'jquery'
import API from '../../../../../Services/API';
import Select from 'react-select';
import { Heading, Box, Image, Text, Input, Textarea, Divider, Button, Card, CardHeader, CardBody, CardFooter, Stack, ButtonGroup, Grid, GridItem, StackDivider  } from '@chakra-ui/react'
import { Tag, TagLabel, TagLeftIcon, TagRightIcon, TagCloseButton,} from '@chakra-ui/react'
import {FormControl, FormLabel, FormErrorMessage, FormHelperText, Badge } from '@chakra-ui/react'
import LoaderSpinner from '../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const Tags = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const [pillar, setPillar] = useState()
    const [selectedOptions, setSelectedOptions] = useState()
    
    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        API.get(`/tag-detail/`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setPillar(response.data.results)
        })
    },[])
    
    const options = pillar && pillar.map(item =>
        ({label: item.name, value: item.id})
    )

    const defaultSelectedOptions = props.selectedOptions && props.selectedOptions.map(item =>
        ({label: item.name, value: item.id})
    )

    const selectOption = (event) =>{
        setSelectedOptions(event.map(option => option.value));
    }

    const addOptions = () =>{
        setIsLoading(true)
        const formData = new FormData()
        formData.append('blog_id', parseInt(props.id))
        formData.append('blog_tag', JSON.stringify(selectedOptions))
        API.put(`/blog`,formData , {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            API.get(`/blog?id=${props.id}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                props.getUpdated(response.data[0])
                setIsLoading(false)
            })            
        })
    }

    return (
        <>
            { 
                isLoading ? <LoaderSpinner />: null
            }
            <Box>
                <Heading className={Styles.sideBarHeading}>
                    Tags
                </Heading>
                <Text p='0' className={Styles.sideBarText}>
                    {
                        props.editable ?
                            <>
                                <Select
                                    options={options}
                                    isMulti
                                    defaultValue={defaultSelectedOptions}
                                    onChange={selectOption}
                                />
                                <Button  background={'#00aae0'} color={'#ffffff'} mt={'5px'} onClick={addOptions}> Add </Button>
                            </>
                        : <>
                            {
                                props.selectedOptions && props.selectedOptions.map(item => 
                                    <Tag
                                        borderRadius='full'
                                        variant='solid'
                                        background={'#d4d4d8'}
                                        color={"#000000"}
                                        mr={'5px'}
                                        mb={'5px'}
                                    >
                                        <TagLabel>{item.name}</TagLabel>
                                    </Tag>
                                )
                            }
                    </>
                    }
                    
                </Text>
            </Box>
        </>
    )
}

export default Tags