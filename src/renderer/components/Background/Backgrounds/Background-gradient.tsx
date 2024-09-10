import React, { useEffect, useState } from 'react';
import './Background-gradient.css';



export default () => 
{
    const maxValue = 120;
    const contrast = 60; // must <255-maxValue
    const [bgColor, setBgColor] = useState([0, maxValue, maxValue]);

    useEffect(() => 
    {
        const interval = setInterval(() => 
        {
            let rgb = bgColor

            if      (rgb[2] == maxValue && rgb[0] < maxValue) {rgb[0]++;rgb[1]--;}
            else if (rgb[0] == maxValue && rgb[1] < maxValue) {rgb[1]++;rgb[2]--;}
            else                                              {rgb[2]++;rgb[0]--;}

            setBgColor([rgb[0], rgb[1], rgb[2]]);
        }, 1000);
      
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="background" style={{
            '--bg-color-1': `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`, 
            '--bg-color-2': `rgb(${bgColor[0]+contrast}, ${bgColor[1]+contrast}, ${bgColor[2]+contrast})`
        }}>
          <div className="background__bg background__bg--1"></div>
          <div className="background__bg background__bg--2"></div>
          <div className="background__bg background__bg--3"></div>
        </div>
    )
}