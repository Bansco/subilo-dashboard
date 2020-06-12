import React from 'react';
import {
  Link,
  useLocation
} from "react-router-dom";
import {
  Menu,
  Layout
} from 'antd';

import './TopHeader.css';

const { Header } = Layout;

export default function CustomHeader() {
  const location = useLocation()
  const pathname = location.pathname;
  const selectedKeys = pathname.includes('/logs') ? '/logs' : pathname;

 return (
  <Header className="header">
      <div className="logo">
        <Link to="/">
          <h2>TRESH</h2>
        </Link>
      </div>
    <Menu mode="horizontal" selectedKeys={[selectedKeys]}>
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
