import React from 'react';
import Styles from './chart.module.css'
import {
  AreaChart,
  Area,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Card,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox, 
  Stack,
  Textarea 
} from '@chakra-ui/react'






const AreaChartComponent = (props) => {
  const sortedData = props.chartData && props.chartData.sort((a, b) => a.fiscal_year.localeCompare(b.fiscal_year));
  const data = sortedData && sortedData.length > 0 ? sortedData && sortedData.map(item => ({
    name: item.fiscal_year,
    Data: item.metric_data,
    Target: item.metric_target
  })) : [
    {
      name: "",
      "Data": 100,
    },
    {
      name: "",
      "Data": 1489,
    },
    {
      name: "",
      "Data": 2489,
    },
    {
      name: "",
      "Data": 5328,
    },
    
  ]

  return (
    <>
      {
        props.chartData && props.chartData.length > 0 ?
          <ResponsiveContainer>
          <>
            <AreaChart
              width={360}
              height={250}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d7edff" stopOpacity={1} />
                  <stop offset="95%" stopColor="#d7edff" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={1} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" /> <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="Data"
                stroke="#cccccc"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="Target"
                stroke="#cccccc"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </>
          </ResponsiveContainer>
        : 
        <>
          <Box className={Styles.emptyChart}>
            <AreaChart
              width={360}
              height={250}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
            <defs>
              <linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#efefef" stopOpacity={1} />
                <stop offset="95%" stopColor="#efefef" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorPv1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={1} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={1} />
              </linearGradient>
            </defs>
              <XAxis dataKey="name" /> <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="Data"
                stroke="#8d8d8d"
                fillOpacity={1}
                fill="url(#colorUv1)"
              />
              <Area
                type="monotone"
                dataKey="Target"
                stroke="#82ca9d"
                fillOpacity={0.1}
                fill="url(#colorPv1)"
              />
            </AreaChart>
          </Box>
        </>
      }
      
    </>
  );
};

export default AreaChartComponent;