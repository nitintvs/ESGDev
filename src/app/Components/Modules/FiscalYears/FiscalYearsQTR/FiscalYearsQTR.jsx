import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import API from '../../../../Services/API';
import Styles from './fiscalyearsqtr.module.css'
import { Heading, Card, Box,} from '@chakra-ui/react'
import DeleteYear from './DeleteYear/DeleteYear'
import InfoComponent from '../../../../Components/Widgets/CommonWidgets/Info/InfoComponent'
const FiscalYearsQTR = (props) => {
    const [fiscalYearsQTRList, setFiscalYearsQTRList] = useState()
    const {id} = useParams();
    const {name} = useParams();
    const {yearid} = useParams();
    const {yearname} = useParams();
    
    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        const token = window.localStorage.getItem("accessToken")
        API.get(`/fiscal-year-quarter/?fiscal_year=${yearid}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setFiscalYearsQTRList(response.data.results)
            props.getCount(response.data.results.length)
        })
    },[])

    return (
        <>
            {
                fiscalYearsQTRList && fiscalYearsQTRList.map((year, index) =>
                    <Box>
                        <Link className={Styles.customLinkButton}
                            to={`/portfolio/fy/${id ? id + '/': ''}${name ? name + '/': ''}yeargoal/${props.fiscal_year_id}/${props.fiscal_year}/qtr/${year.id}/${year.name}`}>
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
                        {
                            props.editable ?
                                <DeleteYear id={year.id} title={year.name} />
                            : null
                        }
                    </Box>
                )
            }        
        </>
    )
}

export default FiscalYearsQTR
