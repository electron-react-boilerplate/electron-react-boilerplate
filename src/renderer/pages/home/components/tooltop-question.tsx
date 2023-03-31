import { Col, Row, Tooltip } from 'antd';
import { AiFillQuestionCircle } from 'react-icons/ai';

interface TooltipQuestionProps {
  title: string;
  text: string;
}

const TooltipQuestion = ({
  title,
  text,
}: TooltipQuestionProps): JSX.Element => {
  return (
    <Row align="middle" gutter={[7, 7]} wrap={false}>
      <Col>{title}</Col>
      <Col style={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title={text}>
          <AiFillQuestionCircle size={14} />
        </Tooltip>
      </Col>
    </Row>
  );
};
export default TooltipQuestion;
