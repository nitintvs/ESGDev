import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from '../viewpost.module.css'
import $ from 'jquery'
import Select from 'react-select';
import { Heading, Box, Image, Text, Input, Textarea, Divider, Button, Card, CardHeader, CardBody, CardFooter, Stack, ButtonGroup, Grid, GridItem, StackDivider  } from '@chakra-ui/react'
import { Tag, TagLabel, TagLeftIcon, TagRightIcon, TagCloseButton,} from '@chakra-ui/react'
import {FormControl, FormLabel, FormErrorMessage, FormHelperText, Badge } from '@chakra-ui/react'

const Date = (props) => {
    return (
        <>
            <Box>
                <Heading className={Styles.sideBarHeading}>
                    Date
                </Heading>
                <Text p='0' className={Styles.sideBarText}>
                    {props.date}
                </Text>
            </Box>
        </>
    )
}

export default Date