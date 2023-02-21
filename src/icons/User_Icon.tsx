import React from 'react'
import styled from 'styled-components'

interface UserIconProps {
  className: string
}

const StyledCommandsIcon = styled.svg`
  padding-top: 8px;
  margin-right: 4px;
  margin-left: -12px;
`

const CommandsIcon = ({ className }: UserIconProps): JSX.Element => {
  return (
    <StyledCommandsIcon
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      fill="none"
      viewBox="0 0 26 26"
    >
      <g filter="url(#filter0_d_40_240)" shapeRendering="crispEdges">
        <path
          fill="#4022F9"
          fillOpacity="0.8"
          d="M13 0C8.032 0 4 4.032 4 9s4.032 9 9 9 9-4.032 9-9-4.032-9-9-9zm0 2.7c1.494 0 2.7 1.206 2.7 2.7 0 1.494-1.206 2.7-2.7 2.7a2.696 2.696 0 01-2.7-2.7c0-1.494 1.206-2.7 2.7-2.7zm0 12.78a6.48 6.48 0 01-5.4-2.898c.027-1.791 3.6-2.772 5.4-2.772 1.791 0 5.373.981 5.4 2.772A6.48 6.48 0 0113 15.48z"
        ></path>
        <path
          fill="url(#paint0_linear_40_240)"
          fillOpacity="0.5"
          d="M13 0C8.032 0 4 4.032 4 9s4.032 9 9 9 9-4.032 9-9-4.032-9-9-9zm0 2.7c1.494 0 2.7 1.206 2.7 2.7 0 1.494-1.206 2.7-2.7 2.7a2.696 2.696 0 01-2.7-2.7c0-1.494 1.206-2.7 2.7-2.7zm0 12.78a6.48 6.48 0 01-5.4-2.898c.027-1.791 3.6-2.772 5.4-2.772 1.791 0 5.373.981 5.4 2.772A6.48 6.48 0 0113 15.48z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_40_240"
          width="26"
          height="26"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_40_240"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_40_240"
            result="shape"
          ></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_40_240"
          x1="16.857"
          x2="11.393"
          y1="15.75"
          y2="-0.964"
          gradientUnits="userSpaceOnUse"
        >
          <stop></stop>
          <stop offset="1" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </StyledCommandsIcon>
  )
}

export default CommandsIcon
