import React, { useState, useEffect, useRef, useMemo } from 'react';
import $ from 'jquery'
import API from '../../../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import {Card, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';


const Overview = (props) => {
  return (
    <>
      <Text mt={'25px'}>
        {props.description != null  ? parse(props.description) : ''}
      </Text>
    </>
  )
}

export default Overview