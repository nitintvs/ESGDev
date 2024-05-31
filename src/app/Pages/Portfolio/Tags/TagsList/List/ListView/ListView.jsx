import React, { useContext, useEffect, useState } from "react";
import $ from 'jquery'
import Styles from './listview.module.css'
import { Link } from 'react-router-dom';
import API from "../../../../../../Services/API";
import { useParams } from 'react-router-dom'
import BreadCrumbs from "../../../../../../Components/Widgets/BreadCrumbs/BreadCrumbs";
import LoaderSpinner from "../../../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner";
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button, SimpleGrid, Stack} from '@chakra-ui/react'
import PlaceholderImg from '../../../../../../../assets/images/placeholder-1.png'
import DeleteBlog from "../../../../ImpactGallery/DeleteBlog/DeleteBlog";
import BreadCrumbsNav from "../../../../../../Components/Shared/Navbar/BreadCrumbsNav";
import { EditContext } from "../../../../../../Context/BreadcrumbsContext";
const ListView = () => {
  document.documentElement.scrollTo(0, 0);
  const token = window.localStorage.getItem("accessToken")
  
  const {edit, setEdit } = useContext(EditContext);
  const [isLoading, setIsLoading] = useState(false)
  const {id} = useParams();
  const {name} = useParams();
  const {tagid} = useParams();
  const {tagname} = useParams();
  const [editable, setEditable] = useState();
  const [blogList, setBlogList] =  useState();
  const [count, setCount] =  useState();
  const [message, setMessage] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState(false)
  const [pageTitle, setPageTitle] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    API.get(`/tag-detail/?id=${tagid}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      setPageTitle(response.data.results[0].name)
      API.get(`/get-blog?tag_id=${tagid}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then((response) => {
        setBlogList(response.data)
        setIsLoading(false)
      })  
    })
  },[])

  const getUpdatedList = (updatedList) =>{
    setBlogList(updatedList)
  }

  const getDeleteMessage = (updatedList) =>{
    setDeleteMessage(updatedList)
    setMessage(false)
  }

  const geteditStatus = (isEdit) =>{
    setEditable(isEdit)
  }

  const updateTag = () =>{
    setIsLoading(true)
    const formData = new FormData()
    formData.append('id', parseInt(tagid))
    formData.append('name', $('#listview_tagName').val())

    API.put(`/tag-detail/`,formData , {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      API.get(`/tag-detail/?id=${tagid}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then((response) => {
        setPageTitle(response.data.results[0].name)
        setMessage(true)
        setIsLoading(false)
      })
    })
  }

  return (
    <>
      { 
        isLoading ? <LoaderSpinner />: null
      }
      <BreadCrumbs geteditStatus={geteditStatus} title={pageTitle && pageTitle}/>
      {
        message ? <Box className="successInfoNew"> Updated page title successfully </Box> : null
      }
      {
        edit ? 
          <Card>
            <CardBody>
              <Input defaultValue={tagname} id={'listview_tagName'} />
              <Button className={Styles.save} onClick={updateTag}> Save </Button>
            </CardBody>
          </Card>
        :null
      }
      {
        deleteMessage ? <Box className="successInfoNew"> Deleted Impact Gallery successfully  </Box> : null
      }
      {
        count === 0 ? <Box className="successInfoNew"> There are no Blog (s) assigned to this tag yet. </Box> : null
      }

<SimpleGrid columns={[1, 2, 3, 5]} spacing='20px' mt={'10px'}>
        {
          blogList && blogList.map((item, index) => 
            <Box key={index}>
              {edit ? <DeleteBlog id={item.id} getUpdatedList={getUpdatedList} getDeleteMessage={getDeleteMessage} /> : null }
              <Link className={edit ? Styles.customLinkButtonEdit : Styles.customLinkButton} to={`${item.id}/${item.title}`}>
                <Card maxW='sm'>
                  <CardBody p={0}>
                    <Image
                      src={item.cover_image !== null ? item.cover_image : PlaceholderImg}
                      alt={item.title}
                      borderRadius='lg'
                      w={'100%'}
                      className={Styles.blogImage}
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='sm' p={'0 10px'} className={Styles.listHeading}>{item.title}</Heading>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
            </Box>
          )
        }
      </SimpleGrid>


    </>
  )
}

export default ListView
