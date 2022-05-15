// import { useState } from 'react';
import './App.css';
import { Layout } from '@douyinfe/semi-ui';
import TopMenu from './components/TopMenu/index.jsx';
import AppHome from './views/Home';
import AppSider from './views/Sider';

function App() {
  const { Header, Content } = Layout;
  return (
    <Layout className="z-db-layou">

      <AppSider />
      <Layout>
        <Header><TopMenu /></Header>
        <Content>
          <AppHome />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
