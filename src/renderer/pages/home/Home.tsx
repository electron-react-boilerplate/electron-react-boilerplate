import { Button, Col, Form, Input, List, Row, Typography } from 'antd';
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
  const resp = window.electron.ipcRenderer.on('startScan', (response: any) => {
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

  const [formValues, setFormValues] = useState<FormParam>();
  console.log(formValues);
  async function startScan() {
    const { address, scanType } = formValues as FormParam;
    window.electron.ipcRenderer.sendMessage('startScan', [address, scanType]);
    setLoading(true);
  }

  async function cancelScan() {
    window.electron.ipcRenderer.sendMessage('cancelScan', []);
  }

  // eslint-disable-next-line consistent-return
  // window.document.addEventListener('keypress', (event) => {
  //   if (event.key === 'Enter' && (formValues?.address?.length as any) >= 7)
  //     return onFinish();
  // });

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
        <Form
          form={form}
          style={{ display: 'flex' }}
          onValuesChange={(changedValues, allValues) => {
            setFormValues((oldValues) => ({ ...oldValues, ...allValues }));
          }}
        >
          <Col>
            <Form.Item className={filtersInput} name={formFormat.address}>
              <Input placeholder="1.1.1.1" disabled={loading} />
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
            disabled={
              loading ||
              (formValues?.address?.length as any) <= 7 ||
              !formValues
            }
            onClick={() => {
              startScan();
            }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 55 }}>
        <Col>
          <List
            itemLayout="horizontal"
            size="small"
            bordered
            style={{
              backgroundColor: '#D9D9D9',
            }}
            loading={loading}
            dataSource={dataSource}
            renderItem={(item, index) => {
              return (
                <Row key={index}>
                  {item?.hostName?.[index]?.names?.length > 0 && (
                    <List.Item>
                      {item?.hostName?.[index]?.names?.[index]?.name?.name}
                    </List.Item>
                  )}
                  <List.Item>
                    {item?.address?.find((addr) => addr?.addr)?.addr}
                  </List.Item>
                  <List.Item>
                    {item?.ports?.map((serv) => {
                      return (
                        <>
                          <List.Item>
                            <Typography.Text>
                              port: {serv.number}
                            </Typography.Text>
                          </List.Item>
                          <Row>
                            <Typography.Text>
                              service: {serv.service}
                            </Typography.Text>
                          </Row>
                          <Row>
                            <Typography.Text>
                              state: {serv.state}
                            </Typography.Text>
                          </Row>
                        </>
                      );
                    })}
                  </List.Item>
                </Row>
              );
            }}
          />
        </Col>
      </Row>
    </Row>
  );
};
export default Home;
