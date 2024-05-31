import { Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const WorldMap = ({ onCountryClick }) => {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 100 }}
      width={800}
      height={400}
    >
      <Geographies geographyUrl={'/world-50m.json'}>
        {({ geographies }) =>
            geographies.map((geo) => (
              <Tooltip overflow={"none"}  background={"transparent"} color={"#2b2b2b"} fontSize={"12px"} boxShadow={"none"} label={geo.properties.ADMIN} key={geo.rsmKey}>
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EAEAEA"
              stroke="#FFF"
              onClick={() => onCountryClick(geo.properties.NAME)}
                style={{
                  default: {
                    fill: "#D2D2D2",
                    outline: "none",
                  },
                  hover: {
                    fill: "#D2D2D2",
                    outline: "none",
                    filter: "drop-shadow(0px 1px 1px #2c2c2c50)",
                  },
                }}
                />
                </Tooltip>
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default WorldMap;