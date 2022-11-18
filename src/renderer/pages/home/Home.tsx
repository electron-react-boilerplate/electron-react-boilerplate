import { Button, Col, Form, Input, Row } from 'antd';
import { createUseStyles } from 'react-jss';
import { AiOutlineMenu } from 'react-icons/ai';
import { ipcMain } from 'electron';
import { graphqlMutation } from '../../../api/test';

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
  const [form] = Form.useForm();
  const { buttonHome } = useStyle();

  async function onFinish() {
    const { address } = form.getFieldsValue();
  }

  async function nextStep() {
    await onFinish();
  }

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
          <Form form={form}>
            <Form.Item name="address">
              <Input placeholder="1.1.1.1" maxLength={15} />
            </Form.Item>
          </Form>
        </Col>
        <Col>alo</Col>
        <Col>
          <Button onClick={() => nextStep()}>Send</Button>
        </Col>
      </Row>
    </Row>
  );
};
export default Home;
