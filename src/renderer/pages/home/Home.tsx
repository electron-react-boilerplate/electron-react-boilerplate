import {
  Button,
  Col,
  Divider,
  Dropdown,
  Form,
  Input,
  List,
  MenuProps,
  Row,
  Select,
} from 'antd';
import { createUseStyles } from 'react-jss';
import { AiOutlineMenu, AiOutlineSend } from 'react-icons/ai';
import { MdOutlineCancelScheduleSend } from 'react-icons/md';
import { useEffect, useState } from 'react';
import {
  ITcpScanResponse,
  ITcpScanSelect,
} from '../../../tools/network-scan/types/scan-network-response.types';

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
});
type FormParam = {
  address: string;
  scanType?: string[];
  port?: string;
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
  const { buttonStyle, buttonSend } = useStyle();
  const formName = {
    address: 'address',
    scanType: 'scanType',
    port: 'port',
  };

  const [formValues, setFormValues] = useState<FormParam>();
  const { Option } = Select;
  async function startScan() {
    const { address, scanType, port } = formValues as FormParam;
    window.electron.ipcRenderer.sendMessage('startScan', [
      address,
      scanType,
      port ? `-p${port}` : port,
    ]);
    setLoading(true);
  }

  async function cancelScan() {
    window.electron.ipcRenderer.sendMessage('cancelScan', []);
    setLoading(false);
  }

  // eslint-disable-next-line consistent-return
  // window.document.addEventListener('keypress', (event) => {
  //   if (event.key === 'Enter' && (formValues?.address?.length as any) >= 7)
  //     return startScan();
  //   return cancelScan();
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
                protocol: port?.protocol,
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

  const menu: MenuProps['items'] = [
    {
      key: '1',
      type: 'group',
      label: 'Comming soon',
      // children: [
      //   {
      //     key: '1-1',
      //     label: '1st menu item',
      //   },
      //   {
      //     key: '1-2',
      //     label: '2nd menu item',
      //   },
      // ],
    },
  ];
  return (
    <div>
      <Row>
        <Form
          form={form}
          style={{
            display: 'flex',
            marginLeft: '30px',
            marginTop: '16px',
          }}
          onValuesChange={(changedValues, allValues) => {
            setFormValues((oldValues) => ({ ...oldValues, ...allValues }));
          }}
        >
          <Col>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name={formName.address}
            >
              <Input
                style={{ width: '100%' }}
                placeholder="1.1.1.1"
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Scan Type" name={formName.scanType}>
              <Select
                placeholder="Select"
                allowClear
                mode="multiple"
                style={{ width: '200px' }}
              >
                {Object.keys(ITcpScanSelect).map((type) => (
                  <Option
                    disabled={
                      formValues?.scanType?.find((e) => e === '-sS')
                        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          ITcpScanSelect[type] === '-sO'
                        : undefined
                    }
                    key={type}
                    label={type}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    value={ITcpScanSelect[type]}
                  >
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Port" name={formName.port}>
              <Input placeholder="1-80" />
            </Form.Item>
          </Col>
        </Form>

        <Col>
          {!loading ? (
            <Button
              style={{
                marginLeft: '16px',
                marginTop: '15px',
              }}
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
          ) : (
            <Button
              style={{
                backgroundColor: 'red',
                marginLeft: '16px',
                marginTop: '15px',
              }}
              className={buttonSend}
              icon={<MdOutlineCancelScheduleSend className="anticon" />}
              onClick={() => {
                cancelScan();
              }}
            />
          )}
        </Col>
        <Col>
          {/* <Button
            className={buttonStyle}
            icon={<AiOutlineMenu className="anticon" />}
          /> */}
          <Dropdown menu={{ items: menu }}>
            <Button
              className={buttonStyle}
              icon={<AiOutlineMenu className="anticon" />}
            />
          </Dropdown>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <List
            itemLayout="vertical"
            size="small"
            bordered
            style={{
              backgroundColor: '#D9D9D9',
              width: '100%',
              fontFamily: 'monospace',
              maxHeight: 612,
              overflow: 'auto',
            }}
            loading={loading}
            dataSource={dataSource}
            renderItem={(item, index) => {
              return (
                <>
                  <Divider dashed />
                  {item?.address?.length > 0 && (
                    <List.Item>
                      <p>
                        Name:{' '}
                        {item?.hostName?.[index]?.names?.[index]?.name?.name}
                      </p>
                      <Divider dashed />
                      <p>
                        Address:{' '}
                        {item?.address?.find((addr) => addr?.addr)?.addr}
                      </p>
                      {item?.ports?.map((serv) => {
                        return (
                          <>
                            <Divider />
                            <p>Port: {serv.number}</p>
                            <p>Protocol: {serv.protocol}</p>
                            <p>Service: {serv.service}</p>
                            {serv.osType && <p>OS Type: {serv.osType}</p>}
                            <p>State: {serv.state}</p>
                            <p>Product: {serv.product}</p>
                            <p>Device Type: {serv.deviceType}</p>
                            <p>Extra Info: {serv.extraInfo}</p>
                          </>
                        );
                      })}
                      <Divider />
                    </List.Item>
                  )}
                </>
              );
            }}
          />
        </Col>
      </Row>
    </div>
  );
};
export default Home;
