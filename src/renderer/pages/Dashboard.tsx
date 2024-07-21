import React, { useEffect, useState } from 'react';
import image from './placeholder.png'
import imagep from '/placeholder2.png'
import { PieChart, Pie, LineChart, Line, Tooltip } from "recharts";
import 'animate.css';

import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';

// const getAssetPathInRenderer = (assetName: string) => {
//   if (process.env.NODE_ENV === 'production') {
//     // In production, use the public path set by Webpack
//     return `${process.env.PUBLIC_URL}/assets/${assetName}`;
//   } else {
//     // In development, assets can be served directly from the public folder
//     return `./assets/${assetName}`;
//   }
// };


const Dashboard = () => {
      const data = [
        { name: "Geeksforgeeks", students: 400 },
        { name: "Technical scripter", students: 700 },
        { name: "Geek-i-knack", students: 200 },
        { name: "Geek-o-mania", students: 1000 },
    ];
  return (
    <div>
      <div className='m-3 animate__animated animate__fadeInDown' id="header">
        <h1><strong>Dashboards</strong></h1>
      </div>

      {/* <div className="box-container">
        <div className="box">
          <h2>Total Sales</h2>
          <p>$100,000</p>
        </div>
        <div className="box">
          <h2>Category 2</h2>
          <p>Value 2</p>
        </div>
        <div className="box">
          <h2>Category 3</h2>
          <p>Value 3</p>
        </div>
        <div className="box">
          <h2>Category 4</h2>
          <p>Value 4</p>
        </div>
      </div>
       */}
      <div className="container"> 
            <PieChart width={1000} height={600}>
                <Tooltip />
                <Pie
                    data={data}
                    dataKey="students"
                    outerRadius={200}
                    innerRadius={150}
                    fill="green"
                    label={({ name, students }) =>
                        `${name}: ${students}`
                    }
                />
            </PieChart>
        </div>
    </div>
  )
}

export default Dashboard
