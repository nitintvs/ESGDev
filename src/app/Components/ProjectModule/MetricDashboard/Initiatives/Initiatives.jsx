import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Styles from './Initiatives.module.css'
import API from '../../../../Services/API';
import AddNewInitiative from './AddNewInitiative/AddNewInitiative'
import {Heading, SimpleGrid, Box, FormControl, Switch, Card, CardHeader, CardBody, CardFooter, Image, Text, Input, Button,Wrap,WrapItem, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import AreaChartComponent from '../../../Modules/Charts/AreaChartComponent';
import LoaderSpinner from '../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import TabLoader from '../../../Widgets/CommonWidgets/TabLoader/TabLoader';

const Initiatives = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const [initiative, setInitiative] = useState()

    useEffect(() => {
        setIsLoading(true)
        API.get(`/initiative?pillar_id=${props.pillarId}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setInitiative(response.data)
            setIsLoading(false)
        })
    },[])

    const getUpdated = (initiative) =>{
        setInitiative(initiative)
    }

    return (
        <>
            {isLoading ? <TabLoader /> : null}
            {
                props.editable ? 
                    <AddNewInitiative
                        pillarId={props.pillarId && props.pillarId} 
                        actions={props.actions && props.actions}
                        getUpdated={getUpdated}
                    /> 
                : null
            }
            
            <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                {
                    initiative && initiative.map(initiative => 
                        <Box maxW='sm' backgroundColor={'#e2e8f0'} borderWidth='1px' borderRadius='lg' overflow='hidden' height={'100px'}>
                            <Link className={Styles.valign} to={`initiative/${initiative.id}/${encodeURIComponent(initiative.name)}`}>
                                <Box p={'10px'}>
                                    <Heading as='h5' size='sm'>
                                        {initiative.name}
                                    </Heading>
                                </Box>
                            </Link>
                        </Box>
                    )
                }
            </SimpleGrid>
        </>
    )
}

export default Initiatives