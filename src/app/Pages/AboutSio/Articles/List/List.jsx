import {React, useEffect, useState} from 'react'
import Styles from './list.module.css'
import { Link, useParams } from 'react-router-dom';
import { Heading, Card, Box,} from '@chakra-ui/react'
import DeleteArticle from './DeleteArticle/DeleteArticle';
const List = (props) => {
    const {name} = useParams();
    const {id} = useParams();
    
    return (
        <>
            <Box mb={'30px'}>
                {
                    props.editable ?
                        <DeleteArticle id={props.id} title={props.article_name} getUpdated={props.getUpdated} getUpdatedMessage={props.getUpdatedMessage} />
                    : null
                }
                <Link className={props.editable ? Styles.customLinkButtonEdit : Styles.customLinkButton} to={`/help/asio/${id}/${name}/article/${props.id}/${props.article_name}`}>
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
                            {props.article_name}
                        </Heading>
                    </Card>
                </Link>
            </Box>
        </>
    )
}

export default List