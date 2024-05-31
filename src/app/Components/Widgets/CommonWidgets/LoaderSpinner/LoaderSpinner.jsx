import React from 'react'
import {Spinner, Box} from '@chakra-ui/react'
import Styles from './loaderSpinner.module.css'

const LoaderSpinner = () => {
    return (
        <>
            <Box className={Styles.spinnerContainer}>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                    className={Styles.spinner}
                />
            </Box> 
        </>
    )
}

export default LoaderSpinner