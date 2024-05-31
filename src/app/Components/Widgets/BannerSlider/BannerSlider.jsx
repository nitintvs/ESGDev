import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import $ from 'jquery'
import './bannerslider.css'
import Styles from './popup.module.css'
import API from '../../../Services/API';
import {Heading, SimpleGrid, Box, FormControl, Switch, Card, CardHeader, CardBody, CardFooter, Image, Text, Input, Button, Table, Thead, Tbody, Tfoot,
Tr, Th, Td, TableCaption, TableContainer, Stack } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormLabel,} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../CommonWidgets/LoaderSpinner/LoaderSpinner';

const BannerSlider = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <>
            <Box mb={'35px'}>
                <Slider {...settings}>
                    {
                        props.bannerImages && props.bannerImages.map((item) =>(
                            <Link to={`/article/${item.id}/${item.article_name}`}>
                                <Box className="slide" backgroundImage={item.banner}>
                                    <Box className={Styles.sliderTitle}>
                                        <Text as={'h3'}>
                                            {item.article_name}
                                        </Text>
                                    </Box>
                                </Box>
                            </Link>
                            
                        ))
                    }
                </Slider>
            </Box>
        </>
    )
}

export default BannerSlider