import React from 'react'

import { GlobalPallete } from '../global/GlobalTheme'

interface LogOutIconProps {
  className: string
  fill?: string
}

const LogOutIcon = ({
  className,
  fill = GlobalPallete.colors.primary
}: LogOutIconProps): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="20"
      fill="none"
      viewBox="0 0 14 13"
    >
      <path
        fill={fill}
        fillOpacity="0.6"
        d="M10.5 2.8l-.987.987L11.319 5.6H4.2V7h7.119L9.513 8.806l.987.994L14 6.3l-3.5-3.5zM1.4 1.4H7V0H1.4C.63 0 0 .63 0 1.4v9.8c0 .77.63 1.4 1.4 1.4H7v-1.4H1.4V1.4z"
      ></path>
    </svg>
  )
}

export default LogOutIcon
