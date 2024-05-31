import React, { useState } from 'react';
import Styles from './import.module.css'
import API from '../../../Services/API';
import { FormControl, Heading, Card, CardBody, Box, Text, Input, Stack, StackDivider, Button, Radio, RadioGroup} from '@chakra-ui/react'


const Import = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [value, setValue] = useState('1')

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
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

    return (
        <>
            <Box>
                <FormControl>
                    <Input type="file" onChange={handleFileChange} padding={"4px"}  />
                </FormControl>
                <FormControl mt={'15px'}>
                    <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row'>
                            <Radio value='1'>All</Radio>
                            <Radio value='2'>Errors</Radio>
                            <Radio value='3'>Success</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
                
                <FormControl>
                    <Button className={Styles.customButton} color={'#ffffff'} mt={'15px'} onClick={handleSubmit}>Upload File</Button>
                </FormControl>
            </Box>
            
        </>
    )
}

export default Import