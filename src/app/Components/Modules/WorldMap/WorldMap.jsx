import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import './worldmap.module.css'; // Import CSS for styling

function WorldMap() {
  return (
    <div className="world-map">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147
        }}
      >
           <Tooltip overflow={"none"}  background={"transparent"} color={"#2b2b2b"} fontSize={"12px"} boxShadow={"none"} label={geo.properties.ADMIN} key={geo.rsmKey}>
        <Geographies geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json">
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
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
            ))
          }
        </Geographies>
            </Tooltip>
        </ComposableMap>
    </div>
  );
}

export default WorldMap;