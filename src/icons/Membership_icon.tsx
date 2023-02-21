import React from 'react'
import styled from 'styled-components'

import { GlobalPallete } from '../global/GlobalTheme'

interface MembershipIconProps {
  className: string
  fill?: string
}

const StyledMembershipIcon = styled.svg`
  padding-top: 5px;
  padding-left: 3px;
`

const MembershipIcon = ({
  className,
  fill = GlobalPallete.colors.primary
}: MembershipIconProps): JSX.Element => {
  return (
    <StyledMembershipIcon
      className={className}
      xmlns="http://www.w3.org/2000/StyledMembershipIcon"
      width="20"
      height="24"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill={fill}
        fillOpacity="0.6"
        d="M12.6 0H1.4A1.39 1.39 0 00.007 1.4L0 9.8c0 .777.623 1.4 1.4 1.4h11.2c.777 0 1.4-.623 1.4-1.4V1.4c0-.777-.623-1.4-1.4-1.4zm0 9.8H1.4V5.6h11.2v4.2zm0-7H1.4V1.4h11.2v1.4z"
      ></path>
    </StyledMembershipIcon>
  )
}

export default MembershipIcon
