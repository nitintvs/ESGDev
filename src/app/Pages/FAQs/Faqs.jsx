import React, { useContext, useEffect, useState } from 'react'
import API from '../../Services/API';
import { Text, Heading, Stack, Image, Spinner } from '@chakra-ui/react'
import Styles from './faqs.module.css'
import BreadCrumbs from '../../Components/Widgets/BreadCrumbs/BreadCrumbs'
import PageInfo from './PageInfo/PageInfo';
import FaqList from './FaqList/FaqList';
import Form from './Form/Form';
import LoaderSpinner from '../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import InfoComponent from '../../Components/Widgets/CommonWidgets/Info/InfoComponent';
import BreadCrumbsNav from '../../Components/Shared/Navbar/BreadCrumbsNav';
import { EditContext } from '../../Context/BreadcrumbsContext';

const Faqs = () => {
    const token = window.localStorage.getItem("accessToken")
    const [editable, setEditable] = useState();
    const [isLoading, setIsLoading]  = useState(true)
    const [faqInfo, setFaqInfo]  = useState()
    const [faqInfoLength, setFaqInfoLength]  = useState(0)
    const [count, setCount] = useState(1);
    const {edit, setEdit } = useContext(EditContext);

    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        API.get(`/faq-info/`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            if(response.status === 200){
                setFaqInfo(response.data.results && response.data.results[0])
                setFaqInfoLength(response.data.count)
                setIsLoading(false)
            }
        })
    },[]);

    const getUpdateAbout = (getUpdateAboutInfo) =>{
        setFaqInfo(getUpdateAboutInfo.data.results[0])
        setFaqInfoLength(getUpdateAboutInfo.data.count)
    }

    return (
        <>
            {isLoading ? <LoaderSpinner />: null}
            <BreadCrumbs geteditStatus={geteditStatus} title={faqInfo && faqInfo.prop_label} />
            {
                ((!edit) && (faqInfoLength < 1)) ? <InfoComponent /> : null
            }
            {
                edit ? 
                    <Form faqInfo={faqInfo} faqInfoLength={faqInfoLength} getUpdateAbout={getUpdateAbout} /> 
                : <PageInfo faqInfo={faqInfo} />
            }
            <>
                <FaqList editable={edit} faqInfo={faqInfo} />
            </>
        </>
    )
}

export default Faqs