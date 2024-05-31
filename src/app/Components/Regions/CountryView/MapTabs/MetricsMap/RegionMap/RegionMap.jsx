import React, { useState, useEffect, useRef, useMemo } from 'react';
import API from '../../../../../../Services/API';
import Styles from './regionmap.module.css'
import { useNavigate } from 'react-router-dom';
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea,
  Tooltip, Button} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import {
    ComposableMap,
    Geographies,
    Geography,
    Annotation,
    ZoomableGroup, // Import ZoomableGroup
    ZoomIn, // Import ZoomIn
    ZoomOut, // Import ZoomOut
  } from 'react-simple-maps';
import worldData from './world.geojson';
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

import { VectorMap } from "react-jvectormap"
import usa from './usa-map.json';

const RegionMap = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [countryData, setCountryData] = useState();
    const {id} = useParams();
    const navigate = useNavigate();
    const defaultScale = 130;
    const [zoom, setZoom] = useState(1);


    const [tooltipContent, setTooltipContent] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showTooltip, setShowTooltip] = useState(false);
    const offset = { x: 10, y: 10 }; // adjust the offset as needed

    const handleZoomIn = () => {
        setZoom(zoom * 1.5); // Increase zoom level
    };

    const handleZoomOut = () => {
        if(zoom >= 1.5){
            setZoom(zoom / 1.5); // Decrease zoom level
        }
    };


    const handleMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };
    
      const handleMouseEnter = (countryProperties) => {
        setShowTooltip(true);
            const countryName = countryProperties.ADMIN || countryProperties.ADMIN; // Check both upper and lower case
            const countryValue = countryProperties.value; // Assuming you have this data available
            const content = `${countryName}: ${countryValue ? countryValue : '0'}`;
            setTooltipContent(content);
        };
    
      const handleMouseLeave = () => {
        setShowTooltip(false);
      };
    
    
    

    useEffect(() => {
        API.get(`/project-modules?module_id=${id}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            API.get(`/get-sub-modules?module_id=${id}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                setCountryData(response.data)
            })
        })
    },[id])
        
    const highlightedCountries = countryData && countryData.map((item) => (
        {code:item.country_code, value: item.name}
    ))

    const isHighlighted = (countryCode) =>
    highlightedCountries && highlightedCountries.some((country) => country.code === countryCode);

    const handleCountryClick = (countryProperties) => {
        const countryCode = countryProperties.ISO_A2 || countryProperties.iso_a2;
        const countryName = countryProperties.ADMIN || countryProperties.ADMIN; // Check both upper and lower case
        const countryId = highlightedCountries.find((country) => country.code === countryCode)?.id;
        const countryValue = highlightedCountries.find((country) => country.code === countryCode)?.value;
        alert(`You clicked on ${countryName} and ${countryValue ? countryValue : '0'}`);
        // You can handle the click event here, e.g., show more info about the country
        //navigate(`/country/${countryId}/${countryName}/`);
    };

    // const handleMouseEnter = (countryProperties) => {
    //     const countryName = countryProperties.ADMIN || countryProperties.ADMIN; // Check both upper and lower case
    //     const countryValue = countryProperties.value; // Assuming you have this data available
    //     const content = `${countryName}: ${countryValue ? countryValue : '0'}`;
    //     setTooltipContent(content);
    // };

    // const handleMouseLeave = () => {
    //     setTooltipContent('');
    // };





    return (
        <>
            {/* <ComposableMap
                projection="geoMercator"
            >
                <Geographies geography={worldData}>
                    {({ geographies }) =>
                    geographies.map(geo =>
                        geo.properties.ISO_A2 === `${props.code && props.code}` ? (
                        <Geography
                            key={geo.rsmKey} geography={geo} 
                        />
                        ) : null
                    )
                    }
                </Geographies>
            </ComposableMap> */}

            <Heading as='h3' size='lg' mb={'25px'} fontSize={'19px'} mt={'20px'} className={Styles.customHeadingH3}>
                Geographic Impact
            </Heading>
            
            <Card backgroundColor={'rgb(201 210 211)'} p={'0px'}>
                <CardBody p={'0px'}>
                    <Box className={Styles.zoomControls}>
                        <button className={Styles.zoomIn} onClick={handleZoomIn}> <AddIcon w={3} h={3} /> </button>
                        <button className={Styles.zoomOut} onClick={handleZoomOut}> <MinusIcon w={3} h={3} /> </button>
                    </Box>
                    <ComposableMap 
                        style={{  position: 'relative', flex: 1, width: '100%', height: '600px'}}
                        projection="geoMercator"
                        projectionConfig={{
                            //scale: 130,
                            scale: defaultScale * zoom,
                            center: [0, 0],
  
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        
                    >
                        <ZoomableGroup>
                            <Geographies geography={worldData}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const countryCode = geo.properties.ISO_A2 || geo.properties.iso_a2;
                                        const isSelected = isHighlighted(countryCode);
                                        const fillColor = isSelected ? '#00a0da' : '#ffffff'; // Define fill color
                                        const strokeColor = isSelected ? '#000000' : '#D6D6DA'; // Define stroke color for selected countries
                                        const strokeWidth = isSelected ? 0.5 : 0.5; // Adjust stroke width for selected countries
                      return geo.properties.ISO_A2 ===
                        `${props.code && props.code}` ? (
                          <Tooltip overflow={"none"}  background={"transparent"} color={"#2b2b2b"} fontSize={"12px"} boxShadow={"none"} label={geo.properties.ADMIN} key={geo.rsmKey}>
                                                <Geography
                                                    key={geo.rsmKey} geography={geo}
                                                    onMouseEnter={() => handleMouseEnter(geo.properties)}
                                                    onMouseLeave={handleMouseLeave} 
                                                    style={{
                            default: {
                              fill: fillColor,
                              // stroke: strokeColor, // Apply stroke color
                              // strokeWidth: strokeWidth, // Apply stroke width
                              outline: "none",
                            },
                            hover: {
                              fill: "#D2D2D2",
                              stroke: strokeColor, // Apply stroke color
                              strokeWidth: strokeWidth, // Apply stroke width
                              outline: "none",
                              filter: "drop-shadow(0px 1px 1px #2c2c2c50)",
                            },
                                                    }}
                                                >
                                                    <ComposableMap projection="geoMercator" projectionConfig={{ scale: 6000 }}>
                                                    <Geographies geography={worldData}>
                                                        {({ geographies }) =>
                                                        geographies.map(geo =>
                                                            geo.properties.name === `Alabama` ? (
                                                            <Geography
                                                                key={geo.rsmKey} geography={geo}
                                          style={{
                                        default: {
                                          fill: "red",
                                          // stroke: strokeColor, // Apply stroke color
                                          // strokeWidth: strokeWidth, // Apply stroke width
                                          outline: "none",
                                        },
                                        hover: {
                                          fill: "#D2D2D2",
                                          stroke: strokeColor, // Apply stroke color
                                          strokeWidth: strokeWidth, // Apply stroke width
                                          outline: "none",
                                          filter:
                                            "drop-shadow(0px 1px 1px #2c2c2c50)",
                                        },
                                      }}
                                                            />
                                                            ) : null
                                                        )
                                                        }
                                                    </Geographies>
                                                    </ComposableMap>
                                                    
                                                </Geography>
                            </Tooltip>
                      ) : (
                        <Tooltip overflow={"none"}  background={"transparent"} color={"#2b2b2b"} fontSize={"12px"} boxShadow={"none"} label={geo.properties.ADMIN} key={geo.rsmKey}>
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                onClick={() => handleCountryClick(geo.properties)}
                                                data-tip="Static Tooltip Content" // Static tooltip content
                                                data-for="country-tooltip"
                                                style={{
                            default: {
                              fill: "#ffffff",
                              stroke: "none", // Apply stroke color
                              strokeWidth: "none", // Apply stroke width
                              outline: "none",
                            },
                            hover: {
                              fill: "#ffffff",
                              stroke: "none", // Apply stroke color
                              strokeWidth: "none", // Apply stroke width
                              outline: "none",
                            },
                                                }}
                            />
                            </Tooltip>
                                        );
                                    })
                                }
                            </Geographies>
                        </ZoomableGroup>
                    </ComposableMap>
                    {/* Define Tooltip */}


                 {/*   {showTooltip && (
                        <div
                        style={{
                            position: 'absolute',
                            left: position.x + offset.x,
                            top: position.y + offset.y,
                            background: 'rgba(0, 0, 0, 0.8)',
                            color: 'white',
                            padding: '5px',
                            borderRadius: '5px',
                        }}
                        >
                            {tooltipContent}
                        </div>
                    )}*/}
                    {/* Define Tooltip */}
            
                    
                </CardBody>
            </Card>
        </>
    )
}

export default RegionMap