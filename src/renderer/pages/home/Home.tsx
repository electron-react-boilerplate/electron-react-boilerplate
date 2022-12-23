import { Button, Col, Form, Input, List, Row } from 'antd';
import { createUseStyles } from 'react-jss';
import { AiOutlineMenu } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { ITcpScanResponse } from '../../../tools/network-scan/types/scan-network-response.types';
import validateIPaddress from '../../../common/validate-ip';

const useStyle = createUseStyles({
  buttonMenu: {
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
type FormParam = {
  address: string;
  scanType: string;
};
export const Home = () => {
  const [target, setTarget] = useState<ITcpScanResponse[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const resp = window.electron.ipcRenderer.on('scaner', (response: any) => {
    setTarget(response);
    setLoading(false);
  });
  useEffect(() => {}, [resp]);
  const [form] = Form.useForm();
  const { buttonMenu } = useStyle();
  const formFormat: FormParam = {
    address: 'address',
    scanType: 'scanType',
  };

  async function onFinish() {
    const { address, scanType }: FormParam = form.getFieldsValue();
    const validate = validateIPaddress(address);
    if (!validate) return;
    window.electron.ipcRenderer.sendMessage('scaner', [address, scanType]);
    setLoading(true);
  }
  const dataSource = target?.map((host) => {
    return {
      hostName: host.hostName,
      address: host.address,
      ports: host.ports[0].map((port) => {
        return {
          service: port.service,
          state: port.state,
          number: port.number,
          osType: port.osType,
          product: port.product,
          deviceType: port.deviceType,
          extraInfo: port.extraInfo,
        };
      }),
    };
  });
  console.log('TARGET', target);
  return (
    <Row gutter={[15, 15]}>
      <Row>
        <Col style={{ display: 'inline-flex' }}>
          <Button
            className={buttonMenu}
            icon={<AiOutlineMenu className="anticon" />}
          />
          .
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
            <Form.Item name={formFormat.address}>
              <Input placeholder="1.1.1.1" maxLength={15} />
            </Form.Item>
            <Form.Item name={formFormat.scanType}>
              <Input placeholder="scan type" maxLength={15} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Button
            loading={loading}
            disabled={loading}
            onClick={() => {
              onFinish();
            }}
          >
            Send
          </Button>
        </Col>
      </Row>
      <Row>
        <List
          loading={loading}
          header={target?.[0].address || ''}
          dataSource={dataSource}
          renderItem={(item) => {
            return (
              <Row>
                <List.Item>{item.hostName}</List.Item>
                <List.Item>
                  {item.ports.map((e, i) => {
                    return <List.Item key={i}>{e.number}</List.Item>;
                  })}
                </List.Item>
              </Row>
            );
          }}
        />
      </Row>
    </Row>
  );
};
export default Home;
