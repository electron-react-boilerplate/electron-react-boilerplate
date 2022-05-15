// import { useState } from 'react';
import './App.css';
import { Layout, Divider } from '@douyinfe/semi-ui';
import TopMenu from './components/TopMenu/index.jsx';
import AppRouter from './router/index.jsx';
import routers from './router/router';

function App() {
  const { Header, Content } = Layout;
  return (
    <Layout className="z-db-layou">
      <Header>
        <TopMenu />
      </Header>
      <Divider />
      <Layout>
        <Content>
          <AppRouter routers={routers} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
