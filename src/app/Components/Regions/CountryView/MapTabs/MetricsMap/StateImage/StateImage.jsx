import React from 'react'


const StateImage = (props) => {
    return (
        <>
            {/* {props.countryCode ? props.countryCode.toLowerCase() : ''}
            <img src={props.countryCode ? props.countryCode.toLowerCase() : ''} /> */}

            <img src={`/usa/${props.countryCode ? props.countryCode.toLowerCase() : ''}.png`} className='stateImage' />
        </>
    )
}

export default StateImage