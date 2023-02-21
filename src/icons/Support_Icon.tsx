import React from 'react'

import { GlobalPallete } from '../global/GlobalTheme'

interface SupportIconProps {
  className: string
  fill?: string
}

const SupportIcon = ({
  className,
  fill = GlobalPallete.colors.primary
}: SupportIconProps): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="24"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        fill={fill}
        fillOpacity="0.6"
        d="M7 0C3.136 0 0 3.136 0 7s3.136 7 7 7 7-3.136 7-7-3.136-7-7-7zm5.222 4.984l-1.946.805a3.487 3.487 0 00-2.065-2.058l.805-1.946a5.574 5.574 0 013.206 3.199zM7 9.1c-1.162 0-2.1-.938-2.1-2.1 0-1.162.938-2.1 2.1-2.1 1.162 0 2.1.938 2.1 2.1 0 1.162-.938 2.1-2.1 2.1zM4.991 1.778l.819 1.946a3.5 3.5 0 00-2.086 2.079l-1.946-.812a5.59 5.59 0 013.213-3.213zM1.778 9.009l1.946-.805a3.478 3.478 0 002.079 2.072l-.819 1.946a5.597 5.597 0 01-3.206-3.213zm7.238 3.213l-.805-1.946a3.485 3.485 0 002.065-2.079l1.946.819a5.605 5.605 0 01-3.206 3.206z"
      ></path>
    </svg>
  )
}

export default SupportIcon
