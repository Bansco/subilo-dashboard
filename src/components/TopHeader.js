import React from 'react';
import {
  Link,
  useLocation
} from "react-router-dom";
import {
  Menu,
  Layout
} from 'antd';

const { Header } = Layout;

export default function CustomHeader() {
  const location = useLocation()
  const pathname = location.pathname;

  const selectedKeys = pathname.includes('/logs') ? '/logs' : pathname;

 return (
  <Header className="header">
    <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKeys]}>
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/logs">
        <Link to="/logs">Logs</Link>
      </Menu.Item>
    </Menu>
  </Header>
 )
}
