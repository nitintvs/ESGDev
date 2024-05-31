import React from 'react'
import { useParams } from 'react-router-dom'
import Styles from './actionList.module.css'
import { Link } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons'
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button, Badge} from '@chakra-ui/react'
import PlaceholderImg from '../../../../../assets/images/placeholder-1.png'
import DeleteAction from './DeleteAction/DeleteAction';
const ActionsList = (props) => {
    const {id} = useParams();
    const {name} = useParams();
    
    return (
        <>
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                {
                    props.editable ? <DeleteAction id={props.id} getUpdated={props.getUpdated} getMessage={props.getMessage} /> : null
                }
                <Link className={props.editable ? Styles.customLinkButtonEdit : Styles.customLinkButton} to={`/pillar/${id}/${name}/${props.module}/${props.name}`}>
                    <Image src={props.banner !== null ? props.banner  : PlaceholderImg} alt={props.name} height={'89px'} width={'100%'} />
                    <Box p='3'>
                        <Box
                            mt='1'
                            fontWeight='semibold'
                            as='h5'
                            lineHeight='tight'
                            noOfLines={2}
                            className={Styles.fontSec}
                        >
                            {props.name}
                        </Box>
                    </Box>
                </Link>
            </Box>
        </>
    )
}

export default ActionsList