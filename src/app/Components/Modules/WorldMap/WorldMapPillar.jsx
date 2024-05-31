import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery'
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


const WorldMapPillar = (props) => {
    const navigate = useNavigate();
    const [tooltipContent, setTooltipContent] = useState('');
    const [zoom, setZoom] = useState(1);


    const [tooltipX, setTooltipX] = useState(0);
    const [tooltipY, setTooltipY] = useState(0);  

    const highlightedCountries = [
        //props.data && props.data.map(item => )
        { code: 'AM', id: 1, value: 10000  },
        { code: 'CA', id: 2, value: 20000 },
        { code: 'IN', id: 3, value: 30000 },
    ];
    const isHighlighted = (countryCode) =>
    highlightedCountries.some((country) => country.code === countryCode);

    const handleCountryClick = (countryProperties) => {
        const countryCode = countryProperties.ISO_A2 || countryProperties.iso_a2;
        const countryName = countryProperties.ADMIN || countryProperties.ADMIN; // Check both upper and lower case
        const countryId = highlightedCountries.find((country) => country.code === countryCode)?.id;
        const countryValue = highlightedCountries.find((country) => country.code === countryCode)?.value;

        alert(`You clicked on ${countryName} and ${countryValue}`);
        // You can handle the click event here, e.g., show more info about the country
        //navigate(`/country/${countryId}/${countryName}/`);
      };

      const handleMouseEnter = (countryProperties, evt) => {
        const countryCode = countryProperties.ISO_A2 || countryProperties.iso_a2;
        const countryName = countryProperties.ADMIN || countryProperties.ADMIN; // Check both upper and lower case
        const countryId = highlightedCountries.find((country) => country.code === countryCode)?.id;
        const countryValue = highlightedCountries.find((country) => country.code === countryCode)?.value;
        const content = `${countryName}: ${countryValue ? countryValue : '0'}`;
        const boundingBox = evt.target.getBBox();

        setTooltipContent(content);


        setTooltipX(boundingBox.x + boundingBox.width / 2);
        setTooltipY(boundingBox.y + boundingBox.height / 2);
        $('path .tooltipNew').remove()
        //$(evt.target).append(`<div class="tooltipNew">${content}</div>`)
        $(evt.target).attr('title', content)
    };
    
    const handleMouseLeave = () => {
        setTooltipContent('');
    };

    const handleZoomIn = () => {
        setZoom(prevZoom => prevZoom * 1.5); // Increase the scale by 1.5 to zoom in
    };
    
    const handleZoomOut = () => {
      setZoom(prevZoom => prevZoom / 1.5); // Decrease the scale by 1.5 to zoom out
    };

    return (
        <>
            <ComposableMap 
                style={{ flex: 1 }}
                projection="geoEquirectangular"
                projectionConfig={{ scale: 130 }}>
                
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
                                        onMouseEnter={(evt) => handleMouseEnter(geo.properties, evt)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            default: {
                                                fill: fillColor,
                                                outline: 'none',
                                            },
                        hover: {
                          fill: "#d7edff",
                          outline: "none",
                          filter: "drop-shadow(5px 5px 15px red)",
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
            {tooltipContent && (
        <div
          style={{
            position: 'absolute',
            left: tooltipX,
            top: tooltipY,
            transform: 'translate(-50%, -50%)', // Center the tooltip
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '5px',
            borderRadius: '5px',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
          }}
        >
          {tooltipContent}
        </div>
      )}
        </>
    )
}

export default WorldMapPillar