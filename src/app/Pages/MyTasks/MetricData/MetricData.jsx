import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Styles from './metricdata.module.css'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button, Box} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import API from '../../../Services/API'
import {useDisclosure} from '@chakra-ui/react'
import LoaderSpinner from '../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'
import { capitalize } from '@mui/material';
import { IconButton } from '@chakra-ui/react'
import ApproveComponent from './ApproveComponent';
import RejectComponent from './RejectComponent';
import EditMetricData from './EditMetricData/EditMetricData';
import DeleteComponent from './DeleteComponent/DeleteComponent';

const MetricData = () => {
  const token = window.localStorage.getItem("accessToken")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [metricData, setMetricData] = useState()
  const [isLoading, setIsLoading] = useState()
  const [message, setMessage] = useState()
  const [rejectMessage, setRejectMessage] = useState()
  const [deleteMessage, setDeleteMessage] = useState()
  const [getUpMessage, setGetUpMessage] = useState()
  const [allMetrics, setAllMetrics] = useState()
  const [fiscalYearDetail, setFiscalYearDetail] = useState()
  const [fiscalYearQtrDetail, setFiscalYearQtrDetail] = useState()

  useEffect(()=>{
    document.documentElement.scrollTo(0, 0);
    setIsLoading(true)
    API.get(`/my-task`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response=>{
      setMetricData(response.data)
      API.get(`/metric`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }).then(response1=>{
        setAllMetrics(response1.data)
        console.log(response1.data)
        
      })
  
      API.get(`/fiscal-year-detail`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
      }).then(response=>{
        setFiscalYearDetail(response.data[0].fiscalyear)
        setFiscalYearQtrDetail(response.data[1].fiscalquarter)
        setIsLoading(false)
      })
      
    })
  },[])

  const getUpdatedPending = (metricTask) =>{
    setMetricData(metricTask)
  }

  const getMessage = (metricTask) =>{
    setMessage(metricTask)
  }

  const reject = (metricTask) =>{
    setRejectMessage(metricTask)
  }
  const dltMessage = (metricTask) =>{
    setDeleteMessage(metricTask)
  }

  const updatedMessage = (metricTask) =>{
    setGetUpMessage(metricTask)
  }
  

  return (
    <>
      {isLoading ? <LoaderSpinner /> : null}
      {
        message  ?
          <Box className={Styles.successMessage}>
            Metric data approved successfully
          </Box> 
        : rejectMessage  ?
          <Box className={Styles.successMessage}>
            Metric data rejected
          </Box> 
        : deleteMessage  ?
          <Box className={Styles.successMessage}>
            Metric data deleted successfully
          </Box> 
        : getUpMessage  ?
            <Box className={Styles.successMessage}>
              Metric updated successfully
            </Box> 
        : null
      }

      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr className={Styles.tr}>
              <Th className={Styles.th}>Period</Th>
              <Th className={Styles.th}>Strategy</Th>
              <Th className={Styles.th}>Metric</Th>
              <Th className={Styles.th}>Value</Th>
              <Th className={Styles.th}>Status</Th>
              <Th className={Styles.th}>Geography</Th>
              <Th className={Styles.th}>Ancestors</Th>
              <Th className={Styles.th}>Approval</Th>
              <Th className={Styles.th}>Approve</Th>
              <Th className={Styles.th} isNumeric>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              metricData && metricData.map((item, index)=>
                <Tr className={Styles.tr}>
                  <Td className={Styles.td}>
                    <Link to={`/mytasks/${item.fiscal_year}/${item.fiscal_year_name}`}>{item.fiscal_year_name}</Link>
                  </Td>
                  <Td className={Styles.td}></Td>
                  <Td className={Styles.td}>
                    <Box w={'110px'} whiteSpace={'pre-line'}>
                      <Link to={`/mytasks/metric/${item.metric}/${item.metric_name}`}>
                        {item.metric_name}
                      </Link>
                      
                    </Box>
                  </Td>
                  <Td className={Styles.td}> 
                    {
                      item.datatype === 'number' ? '# ' : item.datatype === 'money' ? '$ ' : null
                    } 
                    {item.value}
                    {
                      item.datatype === 'percent' ? ' %' : null
                    }
                  </Td>

                  <Td className={Styles.td}>{item.metric_status.replace(/-/g, " ")}</Td>
                  <Td className={Styles.td}>{item.geography}</Td>
                  <Td className={Styles.td}></Td>
                  <Td className={Styles.td}>{item.approval_status}</Td>
                  <Td className={Styles.td}> 
                    <ApproveComponent id={item.id} getUpdatedPending={getUpdatedPending} getMessage={getMessage} />
                    <RejectComponent id={item.id} getUpdatedPending={getUpdatedPending} getMessage={reject} />
                  </Td>
                  <Td className={Styles.td} isNumeric> 
                    <EditMetricData 
                      metricName={item.metric_name}
                      period={item.fiscal_year_name}
                      metricData={allMetrics && allMetrics}
                      fiscalYearDetail={fiscalYearDetail}
                      fiscalYearQtrDetail={fiscalYearQtrDetail}
                      value={item.value}
                      geography={item.geography}
                      approvalStatus={item.approval_status}
                      status = {item.metric_status}
                      id={item.id}
                      getUpdatedPending={getUpdatedPending}
                      getMessage={updatedMessage}
                    />
                    <DeleteComponent id={item.id} getUpdatedPending={getUpdatedPending} getMessage={dltMessage} />
                  </Td>
                </Tr>
              )
            }
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default MetricData