import './App.css';
import { Layout, SideSheet, Toast, Typography } from '@douyinfe/semi-ui';
import TopMenu from './components/TopMenu/index.jsx';
import AppHome from './views/Home';
import AppSider from './views/Sider';
import ConnectFrom from './components/ConnectForm/index';
import { useState, useEffect } from 'react';

function App() {
  const { Header, Content } = Layout;
  const { Text } = Typography

  const { sendMessage, on } = window.electron.ipcRenderer;

  const [visible, setVisible] = useState(false);

  const [modalvis, setModalvis] = useState(false);
  const [modalTitle, setModaltitle] = useState('新增连接');
  const [isLoading, setIsLoading] = useState(false);

  const change = () => {
    setVisible(!visible);
  };

  const onCheckConnect = () => {
    setVisible(true);
  };

  const onAddConnection = (type: string) => {
    setModaltitle(`新增${type}连接`);
    setModalvis(true);
  };

  const handleOk = () => {
    setModalvis(false);
  };

  const handleCancel = () => {
    setModalvis(false);
  };

  const handleAfterClose = () => {
    setVisible(false);
  };

  const connectHandler = (values: any) => {
    sendMessage('addConnection', {
      connectType: "mysql",
      ...values,
    });
  }

  const testConnectHandler = (values: any) => {
    setIsLoading(true);
    sendMessage('testConnection', values)
  }

  useEffect(() => {
    on('testConnection', (data) => {
      setIsLoading(false);
      if (data === true) {
        Toast.success({
          content: (<Text type="success"> 连接成功 </Text>)
        });
      } else {
        Toast.error({
          content: (<Text type="danger"> {`连接失败: ${data}`} </Text>)
        })
      }
    })

    sendMessage('getConnectData');

    on('getConnectData', (data) => {
      console.log(data);
    })

  }, [])

  return (
    <>
      <Layout className="z-db-layou">
        <AppSider
          onCheckConnect={onCheckConnect}
          onAddConnection={onAddConnection}
        />
        <Layout>
          <Header>
            <TopMenu />
          </Header>
          <Content className="z-db-content">
            <AppHome />
          </Content>
        </Layout>
      </Layout>

      <SideSheet title="连接列表" visible={visible} onCancel={change}>
        <p>This is the content of a basic sidesheet.</p>
        <p>Here is more content...</p>
      </SideSheet>

      <ConnectFrom
        isSpiking={isLoading}
        title={modalTitle}
        visible={modalvis}
        onOk={handleOk}
        onafterClose={handleAfterClose}
        onCancel={handleCancel}
        onConnect={connectHandler}
        onTestConnect={testConnectHandler}
        tip="连接成功"
      ></ConnectFrom>
    </>
  );
}

export default App;
