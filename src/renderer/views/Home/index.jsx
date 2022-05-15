import { useState } from 'react';
import { Layout } from '@douyinfe/semi-ui';

function Home() {
  const { Header, Sider, Content } = Layout;
  return (
    <Layout className="z-db-layou">
      <Sider className="z-db-sider">Sider</Sider>
      <Layout>
        <Header>123213</Header>
        <Content>123123</Content>
      </Layout>
    </Layout>
  );
}

export default Home;
