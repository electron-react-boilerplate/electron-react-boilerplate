import {
  Typography,
  Modal,
  Tabs,
  TabPane,
  Form,
  Button,
  useFormApi,
  Spin
} from "@douyinfe/semi-ui";
import { IconFile, IconGlobe } from "@douyinfe/semi-icons";
import { FormApi } from "@douyinfe/semi-ui/lib/es/form";
import "./index.scss"

// 普通连接的默认值
const initNormalValues = {
  connectionName: "z-admin",
  host: "gz-cynosdbmysql-grp-lhkcx3ln.sql.tencentcdb.com",
  port: "26832",
  username: "root",
  password: "Zzh@12345",
  rememberPassword: false,
};

export interface Config {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  onConnect: (values: any) => void;
  onTestConnect: (values: any) => void;
  onafterClose: () => void;
  isSpiking: boolean;
  tip: string;
  title: string;
}

function FromModal({
  visible,
  onCancel,
  onafterClose,
  onOk,
  title,
  onConnect,
  onTestConnect,
  isSpiking,
  tip
} : Config) {
  const { Text} = Typography
  const rule = [{ required: true, message: "该项为必填项" }];
  let fromApi = useFormApi();
  const getFrom = (from: FormApi<any>) => (fromApi = from);

  const onSubmitConn = async (type: string) => {
    try {
      const value = await fromApi.validate();
      if (type === 'testConnect') {
        onTestConnect(value);
      } else if (type === 'connect') {
        onConnect(value);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const footer = (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button type="primary" theme="borderless" onClick={() => onSubmitConn("testConnect")}>
        测试连接
      </Button>
      <Button type="primary" theme="borderless" onClick={() => onSubmitConn("connect")}>
        保存并连接
      </Button>
    </div>
  );

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      afterClose={onafterClose}
      onCancel={onCancel}
      footer={footer}
      className="z-db-modal-from"
    >
      <Spin spinning={isSpiking} tip={tip}>
      <Tabs>
        <TabPane
          tab={
            <span>
              <IconFile />
              <Text>常规连接</Text>
            </span>
          }
          itemKey="1"
        >
          <Form getFormApi={getFrom} initValues={initNormalValues}>
            <Form.Input
              field="connectionName"
              label="连接名"
              placeholder="请输入连接名"
              rules={rule}
            />
            <Form.Input
              field="host"
              label="主机"
              placeholder="请输入主机地址"
              rules={rule}
            />
            <Form.Input field="port" label="端口" placeholder="请输入端口号" />
            <Form.Input
              field="username"
              label="用户名"
              placeholder="请请输入用户名"
              rules={rule}
            />
            <Form.Input
              field="password"
              label="密码"
              placeholder="请输入密码"
            />
          </Form>
        </TabPane>
        <TabPane
          tab={
            <span>
              <IconGlobe />
              <Text>高级连接</Text>
            </span>
          }
          itemKey="2"
        >
          开发中
        </TabPane>
      </Tabs>
      </Spin>
    </Modal>
  );
}

export default FromModal;
