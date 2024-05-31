import React, { useContext, useEffect, useState } from "react";
import API from "../../Services/API";
import BreadCrumbs from '../../Components/Widgets/BreadCrumbs/BreadCrumbs'
import Form from "./Form/Form";
import Info from "./Info/Info";
import InfoComponent from '../../Components/Widgets/CommonWidgets/Info/InfoComponent'
import Article from "./Articles/Article";
import LoaderSpinner from "../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner";
import { EditContext } from "../../Context/BreadcrumbsContext";


const AboutSio = () => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(true)
    const [editable, setEditable] = useState();
    const [info, setInfo] = useState();
    const [count, setCount] = useState();
    const {edit, setEdit } = useContext(EditContext);

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        API.get(`/about-info/`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setInfo(response.data.results[0])
            setCount(response.data.results.length)
            setIsLoading(false)
        })
    },[])

    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }
    
    const getUpdateAbout = (getUpdateAboutInfo) =>{
        setInfo(getUpdateAboutInfo.data.results[0])
        setCount(getUpdateAboutInfo.data.results.length)
    }

    return (
        <>
            {isLoading ? <LoaderSpinner />: null}
            <BreadCrumbs geteditStatus={geteditStatus} title={info && info.prop_label} />
            {
                edit ? 
                    <Form info={info} count={count}  getUpdateAbout={getUpdateAbout} /> 
                : 
                <>
                    {
                        count && count ? <Info info={info} /> : 
                        <InfoComponent />
                    }
                </>
            }
            <Article id={info && info.id} editable={edit} count={count} />
        </>
    )
}

export default AboutSio