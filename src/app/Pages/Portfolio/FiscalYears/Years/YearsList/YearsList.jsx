import {React, useEffect, useState} from 'react'
import Styles from './yearlist.module.css'
import { SimpleGrid, Box} from '@chakra-ui/react'
import NewPopup from '../NewPopup/NewPopup'
import YearListing from '../../../../../Components/Modules/FiscalYears/YearListing'

const YearsList = (props) => {
    const [addedMessage, setAddedMessage] = useState(false)
    const [deletedMessage, setDeletedMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const getDeletedMessage = (updatedMessage) =>{
        setDeletedMessage(updatedMessage)
        setAddedMessage(false)
    }

    const getAddedMessage = (updatedMessage) =>{
        setDeletedMessage(false)
        setAddedMessage(updatedMessage)
    }
    return (
        <>
            {
                addedMessage ?
                    <Box className='successInfoNew'>
                        Added fiscal year successfully
                    </Box>
                : deletedMessage ? 
                    <Box className='successInfoNew'>
                            Deleted fiscal year successfully
                    </Box>
                : null
            }
            
            <SimpleGrid columns={[1, 2, 3, 5]} spacing='20px' mt={'10px'}>
                <YearListing editable={props.editable} fieldId={props.fieldId} getAddedMessage={getAddedMessage} getMessage={getDeletedMessage} />
            </SimpleGrid>
        </>
    )
}

export default YearsList
