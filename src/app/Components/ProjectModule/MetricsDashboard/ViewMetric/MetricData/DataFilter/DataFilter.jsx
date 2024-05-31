import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from './datafilter.modue.css'
import { Link, useParams } from 'react-router-dom'
import API from '../../../../../../Services/API';
import {Box, SimpleGrid} from '@chakra-ui/react'
import Select from 'react-select'

const DataFilter = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [selectedOption, setSelectedOption] = useState(null);

    
    const options = [
        ...(props.fiscalYearDetail && props.fiscalYearDetail.length > 0 ? props.fiscalYearDetail.map(year => ({ value: year.id, label: year.name })) : []),
        ...(props.fiscalYearQtrDetail && props.fiscalYearQtrDetail.length > 0 ? props.fiscalYearQtrDetail.map(quarter => ({ value: quarter.id, label: quarter.name })) : [])
    ];

    const statusOptions =[
        {value:'on-track', label:'On Track'},
        {value:'delay', label:'Delayed'},
        {value:'acceleration', label:'Acceleration'}
    ]

    const approvalOptions =[
        {value:'pending', label:'Pending'},
        {value:'approved', label:'Approved'},
        {value:'requirefollow-up', label:'Require Follow Up'},
        {value:'ingovernancereview', label:'In Governance Review'}
    ]

    
    const periodSelect = selectedOption => {
        setSelectedOption(selectedOption);
        API.get(`/get-metric-data-fiscal-year?fiscal_year=${selectedOption.value}&approval_status=approved`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response=>{
            console.log(response.data)
        })
    };
    
    return (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing='40px' mb={'15px'}>
            <Box>
                <Select
                    options={options}
                    placeholder={'Period (Fy/QTR)'}
                    onChange={periodSelect}
                />
            </Box>
            <Box>
                <Select
                    options={statusOptions}
                    placeholder={'Filter by Status'}
                />
            </Box>
            <Box>
                <Select
                    options={approvalOptions}
                    placeholder={'Filter by Approval'}
                />
            </Box>
        </SimpleGrid>
    )
}

export default DataFilter