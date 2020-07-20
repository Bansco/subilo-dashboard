import React from 'react';
import {
  Link,
  useLocation
} from "react-router-dom";
import {
  Menu,
  Layout
} from 'antd';
import { GithubOutlined } from '@ant-design/icons'
import logoImg from '../assets/logo.png'
import './TopHeader.css';

const { Header } = Layout;
const githubLogoStyles = { marginLeft: '10px', marginRight: 0 }

export default function CustomHeader(props) {
  const location = useLocation()
  const pathname = location.pathname;
  const selectedKeys = pathname.includes('/jobs') ? '/jobs' : pathname;

 return (
  <Header className="header">
  <div className="logo">
    <Link to="/">
      <img src={logoImg} width={30} alt="logo" />
      <h2>SUBILO</h2>
    </Link>
  </div>
    <Menu mode="horizontal" selectedKeys={[selectedKeys]} className="menu-navigation">
      <Menu.Item key="/">
         <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/jobs">
        <Link to="/jobs">Jobs</Link>
      </Menu.Item>
      <Menu.Item key="/agents">
        <Link to="/agents">Agents</Link>
      </Menu.Item>
      <Menu.Item key="/docs">
        <a href="https://github.com/huemul/subilo#subilo">Docs</a>
        <GithubOutlined style={githubLogoStyles} />
      </Menu.Item>
    </Menu>
  </Header>
 )
}
