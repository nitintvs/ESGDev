import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import $ from 'jquery'
import API from '../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import Styles from './viewaction.module.css'
import {Card, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image} from '@chakra-ui/react'
import Breadcrumb from '../../../../Components/Widgets/BreadCrumbs/BreadCrumbs'
import Banner from './Banner/Banner';
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import ActionTabs from './ActionTabs/ActionTabs';
import QuarterlyReporting from './QuarterlyReporting/QuarterlyReporting';
import { EditContext } from "../../../../Context/BreadcrumbsContext";

const ViewAction = () => {
  const token = window.localStorage.getItem("accessToken")
  const [isLoading, setIsLoading]  = useState(true)
  const [editable, setEditable] = useState();
  const [action, setAction] = useState();
  const {actionid} = useParams();
  const editor = useRef(null);
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const [actionPillarId, setActionPillarId] = useState();
  const {edit, setEdit } = useContext(EditContext);

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
    setIsLoading(true)
    API.get(`/pillar?module_id=${actionid}`)
    .then((response) => {
      setAction(response.data)
      setActionPillarId(response.data.id)
      setIsLoading(false)
    })
  },[actionid])

  const updateArticle = () =>{
    setIsLoading(true)
    const formData = new FormData()
    if(file != null){
        formData.append('banner', file)
    }
    formData.append('id', parseInt(action && action.id))
    formData.append('description', $("#description").val())
    formData.append('name', $("#title").val())
    API.put(`/pillar`, formData, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      setAction(response.data.results)
      API.get(`/pillar?module_id=${actionid}`)
      .then((response) => {
        setAction(response.data)
        const formData1 =  new FormData()
        formData1.append('id', actionid)
        formData1.append('name', $("#title").val())
        API.put(`/project-modules`, formData1, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
          API.get(`/pillar?module_id=${actionid}`)
          .then((response) => {
            setAction(response.data)
            setActionPillarId(response.data.id)
            setIsLoading(false)
          })

        })
      })
      
    })




  }

  const geteditStatus = (isEdit) =>{
    setEditable(isEdit)
  }

  function bannerUpload(e) {
    setFile(e.target.files[0]);
  }


  return (
    <>
      { 
        isLoading ? <LoaderSpinner />: null
      }
      <Breadcrumb geteditStatus={geteditStatus} title={action && action.name} pillarId={action && action.id} />

      <Card>
        <CardBody>
          <Box>
            {edit ? 
              <>
                <Input id={'title'} placeholder='medium size' defaultValue={action && action.name} size='md' mb={'15px'} />
                <Input type="file" onChange={bannerUpload} mb={'15px'} />
                <JoditEditor
                  id={"description"}
                  ref={editor}
                  value={action && action.description}
                  tabIndex={1} // tabIndex of textarea
                  onChange={newContent => {}}
                />
                <Button className={'globalButton'} mt={'15px'} onClick={updateArticle}> Update Action </Button>
              </> : 
              <>
                <Heading as='h2' size='lg' mb={'25px'}>
                  {action && action.name}
                </Heading>
                {/* <Banner /> */}
                <Image
                  src={action && action.banner}
                  width={'100%'}
                  alt={action && action.name}
                  borderRadius='lg'
                />
                
              </>
            }
          </Box>
        </CardBody>
      </Card>
      <ActionTabs 
        actionPillarId={actionPillarId} 
        description={action && action.description}
        editable={edit}
      />
      <QuarterlyReporting
        actionPillarId={actionPillarId} 
        description={action && action.description}
        editable={edit}
      />
    </>
  )
}

export default ViewAction