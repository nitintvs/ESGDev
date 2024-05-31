import React from 'react';
import Styles from './tabletocsv.module.css'
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

function TableToCSV({ tableData, filename }) {
    const convertToCSV = (data) => {
        const csv = [];
        const rows = data.querySelectorAll('tr');
        rows.forEach(row => {
            const rowData = [];
            const cells = row.querySelectorAll('td, th');
            cells.forEach(cell => {
                rowData.push(cell.textContent.trim());
            });
            csv.push(rowData.join(','));
        });
        return csv.join('\n');
    };

    const downloadCSV = () => {
        const csvContent = convertToCSV(tableData);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Stack spacing={4} direction='row' align='right' float={'right'} mb={'15px'}>
                <Button className={Styles.downloadCsv} size='lg' onClick={downloadCSV}>
                    Download Logs
                </Button>
            </Stack>
        </>
    );
}

export default TableToCSV;