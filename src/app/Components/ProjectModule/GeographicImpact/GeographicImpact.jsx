import React, { useState, useEffect, useRef, useMemo } from 'react';
import API from '../../../Services/API';
import Styles from './geographicImpact.module.css'
import $ from 'jquery'
import { useNavigate } from 'react-router-dom';
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button, Tooltip } from '@chakra-ui/react'
import Select from 'react-select';
import { useParams } from 'react-router-dom'
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
  } from 'react-simple-maps';
import worldData from './world.geojson';
import { AddIcon, MinusIcon } from '@chakra-ui/icons'


const GeographicImpact = () => {
    const token = window.localStorage.getItem("accessToken")
    const [countryData, setCountryData] = useState();
    const {id} = useParams();
    const navigate = useNavigate();
    const defaultScale = 130;
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => {
        setZoom(zoom * 1.5); // Increase zoom level
    };

    const handleZoomOut = () => {
        if(zoom >= 1.5){
            setZoom(zoom / 1.5); // Decrease zoom level
        }
    };


    useEffect(() => {
        API.get(`/pillar?module_id=${id}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            API.get(`/map?pillar_id=${response.data.id}`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                setCountryData(response.data)
            })
        })
    },[])
        
    const highlightedCountries = countryData && countryData.map((item) => (
        {code:item.code, value: item.value}
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

    const customStyles = {
        control: (provided) => ({
          ...provided,
          borderRadius: '12px', 
        }),
      };

    const options = [
        { value: 'apple', label: '$ Value of Deployed Equipment and Disaster Campaign' },
        { value: 'banana', label: 'Banana' },
        { value: 'orange', label: 'Orange' }
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
    };

    return (
        <>
            <Heading as='h3' size='lg' mb={'25px'} fontSize={'19px'} mt={'20px'} className={Styles.customHeadingH3}>
                Geographic Impact
            </Heading>
            
            <Card backgroundColor={'rgb(201 210 211)'} p={'0px'}>
                <CardBody p={'0px'}>
                    <Box className={Styles.filterDropDown}>
                        <Select
                            styles={customStyles}
                            className={Styles.marginRight +" "+ Styles.selectBox}
                            value={selectedOption}
                            onChange={handleChange}
                            options={options}
                            placeholder="Select..."
                        />
                        <Select
                            styles={customStyles}
                            className={Styles.selectBox}
                            value={selectedOption}
                            onChange={handleChange}
                            options={options}
                            placeholder="Select a fruit..."
                        />
                    </Box>
                    <Box className={Styles.zoomControls}>
                        <button className={Styles.zoomIn} onClick={handleZoomIn}> <AddIcon w={3} h={3} /> </button>
                        <button className={Styles.zoomOut} onClick={handleZoomOut}> <MinusIcon w={3} h={3} /> </button>
                    </Box>
                    <ComposableMap 
                        style={{ flex: 1, width: '100%', height: '600px',}}
                        projection="geoMercator"
                        projectionConfig={{
                          //scale: 130,
                          scale: defaultScale * zoom,
                          center: [0, 0],

                        }}
                        
                    >
                        <ZoomableGroup>
                        
                            <Geographies geography={worldData}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const countryCode = geo.properties.ISO_A2 || geo.properties.iso_a2; // Check both upper and lower case
                                        const fillColor = isHighlighted(countryCode) ? '#00a0da' : '#ffffff';
                                        return (
                                            <Tooltip overflow={"none"}  background={"transparent"} color={"#2b2b2b"} fontSize={"12px"} boxShadow={"none"} label={geo.properties.ADMIN} key={geo.rsmKey}>

                                                <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                onClick={() => handleCountryClick(geo.properties)}
                                                
                                                data-tip="Static Tooltip Content" // Static tooltip content
                                                data-for="country-tooltip"

                                                onMouseEnter={(event) => {
                                                    //event.target.title(geo.properties.ADMIN)
                                                    
                                                }}
                                                  onMouseLeave={(event) => {
                                                                    }}
                                                
                                                style={{
                                                    default: {
                                                        fill: fillColor,
                                                        outline: 'none',
                                                    },
                                                    hover: {
                                                        fill: '#D2D2D2',
                                                        outline: 'none',
                                                        filter:"drop-shadow(0px 1px 1px #2c2c2c50)",
                                    
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
                    
                </CardBody>
            </Card>
        </>
    )
}

export default GeographicImpact