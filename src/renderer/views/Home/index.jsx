import { useState } from 'react';
import { Layout } from '@douyinfe/semi-ui';
import { Link } from "react-router-dom";

function Home() {
  const { Header, Sider, Content } = Layout;
  return (
    <Layout className="z-db-layou">
      <Sider className="z-db-sider">Sider</Sider>
      <Layout>
        <Header>123213</Header>
        <Content>
        <Link to="/" >Home2</Link>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home;
