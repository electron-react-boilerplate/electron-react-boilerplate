import { Form, Row } from 'antd';
import { Home } from './Home';

const SendTargets = () => {
  const [form] = Form.useForm();
  console.log(form.getFieldsValue());
  return (
    <Row>
      <Form>
        <Home />
      </Form>
    </Row>
  );
};
export default SendTargets;
