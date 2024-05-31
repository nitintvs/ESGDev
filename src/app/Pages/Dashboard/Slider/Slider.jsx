import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Styles from './slider.module.css'
import Slide1 from '../../../../assets/images/carousel/banner_1.jpg'
import Slide2 from '../../../../assets/images/carousel/banner_2.jpg'

const images = [
    {url : Slide1},
    {url : Slide2}
]

const Slider = () => {
    

    return (
        <>
            <Carousel
                showThumbs={false}
            >
                <div>
                    <img src={Slide1} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={Slide2} />
                    <p className="legend">Legend 2</p>
                </div>
            </Carousel>
        </>
    )
}

export default Slider





