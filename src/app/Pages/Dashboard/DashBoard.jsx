import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import $ from 'jquery'
import API from '../../Services/API';
import { Link, useLocation } from 'react-router-dom';
import Styles from './dashboard.module.css'
import './dashboard.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BreadCrumbs from '../../Components/Widgets/BreadCrumbs/BreadCrumbs';
import MainBannerEdit from './MainBanner/MainBannerEdit';
import {Heading, SimpleGrid, Box, FormControl, Switch, Card, CardHeader, CardBody, CardFooter, Image, Text, Input, Button,Wrap,WrapItem, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import Metrics from './Metrics/Metrics';
import LoaderSpinner from '../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import { FormLabel } from 'react-bootstrap';
import BannerSlider from '../../Components/Widgets/BannerSlider/BannerSlider';

import SioTabs from "./SIoTabs/SioTabs";
import MetricDashboard from "./Metrics/MetricDashboard/MetricDashboard";
import BreadCrumbsNav from "../../Components/Shared/Navbar/BreadCrumbsNav";
import { EditContext } from "../../Context/BreadcrumbsContext";

const DashBoard = () => {
  const token = window.localStorage.getItem("accessToken")
  const [isLoading, setIsLoading]  = useState(false)
  const [editable, setEditable] = useState();
  const [menuList, setMenuList] = useState()
  const [opsMetrics, setOpsMetrics] = useState()
  const [financialMetrics, setFinancialMetrics] = useState()
  const [sioInfo, setSioInfo] = useState()
  const [banner, setBanner] = useState(null)
  const editor = useRef(null);
  const [description, setDescription] = useState()
  const [title, setTitle] = useState()
  const [pillars, setPillars] = useState()
  const [metricData, setMetricData] = useState()
  const [metricChart, setMetricChart] = useState()
  const [bannerImages, setBannerImages] = useState()
  const [bannerLength, setBannerLength] = useState()
  const [team, setTeam] = useState()
  const [tabs, setTabs] = useState()
  const [pillarActions, setPillarActions] = useState()
  const {edit, setEdit } = useContext(EditContext);

  const geteditStatus = (isEdit) =>{
    setEditable(isEdit)
  }

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
    setIsLoading(true)
    API.get(`/about-article/`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      setBannerImages(response.data.results)
      setBannerLength(response.data.count)
    })

    API.get(`/pillar-team`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      setTeam(response.data)
    })

    API.get(`/website-info?id=3`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      setBanner(response.data.banner)
    })
    
    API.get(`/project-modules`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response=>{
      setMenuList(response.data)
    })
    
    API.get(`/sio-pillar`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response=>{
        setPillars(response.data)
        $('.subMenuNew:empty').remove()
        $('.subMenuNew').closest('li').addClass('acordian')
        API.get(`/metric?query=operational`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response1=>{
          setOpsMetrics(response1.data)
        })

        API.get(`/metric?query=financial`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response2=>{
          setFinancialMetrics(response2.data)
        })
        
    }).catch(error => {
        if(error.response.data.code === 'token_not_valid'){
            window.localStorage.removeItem('accessToken')
            window.localStorage.removeItem('refreshToken')
            window.localStorage.removeItem('user')
            window.location.href = '/login'
        }
    });

    API.get(`/sio-info/`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response=>{
      setSioInfo(response.data.results[0])
      setIsLoading(false)
      setTabs(response.data.results[0])
    })

    API.get(`/metric-dashboard`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      setMetricData(response.data.metric_data)
      setMetricChart(response.data.metric_chart)
    })

    API.get(`/get-pillar-action`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response=>{
      setPillarActions(response.data && response.data[0])
    })

  },[]);

  const getUpdatedBanner = (banner) =>{
    setBanner(banner)
  }

  const updateSIOInfo = () =>{
    setIsLoading(true)
    const formData = new FormData()

    formData.append('prop_label', $("#prop_label").val())
    formData.append('description', $("#description").val())
    formData.append('id', sioInfo && sioInfo.id)

    API.put(`/sio-info/`, formData, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response=>{
      API.get(`/sio-info/`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response=>{
        setSioInfo(response.data.results[0])
        setIsLoading(false)
      })
    })
  }

  const getUpdatedSlider = (sliderNew) =>{
    setBannerImages(sliderNew)
  }


  return (
    <>
      {isLoading ? <LoaderSpinner /> : null}
      <BreadCrumbs geteditStatus={geteditStatus} title={'Dashboard'} />
      {
        !edit ? 
          <div>
            {banner !== null ? <Image src={banner && banner} className="" alt="circle" width={'100%'} mb={'15px'} borderRadius={'10px'} />:null } 
          </div>
        : <MainBannerEdit banner={banner && banner} getUpdatedBanner={getUpdatedBanner} />
      }
      
      <BannerSlider bannerImages={bannerImages} editable={editable} getUpdatedSlider={getUpdatedSlider} bannerLength={bannerLength} />

      <div className='row'>
        <div className='col-md-12'>
          <div className='card card-img-holder text-white mb-3'>
            <div className="card-body">
              <SioTabs editable={edit} />
            </div>
          </div>
        </div>
      </div>
      <Heading className={Styles.cardTitle}>SIO Organization</Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing='0px' mt={'10px'}>
        {
          pillars && pillars.map((list, index) =>
            <Box mb={'0px'} padding={'0'}>
              <Link className={'nav-link' } to={`/pillar/${list.module}/${list.name}`} color='#007bff'>
                <Card className={Styles.signleBox}>
                  <Image
                    objectFit='cover'
                    src={list.banner}
                    alt={list.name}
                    maxH={'88.26px'}
                  />
                  <CardBody color='#00AAE0'>
                    <Text as={'span'} className={Styles.bold600}>{list.name}</Text>
                  </CardBody>
                </Card>
              </Link>
            </Box>
          )
        }
      </SimpleGrid>
      <MetricDashboard pillars={pillars && pillars} />
    </>  
  )
}

export default DashBoard
