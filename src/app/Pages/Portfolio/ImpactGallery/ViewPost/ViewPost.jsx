import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import $ from "jquery";
import Select from "react-select";
import Styles from "./viewpost.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import API from "../../../../Services/API";
import BreadCrumbs from "../../../../Components/Widgets/BreadCrumbs/BreadCrumbs";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Heading,
  Box,
  Image,
  Text,
  Input,
  Textarea,
  Divider,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  ButtonGroup,
  Grid,
  GridItem,
  StackDivider,
} from "@chakra-ui/react";
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Badge,
} from "@chakra-ui/react";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
import LoaderSpinner from "../../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner";

import Author from "./Author/Author";
import Date from "./Date/Date";
import Tags from "./Tags/Tags";
import Pillars from "./Pillars/Pillars";
import Actions from "./Actions/Actions";
import Regions from "./Regions/Regions";
import Countries from "./Countries/Countries";
import BreadCrumbsNav from "../../../../Components/Shared/Navbar/BreadCrumbsNav";
import { EditContext } from "../../../../Context/BreadcrumbsContext";

const ViewPost = () => {
  const token = window.localStorage.getItem("accessToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [editable, setEditable] = useState();
  const [viewPost, setViewPost] = useState();
  const { id } = useParams();
  const editor = useRef(null);
  const [file, setFile] = useState(null);
  const [blogTags, setBlogTags] = useState([]);
  const [blogPillars, setBlogPillars] = useState([]);
  const [blogActions, setBlogActions] = useState([]);
  const [blogRegions, setBlogRegions] = useState([]);
  const [blogCountries, setBlogCountries] = useState([]);
  const {edit, setEdit } = useContext(EditContext);

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
        setIsLoading(true)
        API.get(`/blog?id=${id}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setBlogTags(response.data[0].blog_tag)
            setViewPost(response.data[0])
            setBlogActions(response.data[0].blog_action)
            setBlogPillars(response.data[0].blog_pillar)
            setBlogRegions(response.data[0].blog_region)
            setBlogCountries(response.data[0].blog_country)
            setIsLoading(false)
        })
    },[])

    const geteditStatus = (isEdit) =>{
        setEditable(isEdit)
    }

    function bannerUpload(e) {
        setFile(e.target.files[0]);
    }

    const updateBlog = () =>{
        setIsLoading(true)
        const formData = new FormData()
        if(file != null){
            formData.append('cover_image', file)
        }
        formData.append('blog_id', parseInt(id))
        formData.append('title', $("#blogTitle").val())
        formData.append('content', $("#blogDescription").val())
        formData.append('author', $("#blogAuthor").val())
        formData.append('date', $("#blogDate").val())
        formData.append('value', $("#blogValue").val())
        API.put(`/blog`,formData , {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            API.get(`/blog?id=${id}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response1) => {
                setViewPost(response1.data[0])
                setIsLoading(false)
            })
        })
    }

    const getUpdated = (updatedBlog) =>{
        setIsMessage(true)
        setViewPost(updatedBlog)
        setBlogTags(updatedBlog.blog_tag)
        setBlogActions(updatedBlog.blog_action)
        setBlogPillars(updatedBlog.blog_pillar)
        setBlogRegions(updatedBlog.blog_region)
        setBlogCountries(updatedBlog.blog_country)

    }

    const postComment = (event) => {
        const formData = new FormData()
        formData.append('blog_id', parseInt(id))
        formData.append('comment', $("#blogComment").val())
        API.post(`/blog-comment`,formData , {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            API.get(`/blog-comment?blog_id=${id}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            })
            .then((response1) => {
                console.log(response1)
                //setViewPost(response1.data[0])
                setIsLoading(false)
            })
        })
    }

    return (
        <>
            { 
                isLoading ? <LoaderSpinner />: null
            }
            <BreadCrumbs geteditStatus={geteditStatus} title={viewPost && viewPost.title}/>
            {
                isMessage ? <Box className={'successInfoNew'}> Post updated successfully </Box> : null
            }
            <Grid
                templateRows='repeat(1, 1fr)'
                templateColumns='repeat(6, 1fr)'
                gap={4}
            >
                <GridItem colSpan={4}>
                    <Card maxW='100%'>
                        {
                            edit ? 
                                <>
                                    <CardBody>
                                        <FormControl mb={'15px'}>
                                            <FormLabel>Upload banner image</FormLabel>
                                            <Input type="file" onChange={bannerUpload} padding={"4px"} />
                                        </FormControl>
                                        <FormControl mb={'15px'}>
                                            <FormLabel> Title </FormLabel>
                                            <Input type="text" id='blogTitle' defaultValue={viewPost && viewPost.title} />
                                        </FormControl>
                                        <FormControl mb={'15px'}>
                                            <FormLabel> Description </FormLabel>
                                            <JoditEditor
                                                id={"blogDescription"}
                                                ref={editor}
                                                value={viewPost && viewPost.content}
                                                tabIndex={1} // tabIndex of textarea
                                                onChange={newContent => {}}
                                                className={Styles.joditeditorcustomheight}
                                            />
                                        </FormControl>
                                        <FormControl mb={'15px'}>
                                            <FormLabel> Author </FormLabel>
                                            <Input type="text" id={'blogAuthor'} defaultValue={viewPost && viewPost.author} />
                                        </FormControl>
                                        <FormControl mb={'15px'}>
                                            <FormLabel> Pick the date </FormLabel>
                                            <Input type="date" id={'blogDate'} defaultValue={viewPost && viewPost.date} />
                                        </FormControl>
                                        <FormControl mb={'15px'}>
                                            <FormLabel> Value </FormLabel>
                                            <Input type="text" id={'blogValue'} defaultValue={viewPost && viewPost.value !== null ? viewPost && viewPost.value : 0} />
                                        </FormControl>
                                        <FormControl mb={'15px'}>
                                            <Button onClick={updateBlog}  background={'#00aae0'} color={'#ffffff'}>
                                                Update
                                            </Button>
                                        </FormControl>
                                    </CardBody>    
                                </>
                            :
                            <>
                                <CardBody>
                                    {
                                        viewPost && viewPost.cover_image !== null ?
                                            <Image
                                                src={viewPost && viewPost.cover_image}
                                                alt={viewPost && viewPost.title}
                                                borderRadius='lg'
                                                width={'100%'}
                                            />
                                        : null
                                    }
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'> {viewPost && viewPost.title} </Heading>
                                        <Box>
                                            {viewPost && viewPost.content !== null ? parse(viewPost && viewPost.content) : ''}
                                        </Box>
                                    </Stack>
                                </CardBody>
                                <Divider />
                                <CardFooter display={'block'}>
                                    <Box>
                                        <FormControl mb={'15px'} width={'100%'}>
                                            <FormLabel> Leave A Comment </FormLabel>
                                            <JoditEditor
                                                id={"blogComment"}
                                                ref={editor}
                                                value={''}
                                                tabIndex={1} // tabIndex of textarea
                                                onChange={newContent => {}}
                                                className={Styles.joditeditorcustomheight}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl mb={'15px'}>
                                            <Button onClick={postComment} background={'#00aae0'} color={'#ffffff'}>
                                                Post Comment
                                            </Button>
                                        </FormControl>
                                    </Box>
                                </CardFooter>
                            </>
                        }
                    </Card>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                    <Card height={'100%'}>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='1'>
                                <Author author={viewPost && viewPost.author} />
                                <Date date={viewPost && viewPost.date} />
                                <Tags editable={edit} selectedOptions={blogTags && blogTags} id={id} getUpdated={getUpdated} />
                                <Pillars editable={edit} selectedOptions={blogPillars && blogPillars} id={id} getUpdated={getUpdated} />
                                <Actions editable={edit} selectedOptions={blogActions && blogActions} id={id} getUpdated={getUpdated} />
                                <Regions editable={edit} selectedOptions={blogRegions && blogRegions} id={id} getUpdated={getUpdated} />
                                <Countries editable={edit} selectedOptions={blogCountries  && blogCountries } id={id} getUpdated={getUpdated} />
                            </Stack>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
            
        </>
    )
}

export default ViewPost