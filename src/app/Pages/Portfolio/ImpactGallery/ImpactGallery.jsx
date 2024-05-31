import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from 'jquery'
import Styles from './impactgallery.module.css'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import API from '../../../Services/API'
import BreadCrumbs from '../../../Components/Widgets/BreadCrumbs/BreadCrumbs'
import { Heading, SimpleGrid, Card, CardHeader, Image, CardBody, Stack, StackDivider, Text, Box, Button} from '@chakra-ui/react'
import { Input, useDisclosure, Textarea, CardFooter, Select} from '@chakra-ui/react'
import { FormControl, FormLabel, Switch  } from '@chakra-ui/react'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import PlaceholderImg from '../../../../assets/images/placeholder-1.png'
import LoaderSpinner from '../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'
import PageInfo from './PageInfo/PageInfo';
import DeleteBlog from './DeleteBlog/DeleteBlog';
import BreadCrumbsNav from '../../../Components/Shared/Navbar/BreadCrumbsNav';
import { EditContext } from '../../../Context/BreadcrumbsContext';

const ImpactGallery = (props) => {
  const token = window.localStorage.getItem("accessToken")
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const editor = useRef(null);
  const [isLoading, setIsLoading]  = useState(false)
  const [editable, setEditable] = useState();
  const [blogList, setBlogList] = useState();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pageTitle, setPageTitle] = useState()
  const {edit, setEdit } = useContext(EditContext);
  
  
  const {id} = useParams();
  const {name} = useParams();

  const handleChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}`);
  };

  const geteditStatus = (isEdit) =>{
    setEditable(isEdit)
  }

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
    let date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}`);



    API.get(`/blog`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      setBlogList(response.data)
    })
  },[])

  const getUpdatedList = (updatedList) =>{
    setBlogList(updatedList)
  }
  const getDeleteMessage = (updatedList) =>{
    setDeleteMessage(updatedList)
    setMessage(false)
  }

  

  if (!blogList || !Array.isArray(blogList)) {
    return <LoaderSpinner />
  }

  const sortedData = blogList && blogList.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  const groupedData = sortedData && sortedData.reduce((acc, curr) => {
    const date = curr.date || 'Gallery with no Date'; // Handle null or undefined dates
    acc[date] = acc[date] || [];
    acc[date].push(curr);
    return acc;
  }, {});

  const openSlidingPane = () => {
    setState({ isPaneOpen: true })
  }

  function bannerUpload(e) {
    setFile(e.target.files[0]);
  }

  const createBlog = () => {
    setIsLoading(true)
    const formData = new FormData()
    if(file != null){
      formData.append('cover_image', file)
    }
    formData.append('title', $("#blogTitle").val())
    formData.append('content', $("#blogContent").val())
    formData.append('date', selectedDate)
    API.post(`/blog`,formData , {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => {
      API.get(`/blog`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then((response) => {
        setState({ isPaneOpen: false });
        setBlogList(response.data)
        setIsLoading(false)
        setMessage(true)
        setDeleteMessage(false)
      })
    })
  }

  const mainHeading = (getHeading) =>{
    setPageTitle(getHeading)
  }

  return (
    <>
      {isLoading ? <LoaderSpinner />: null}
      <BreadCrumbs geteditStatus={geteditStatus} title={pageTitle !== null ? pageTitle : 'Impact Gallery'} />
      <PageInfo editable={edit} mainHeading={mainHeading} />
      {edit ? <Button className={Styles.addBlogButton} onClick={openSlidingPane}> Add Blog </Button> : null}
      <Box className={Styles.clearfix}></Box>
      {
        message ? 
          <Box className={Styles.successMessage}> Created Impact Gallery successfully  </Box> 
        : deleteMessage ? <Box className={Styles.successMessage}> Deleted Impact Gallery successfully  </Box> 
        : null
      }
      <Stack divider={<StackDivider />} spacing='4'>
        {
          Object.entries(groupedData && groupedData).map(([date, entries]) => (
            <Box key={date}>
              <Heading size='xs' textTransform='uppercase'>
                {date}
              </Heading>
              <SimpleGrid columns={[1, 2, 3, 5]} spacing='20px' mt={'10px'}>
                {
                  entries.map((item, index) => (
                    <Box key={index}>
                      {edit ? <DeleteBlog id={item.id} getUpdatedList={getUpdatedList} getDeleteMessage={getDeleteMessage} /> : null }
                      <Link className={Styles.customLinkButton} to={`/portfolio/ig/${id}/${name}/viewpost/${item.id}/${item.title}`}>
                        <Card maxW='sm'>
                          <CardBody p={0}>
                            <Image
                              src={item.cover_image !== null ? item.cover_image : PlaceholderImg}
                              alt='Green double couch with wooden legs'
                              borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                              <Heading size='sm' p={'0 10px'} className={Styles.listHeading}>{item.title}</Heading>
                            </Stack>
                          </CardBody>
                        </Card>
                      </Link>
                    </Box>
                  ))
                }
              </SimpleGrid>
            </Box>
          ))
        }
      </Stack>
      <SlidingPane
                className={Styles.slidingPane}
                overlayClassName="some-custom-overlay-class"
                isOpen={state.isPaneOpen}
                title="Create Blog"
                subtitle=""
                width="50%"
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setState({ isPaneOpen: false });
                }}
            >
                <SimpleGrid columns={[1]} spacing='20px' mt={'10px'}>
                    <Box>
                      <FormControl>
                          <FormLabel>Name </FormLabel>
                          <Input type='text' id={'blogTitle'} mb={'15px'} />
                      </FormControl>
                      <FormControl mb={'15px'}>
                        <FormLabel>Upload banner image</FormLabel>
                        <Input type="file" onChange={bannerUpload}  padding={"4px"} />
                      </FormControl>
                      <FormControl mb={'15px'}>
                        <FormLabel>Select Date</FormLabel>
                        {/* <Input type="date" id='blogDate' pattern="\d{4}-\d{2}-\d{2}" value={selectedDate} onChange={handleChange} /> */}
                        <DatePicker selected={startDate} onChange={handleChange} dateFormat="yyyy-MM-dd" placeholderText="YYYY-MM-DD"/>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>   
                        <FormLabel> Content </FormLabel>
                          <JoditEditor
                            id={"blogContent"}
                            ref={editor}
                            tabIndex={1} // tabIndex of textarea
                            onChange={newContent => {}}
                        />
                        <Button colorScheme='blue' onClick={createBlog} mt={'20px'} float={'right'}>Create Blog</Button>
                      </FormControl>
                    </Box>
                </SimpleGrid>
                
            </SlidingPane>
    </>
  )
}

export default ImpactGallery