import {React, useContext, useEffect, useState} from 'react'
import API from '../../../Services/API';
import BreadCrumbs from '../../../Components/Widgets/BreadCrumbs/BreadCrumbs'
import TopSection from './TopSection/TopSection';
import YearsList from './Years/YearsList/YearsList';
import InfoComponent from '../../../Components/Widgets/CommonWidgets/Info/InfoComponent'
import LoaderSpinner from '../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import BreadCrumbsNav from '../../../Components/Shared/Navbar/BreadCrumbsNav';
import { EditContext } from '../../../Context/BreadcrumbsContext';

const FiscalYears = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(true)
    const [editable, setEditable] = useState(false)
    const [fieldId, setFieldId] = useState()
    const [fiscalYearInfo, setFiscalYearInfo] = useState()
    const [count, setCount] = useState()
    const {edit, setEdit } = useContext(EditContext);

    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        API.get(`/fiscal-year-info/`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setFiscalYearInfo(response.data.results)
            setFieldId(response.data.results[0]?.id)
            setCount(response.data.results.length)
            setIsLoading(false)
        })
    },[])

    return (
        <>
            {isLoading ? <LoaderSpinner />: null}
            <BreadCrumbs geteditStatus={geteditStatus} title={fiscalYearInfo && fiscalYearInfo[0]?.prop_label} />
            {
                ((count < 1) && edit === false) ?
                    <InfoComponent />
                : null
            }
            <TopSection 
                editable = {edit}
                fieldId={fieldId}
                fiscalYearInfo ={fiscalYearInfo}
                count={count}
            />
            <YearsList
                editable = {edit}
                fieldId={fieldId}
                fiscalYearInfo ={fiscalYearInfo}
                count={count}
            />
        </>
    )
}

export default FiscalYears
