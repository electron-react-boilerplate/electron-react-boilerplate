import { Button, Col, Form, Input, List, Row } from 'antd';
import { createUseStyles } from 'react-jss';
import { AiOutlineMenu, AiOutlineSend } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { ITcpScanResponse } from '../../../tools/network-scan/types/scan-network-response.types';

const useStyle = createUseStyles({
  buttonStyle: {
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
  buttonSend: {
    marginTop: '-5px',
    backgroundColor: 'white',
    padding: '1px 10px',
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
  filtersInput: {
    width: '49%',
    // border: '1px solid #000',
    marginRight: '10px',
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
  const { buttonStyle, buttonSend, filtersInput } = useStyle();
  const formFormat: FormParam = {
    address: 'address',
    scanType: 'scanType',
  };

  async function onFinish() {
    const { address, scanType }: FormParam = form.getFieldsValue();
    window.electron.ipcRenderer.sendMessage('scaner', [address, scanType]);
    setLoading(true);
  }
  const dataSource =
    target instanceof Array
      ? target?.map((hosts) => {
          return {
            hostName: hosts?.hostName?.map((host) => {
              return {
                names: host?.names?.map((name) => {
                  return {
                    name,
                  };
                }),
              };
            }),
            address: hosts?.address?.map((addr) => {
              return {
                addr: addr?.addr,
                addrType: addr?.addrType,
              };
            }),
            ports: hosts?.ports?.[0]?.map((port) => {
              return {
                service: port?.service,
                state: port?.state,
                number: port?.number,
                osType: port?.osType,
                product: port?.product,
                deviceType: port?.deviceType,
                extraInfo: port?.extraInfo,
              };
            }),
          };
        })
      : undefined;
  return (
    <Row gutter={[15, 15]}>
      <Row>
        <Col style={{ display: 'inline-flex' }}>
          <Button
            className={buttonStyle}
            icon={<AiOutlineMenu className="anticon" />}
          />
          .
        </Col>
      </Row>
      <Row
        style={{
          height: '100%',
          display: 'inline-flex',
          width: '100%',
          float: 'left',
          textAlign: 'justify',
          marginBottom: '15px',
        }}
      >
        <Form form={form} style={{ display: 'flex' }}>
          <Col>
            <Form.Item className={filtersInput} name={formFormat.address}>
              <Input placeholder="1.1.1.1" maxLength={19} disabled={loading} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className={filtersInput} name={formFormat.scanType}>
              <Input
                placeholder="scan type"
                maxLength={15}
                disabled={loading}
              />
            </Form.Item>
          </Col>
        </Form>
        <Col>
          <Button
            className={buttonSend}
            icon={<AiOutlineSend className="anticon" />}
            loading={loading}
            disabled={loading}
            onClick={() => {
              onFinish();
            }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 55 }}>
        <Col>
          <List
            size="small"
            bordered
            style={{
              backgroundColor: '#D9D9D9',
            }}
            loading={loading}
            dataSource={dataSource}
            renderItem={(item) => {
              return [
                <List.Item>
                  {item?.address?.find((addr) => addr?.addr)?.addr}
                </List.Item>,
                <List.Item>
                  {
                    item.hostName?.[0]?.names?.find((names) => names?.name)
                      ?.name?.name
                  }
                </List.Item>,
              ]; // item.address.map((addr) => addr.addr);
            }}
          />
        </Col>
      </Row>
    </Row>
  );
};
export default Home;
