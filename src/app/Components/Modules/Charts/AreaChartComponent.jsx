import React, { useState } from 'react';
import Styles from './chart.module.css'
import ReactApexChart from 'react-apexcharts';
import { Box } from '@chakra-ui/react'


const AreaChartComponent = (props) => {
  const sortedData = props.chartData && props.chartData.sort((a, b) => a.fiscal_year.localeCompare(b.fiscal_year));
  
  const metricDataValues = props.chartData && props.chartData.map(item => item.metric_data);
  const minValue = Math.min(...metricDataValues);
  const maxValue = Math.max(...metricDataValues);


  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: 'line-area',
    },
    xaxis: {
      categories: sortedData.map(entry => entry.fiscal_year)
    },
    yaxis: {
      // min: minValue,
      // max: maxValue,
    },
    stroke: {
      curve: 'smooth'
    },
    colors: ['#d7edff', '#008FFB'],
    toolbar: {
      show: false // Hide toolbar
    },
  });
  
  const [chartSeries, setChartSeries] = useState([
    {
      type: 'area',
      name: 'Metric Data',
      data: sortedData.map(entry => entry.metric_data),
    },
    {
      type: 'line',
      name: 'Metric Target',
      data: sortedData.map(entry => entry.metric_target)
    }
  ]);
  // Set the width and height of the chart to be equal
  const chartWidth = '250px'; // Adjust as needed
  const chartHeight = '200px'; // Adjust as needed
  return (
    <>
      {
        !sortedData || sortedData.length === 0 ? 
          <Box className={Styles.emptyChart}>Chart couldn't be generated due to missing metric and target data.</Box> 
        : 
        <ReactApexChart 
          options={chartOptions} 
          series={chartSeries} 
          type="line"
          
          height={chartHeight}
        />
      }
    </>
  );
};

export default AreaChartComponent;