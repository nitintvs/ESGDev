import React, { useState } from 'react'
import Styles from './info.module.css'
import { Text, Heading, Stack, Image } from '@chakra-ui/react'
import parse from 'html-react-parser';

const Info = (props) => {
    return (
        <Stack spacing={6} mb={'10px'}>
            <Heading as='h2' size='lg'>
                {props.info && props.info.prop_label}
            </Heading>
            <Image src={props.info && props.info.banner} />
            {props.info && props.info.description != null  ? parse(props.info && props.info.description) : ''}
        </Stack>
    )
}

export default Info