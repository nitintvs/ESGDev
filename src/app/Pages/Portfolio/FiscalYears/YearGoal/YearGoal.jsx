import {React, useContext, useEffect, useState} from 'react'
import API from '../../../../Services/API';
import { SimpleGrid} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import BreadCrumbs from '../../../../Components/Widgets/BreadCrumbs/BreadCrumbs';
import YearListing from '../../../../Components/Modules/FiscalYears/YearListing';
import NewPopup from './NewPopup/NewPopup';
import FiscalYearsQTR from '../../../../Components/Modules/FiscalYears/FiscalYearsQTR/FiscalYearsQTR';
import MetricData from '../../../../Components/Modules/FiscalYears/FiscalYearsQTR/MetricData/MetricData';
import InfoComponent from '../../../../Components/Widgets/CommonWidgets/Info/InfoComponent'
import SelectedYearInfo from './SelectedYearInfo/SelectedYearInfo';
import BreadCrumbsNav from '../../../../Components/Shared/Navbar/BreadCrumbsNav';
import { EditContext } from '../../../../Context/BreadcrumbsContext';

const YearGoal = () => {
    const token = window.localStorage.getItem("accessToken")
    const [selectedYearInfo, setSelectedYearInfo] = useState()
    const [editable, setEditable] = useState(false)
    const [fiscalYearsList, setFiscalYearsList] = useState()
    const {id} = useParams();
    const {yearid} = useParams();
    const {name} = useParams();
    const {yearname} = useParams();
    const [count, setCount] = useState()
    const {edit, setEdit } = useContext(EditContext);

    useEffect(()=>{
        document.documentElement.scrollTo(0, 0);
        API.get(`/fiscal-year/?id=${yearid}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setSelectedYearInfo(response.data.results?.[0])
        })
    },[])

    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }

    const getCount = (count) =>{
        setCount(count)
    }

    const getUpdated = (updatedInfo) => {
        setSelectedYearInfo(updatedInfo)
    }
    //response.data.results?.[0]

    return (
        <>
            <BreadCrumbs geteditStatus={geteditStatus} title={selectedYearInfo && selectedYearInfo.name} />
            {
               count === 0 && edit === false ? <InfoComponent /> : null
            }
            <SelectedYearInfo editable={edit} selectedYearInfo={selectedYearInfo} fieldId={yearname} getUpdated={getUpdated} />
            <SimpleGrid columns={[1, 2, 3, 5]} spacing='20px' mt={'10px'}>
                <>
                    {
                        edit ? <NewPopup fiscal_year={yearid} /> : null
                    }
                    
                    <FiscalYearsQTR editable={edit} fiscal_year_id={yearid} fiscal_year={yearname} getCount={getCount} />
                </>
            </SimpleGrid>
            <MetricData />
        </>
    ) 
}

export default YearGoal
