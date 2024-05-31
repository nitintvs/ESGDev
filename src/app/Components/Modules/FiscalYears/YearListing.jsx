import {React, useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import API from '../../../Services/API'
import Styles from './yearlisting.module.css'
import { Heading, Card, Box,} from '@chakra-ui/react'
import DeleteYear from './DeleteYear/DeleteYear'
import NewPopup from '../../../Pages/Portfolio/FiscalYears/Years/NewPopup/NewPopup';
const YearListing = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [fiscalYearsList, setFiscalYearsList] = useState()
    const {id} = useParams();
    const {name} = useParams();

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        API.get(`/fiscal-year/`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setFiscalYearsList(response.data.results)
        })
    },[])

    const getUpdatedList = (yearList) =>{
        setFiscalYearsList(yearList)
    }

    return (
        <>
            {
                props.editable ? <NewPopup  fieldId={props.fieldId} getUpdatedList={getUpdatedList} getAddedMessage={props.getAddedMessage} /> : null
            }
            {
                fiscalYearsList && fiscalYearsList.map((year, index) => 
                    <>
                        <Box mb={'30px'}>
                            {
                                props.editable ?
                                    <DeleteYear id={year.id} title={year.name} getUpdatedList={getUpdatedList} getMessage={props.getMessage} />
                                : null
                            }
                            <Link className={Styles.customLinkButton} to={`/portfolio/fy/${id}/${name}/yeargoal/${year.id}/${year.name}`}>
                                <Card height='100px' bg='white' position={'relative'} cursor={'pointer'} key={index} id={year.id} overflow={'hidden'} title={year.name}>
                                    <Heading 
                                        as='h1' 
                                        size='sm' 
                                        noOfLines={1} 
                                        position={'relative'} 
                                        top={'50%'} 
                                        className={Styles.verticalAlign}
                                        textAlign={'center'}
                                    >
                                        {year.name}
                                    </Heading>
                                </Card>
                            </Link>
                        </Box>
                    </>
                )
            }            
        </>
    )
}

export default YearListing
