import React from 'react'
import { Text, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

const InfoComponent = () => {
    return (
        <Card mb={'10px'} backgroundColor={'#17a2b8'} color={"#ffffff"} width={'100%'}>
            <CardBody>
                <Text lineHeight={'normal'} mb={'0'} fontSize={'15px'} fontWeight={'500'}>
                    We didn't find anything in this section
                </Text>
            </CardBody>
        </Card>
    )
}

export default InfoComponent