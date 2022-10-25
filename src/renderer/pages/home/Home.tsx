import { Button, Col, Form, Input, Row } from 'antd';
import { createUseStyles } from 'react-jss';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { ITcpScan } from '../../../tools/network-scan/types/scan-network.types';

const useStyle = createUseStyles({
  buttonHome: {
    margin: 4,
    backgroundColor: 'white',
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    appearance: 'none',
    fontSize: '1.3rem',
    cursor: 'pointer',
    opacity: 0.9,
    boxShadow:
      '0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)',
    transition: 'all ease-in 0.1s',
    '&:hover': {
      color: '#fff',
      background: '#40a9ff',
    },
  },
});
export const Home = () => {
  const [target, setTarget] = useState<string>();
  const forms: ITcpScan['nmaprun']['host'][0]['address'] = 'address';
  const { buttonHome } = useStyle();
  return (
    <Row gutter={[15, 15]}>
      <Row>
        <Col style={{ display: 'inline-flex' }}>
          <Button
            className={buttonHome}
            icon={<AiOutlineMenu className="anticon" />}
          />
        </Col>
      </Row>

      <Row
        style={{
          height: '100%',
          display: 'inline-flex',
        }}
      >
        <Col>
          <Form.Item name="address">
            <Input
              placeholder="1.1.1.1"
              maxLength={10}
              // onChange={(input: React.ChangeEvent<HTMLInputElement>) => {
              //   const { value } = input.target;
              //   setTarget(value);
              // }}
              // value={target}
            />
          </Form.Item>
        </Col>
        <Col>alo</Col>
        <Col>alo</Col>
      </Row>
    </Row>
  );
};
export default Home;
