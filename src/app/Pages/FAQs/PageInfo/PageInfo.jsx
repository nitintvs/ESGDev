import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import $ from 'jquery'
import Styles from './pageInfo.module.css'
import API from '../../../Services/API'
import { Text, Heading, Stack, Image, Spinner } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import Banner from './Banner/Banner'

const PageInfo = (props) => {
    return (
        <>
            <Stack spacing={6} mb={'10px'} mt={'20px'}>
                <Heading as='h2' size='lg'>
                    {props.faqInfo && props.faqInfo.prop_label}
                </Heading>
                <Banner ImageUrl={props.faqInfo && props.faqInfo.banner} />
                <Text>
                    {props.faqInfo ? parse(props.faqInfo && props.faqInfo.description) : ''}
                </Text>
            </Stack>
        </>
    )
}

export default PageInfo