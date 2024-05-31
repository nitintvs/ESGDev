import React, { useState } from "react";

const Banner = (props) => {
    const [file, setFile] = useState();
    
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div> 
            {props.getEditable ? "Banner" : "Banner 1"} 
        </div>
    )
}

export default Banner