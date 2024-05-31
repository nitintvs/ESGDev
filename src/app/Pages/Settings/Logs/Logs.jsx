import React, {useEffect, useState, useRef} from 'react'
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../../../Services/API'
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
    Heading,
    Text,
    Button, 
    ButtonGroup,
    Stack
} from '@chakra-ui/react'
import TableToCSV from './TableToCSV'
import LoaderSpinner from '../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'
import LogsLoader from './LogsLoader';

const Logs = () => {
    const tableRef = useRef(null);
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading] = useState(false)
    const [log, setLog] = useState()
    const [activePage, setActivePage] = useState(1)
        
    useEffect(() => {
        setIsLoading(true)
        API.get(`/test-log`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
        .then((response) => {
            setLog(response?.data?.results)
            setIsLoading(false)
        })
    },[])

    const handlePageChange = (pageNumber) => {
        setIsLoading(true)
        setActivePage(pageNumber)
        API.get(`/test-log?page=${pageNumber}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
        .then((response) => {
            setLog(response?.data?.results)
            setIsLoading(false)
        })
    }

    return (
        <>
            <TableToCSV tableData={tableRef.current} filename="table_data.csv" />
            <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
            />
            <TableContainer mt={'15px'} mb={'15px'} backgroundColor={'#ffffff'} width={'100%'}>
                <Table size='sm' colorScheme='teal' border="2px solid" borderColor="gray.200" rounded="md" ref={tableRef}>
                    <Thead backgroundColor={'#00aae0'} color={'#ffffff'}>
                        <Tr>
                            <Th color={'#ffffff'} p={'10px 15px'}>Action</Th>
                            <Th color={'#ffffff'} p={'10px 15px'}>Title</Th>
                            <Th color={'#ffffff'} p={'10px 15px'}>Type	</Th>
                            <Th color={'#ffffff'} p={'10px 15px'}>Property Type</Th>
                            <Th color={'#ffffff'} p={'10px 15px'}>Property Name</Th>
                            <Th color={'#ffffff'} p={'10px 15px'}>Value</Th>
                            <Th color={'#ffffff'} p={'10px 15px'}>User</Th>
                            <Th color={'#ffffff'} p={'10px 15px'}>Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isLoading ? <LogsLoader /> : null}
                        {
                            log && log.map((item, key) =>
                                <Tr>
                                    <Td>{item.method === "GET" ? "read" : item.method === "POST" ? "Created" :  item.method === "Put" ? "Updated" : "Deleted" }</Td>
                                    <Td> </Td>
                                    <Td>{item.action_type}</Td>
                                    <Td> </Td>
                                    <Td> </Td>
                                    <Td> </Td>
                                    <Td>{item.userid}</Td>
                                    <Td>
                                        {
                                            new Date(item.created_at).toLocaleString('en-US', {
                                                month: '2-digit',
                                                day: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })
                                        }
                                    </Td>
                                </Tr>
                            )
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
            />
        </>
    )
}

export default Logs