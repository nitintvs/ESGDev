import React, {useEffect} from 'react'
import Styles from './listItem.module.css'
import { Link } from 'react-router-dom';
import { Heading, Card, Box,} from '@chakra-ui/react'
import DeleteFaq from './DeleteFaq/DeleteFaq';

const ListItem = (props) => {
    return (
        <>
            <Box mb={'30px'}>
                {
                    props.editable ?
                        <DeleteFaq id={props.id} title={props.faqName} getUpdated={props.getUpdated} />
                    : null
                }
                <Link className={props.editable ? Styles.customLinkButtonEdit : Styles.customLinkButton} to={`/help/faqs/${props.id}/${props.faqName}`}>
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
                            {props.faqName}
                        </Heading>
                    </Card>                    
                </Link>
            </Box>
        </>
    )
}

export default ListItem