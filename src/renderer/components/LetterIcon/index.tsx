
import { Icon } from '@douyinfe/semi-ui';
import "./style.scss"

type LetterIconProps = {
  className?: string;
  style?: React.CSSProperties;
  letter?: string;
}

function LetterIcon ({letter}: LetterIconProps) {
  const LetterSvg = () => {
    return (<svg width="24" height="24" className="letter-svg">
      <text x="6" y="18" className="text" >
        <tspan>{letter}</tspan>
      </text>
    </svg>)
  }
  return (
    <Icon svg={<LetterSvg />} />
  )
}

export default LetterIcon;
