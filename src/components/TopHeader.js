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
  const selectedKeys = pathname.includes('/jobs') ? '/jobs' : pathname;

 return (
  <Header className="header">
      <div className="logo">
        <Link to="/jobs">
          <h2>SUBILO</h2>
        </Link>
      </div>
    <Menu mode="horizontal" selectedKeys={[selectedKeys]}>
      <Menu.Item key="/jobs">
        <Link to="/jobs">Jobs</Link>
      </Menu.Item>
      <Menu.Item key="/agents">
        <Link to="/agents">Agents</Link>
      </Menu.Item>
    </Menu>
  </Header>
 )
}
