import React from 'react'
import { Image, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
const Banner = (props) => {
    return (
        <>
            <Card maxH={'350px'} overflow={'hidden'}>
                {
                    props.ImageUrl != null ? <Image src={props.ImageUrl} alt='Green double couch with wooden legs' borderRadius='lg' /> : null
                }
            </Card>
        </>
    )
}

export default Banner