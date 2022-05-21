import { useState, useEffect } from 'react';
import { Layout, Button } from '@douyinfe/semi-ui';

function Home() {
  const { Header, Sider, Content } = Layout;

  useEffect(() => {
    window.electron.ipcRenderer.on('createConnection', (is, err) => {
      console.log(is, err);
      is === false && console.error(err);
    });
  }, []);

  const addCreateConn = () => {
    window.electron.ipcRenderer.sendMessage('createConnection', {
      // name: 'z-admin',
      host: 'gz-cynosdbmysql-grp-lhkcx3ln.sql.tencentcdb.com',
      port: '26832',
      user: 'root',
      password: 'Zzh@12345',
    });
  };

  return (
    <div style={{height: '100vh'}}>
      1312312
    </div>
  );
}

export default Home;
