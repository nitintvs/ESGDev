import {React, useContext, useEffect, useState} from 'react'
import Styles from './tags.module.css'
import API from '../../../Services/API'
import Breadcrumb from '../../../Components/Widgets/BreadCrumbs/BreadCrumbs'
import Form from './Form/Form'
import PageInfo from './PageInfo/PageInfo'
import InfoComponent from '../../../Components/Widgets/CommonWidgets/Info/InfoComponent'
import LoaderSpinner from '../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'
import TagsList from './TagsList/TagsList'
import { EditContext } from '../../../Context/BreadcrumbsContext'

const Tags = () => {
    document.documentElement.scrollTo(0, 0);
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(true)
    const [editable, setEditable] = useState();
    const [pageInfo, setPageInfo] = useState();
    const [count, setCount] = useState(1);
    const { edit, setEdit } = useContext(EditContext);
    
    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }

    useEffect(() => {
        API.get(`/tag-info/`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            if(response.status === 200){
                setPageInfo(response.data.results[0])
                setIsLoading(false)
                setTimeout(() => {
                    if(response.data.results.length < 1){
                        setCount(response.data.results.length)
                    }
                }, "1500");
            }
        })
    },[])

    const getUpdateStatus = (updatedData) => {
        setPageInfo(updatedData)
    }

    return (
        <>
            {isLoading ? <LoaderSpinner />: null}
            <Breadcrumb geteditStatus={geteditStatus} title={pageInfo && pageInfo.prop_label} />
            {
                edit ? <Form pageInfo={pageInfo} count={count} getUpdateStatus={getUpdateStatus} /> : 
                <>
                    {
                        count && count ? <PageInfo pageInfo={pageInfo} /> : 
                        <InfoComponent />
                    }
                </>
            }
            <TagsList id={pageInfo && pageInfo.id} editable={edit} count={count}  />
        </>
    )
}

export default Tags