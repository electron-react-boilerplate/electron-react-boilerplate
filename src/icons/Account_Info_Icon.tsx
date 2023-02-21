import React from 'react'

import { GlobalPallete } from '../global/GlobalTheme'

interface AccountInfoIconProps {
  className: string
  fill?: string
}

const AccountInfoIcon = ({
  className,
  fill = GlobalPallete.colors.primary
}: AccountInfoIconProps): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill={fill}
        fillOpacity="0.6"
        d="M8 1.333c.733 0 1.333.6 1.333 1.334C9.333 3.4 8.733 4 8 4s-1.333-.6-1.333-1.333c0-.734.6-1.334 1.333-1.334zM14 6h-4v8.667H8.667v-4H7.333v4H6V6H2V4.667h12V6z"
      ></path>
    </svg>
  )
}

export default AccountInfoIcon
