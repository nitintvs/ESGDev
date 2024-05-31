import React from 'react'
import Styles from './list.module.css'
import { Link, useParams } from 'react-router-dom';
import { Heading, Card, Box,} from '@chakra-ui/react'
import DeleteTag from '../DeleteTag/DeleteTag';

const List = (props) => {
    const {id} = useParams();
    const {name} = useParams();

    return (
        <>
            <Box mb={'30px'}>
                {
                    props.editable ?
                        <DeleteTag id={props.id} title={props.tagName} getUpdatedDelete={props.getUpdatedDelete} />
                    : null
                }
                <Link className={props.editable ? Styles.customLinkButtonEdit : Styles.customLinkButton} to={`/portfolio/tg/${id}/${name}/${props.id}/${props.tagName}`}>
                    <Card height='100px' bg='white' position={'relative'} cursor={'pointer'} key={props.key} id={props.id} overflow={'hidden'} title={props.article_name}>
                        <Heading 
                            as='h1' 
                            size='sm' 
                            noOfLines={2} 
                            position={'relative'} 
                            top={'50%'} 
                            className={Styles.verticalAlign}
                            textAlign={'center'}
                        >
                            {props.tagName}
                        </Heading>
                    </Card>
                </Link>
            </Box>
        </>
    )
}

export default List





