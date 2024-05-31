import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import $ from 'jquery'
import API from '../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import Styles from './viewinitiative.module.css'
import {Card, CardHeader, CardBody, IconButton, Button } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import Breadcrumb from '../../../../Components/Widgets/BreadCrumbs/BreadCrumbs'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import { EditContext } from '../../../../Context/BreadcrumbsContext';

const ViewInitiative = () => {
  const token = window.localStorage.getItem("accessToken")
  const [isLoading, setIsLoading]  = useState(true)
  const [editable, setEditable] = useState();
  const {initiativeId} = useParams();
  const editor = useRef(null);
  const [file, setFile] = useState(null);
  const [initiative, setInitiative] = useState();
  const {edit, setEdit } = useContext(EditContext);

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
    setIsLoading(true)
    API.get(`/initiative?initiative_id=${initiativeId}`)
    .then((response) => {
      setInitiative(response.data[0])
      setIsLoading(false)
    })
  },[initiativeId])

  const geteditStatus = (isEdit) =>{
    setEditable(isEdit)
  }
  
  return (
    <>
      { 
        isLoading ? <LoaderSpinner />: null
      }
      <Breadcrumb geteditStatus={geteditStatus} title={initiative && initiative.name} pillarId={initiative && initiative.id} />
      <Card>
        <CardBody>
          {edit ? <Button float={'right'}> Add New metric data </Button> : null}
          <TableContainer float={'left'} width={'100%'} mt='20px'>
            <Table size='sm'>
              <Thead>
                <Tr>
                    <Th>Period</Th>
                    <Th>Strategy</Th>
                    <Th>Metric</Th>
                    <Th>Value</Th>
                    <Th>Status</Th>
                    <Th>Approval</Th>
                    <Th>Geography</Th>
                    <Th isNumeric>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                  <Tr>
                    <Td>FY23 Q1</Td>
                    <Td> </Td>
                    <Td>Global Impact Grants - Total</Td>
                    <Td>500000</Td>
                    <Td>On-Track</Td>
                    <Td>Approved</Td>
                    <Td></Td>
                    <Td isNumeric>
                      <IconButton
                        variant='outline'
                        colorScheme='teal'
                        aria-label='Call Sage'
                        fontSize='20px'
                        icon={<EditIcon />}
                        mr={'10px'}
                      />
                      <IconButton
                        variant='outline'
                        colorScheme='teal'
                        aria-label='Call Sage'
                        fontSize='20px'
                        icon={<DeleteIcon />}
                      />
                    </Td>
                  </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  )
}

export default ViewInitiative