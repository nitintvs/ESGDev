import React from 'react'
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button} from '@chakra-ui/react'

const Banner = (props) => {
    return (
        <>
            <Image
                src={props.banner}
                width={'100%'}
                alt={props.alt}
                borderRadius='lg'
            />
        </>
    )
}

export default Banner