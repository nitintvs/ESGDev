import React, { useState } from 'react'
import Styles from './pageInfo.module.css'
import { Text, Heading, Stack, Image } from '@chakra-ui/react'
import parse from 'html-react-parser';

const PageInfo = (props) => {
    return (
        <Stack spacing={6} mb={'10px'}>
            <Heading as='h2' size='lg'>
                {props.pageInfo && props.pageInfo.prop_label}
            </Heading>
            <Image src={props.pageInfo && props.pageInfo.banner} />
            {props.pageInfo && props.pageInfo.description != null  ? parse(props.pageInfo && props.pageInfo.description) : ''}
        </Stack>
    )
}

export default PageInfo