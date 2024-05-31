import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from '../reportingtabs.module.css'
import $ from 'jquery'
import API from '../../../../../../../Services/API'
import { Link } from 'react-router-dom';
import { Heading, Card, CardHeader, CardBody, Box, Text, Stack, StackDivider, Button, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Table, Thead, Tr, Td} from '@chakra-ui/react'

const QuarterlyActions = () => {
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Td>

            </Td>
          </Tr>
        </Thead>
      </Table>
    </>
  )
}

export default QuarterlyActions