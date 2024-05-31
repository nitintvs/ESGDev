import React, { useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom'
import Styles from './pageinfo.module.css'
import API from '../../../../Services/API';
import {Input, Stack, Button, Spinner, Image, } from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import LoaderSpinner from '../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const PageInfo = () => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const [file, setFile] = useState(null);
    const editor = useRef(null);
    const {id} = useParams();

    return (
        <>
            
        </>
    )
}

export default PageInfo