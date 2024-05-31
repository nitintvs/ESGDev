import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from '../viewmetric.module.css'
import {Card, CardHeader, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Input, Textarea, Button, Image} from '@chakra-ui/react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,} from '@chakra-ui/react'
import CreateAspiration from './CreateAspiration/CreateAspiration';
const Aspirations = (props) => {
    return (
        <>
            <TableContainer>
                {props.editable ? <CreateAspiration /> : null}
                
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>Value</Th>
                            <Th>Title</Th>
                            <Th isNumeric>Period</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            props.aspirations && props.aspirations.map(item => 
                                <Tr>
                                    <Td>{item.value}</Td>
                                    <Td>{item.name}</Td>
                                    <Td isNumeric> {item.targetfiscal} </Td>
                                </Tr>
                            )
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Aspirations