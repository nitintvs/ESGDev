import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from './import.module.css'
import API from '../../../Services/API';
import { FormControl, Heading, Card, CardBody, Box, Text, Input, Stack, StackDivider, Button, Radio, RadioGroup} from '@chakra-ui/react'
import Select from 'react-select';

const Export = () => {
    const token = window.localStorage.getItem("accessToken")
    const [selectedFile, setSelectedFile] = useState(null);
    const [value, setValue] = useState('1')
    const [isLoading, setIsLoading]  = useState(false)
    const [allMetrics, setAllMetrics] = useState()
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        API.get(`/metric`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response1=>{
            console.log(response1.data)
            setAllMetrics(response1.data)
            setIsLoading(false)
        })
    },[])
    
    const options = allMetrics && allMetrics.map(metric => ({
        value: metric.id,
        label: metric.name
      }))
    

    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
        console.log(selectedOption)
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
          // Send the file to the API using Axios (you can also use Fetch API)
          const response = await API.post(`/upload/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } catch (error) {
        }
    };

    const handleExport =  async () => {

    }

    const fetchDataAndDownloadCSV = async () => {
      try {
        // Make an API call to fetch the data
        const response = await API.get(`/metric-data?metric_id=${selectedOption.value}`);
        
        // Assuming the API response is an array of objects
        const data = response.data;

        // Convert data to CSV format
        const csv = convertArrayOfObjectsToCSV(data);

        // Create a Blob with the CSV data
        const blob = new Blob([csv], { type: 'text/csv' });

        // Generate a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'metric_data.csv');

        // Simulate a click event to trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    // Function to convert array of objects to CSV format with properly formatted headings
    const convertArrayOfObjectsToCSV = (data) => {
      const headers = Object.keys(data[0]);

      // Format headers
      const formattedHeaders = headers.map(header => {
        // Replace underscores with spaces and capitalize first letter of each word
        return header.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      });

      // Convert data to CSV format
      const csv = [formattedHeaders.join(','), ...data.map(row => headers.map(header => row[header]).join(','))].join('\n');
      return 'data:text/csv;charset=utf-8,' + csv;
    };

    return (
        <>
            <Box>
                <FormControl mt={'15px'} maxW={'50%'}>
                    <Select
                        placeholder="Select a metric to export from list"
                        value={selectedOption}
                        onChange={handleChange}
                        options={options}
                    />
                    {/* <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row'>
                            <Radio value='1'>All</Radio>
                            <Radio value='2'>Errors</Radio>
                            <Radio value='3'>Success</Radio>
                        </Stack>
                    </RadioGroup> */}
                </FormControl>
                
                <FormControl>
                    <Button className={Styles.customButton} color={'#ffffff'} mt={'15px'} onClick={fetchDataAndDownloadCSV} mr={'10px'}>Export Data</Button>
                    {/* <Button className={Styles.customButton} color={'#ffffff'} mt={'15px'} onClick={handleSubmit} mr={'10px'}>Export Users</Button> */}
                </FormControl>
            </Box>
            
        </>
    )
}

export default Export