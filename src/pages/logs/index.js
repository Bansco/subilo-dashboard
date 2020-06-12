import React from 'react'
import {
  Layout,
  Menu,
  Skeleton
} from 'antd';
import {
  Link,
  useParams
} from "react-router-dom";
import useRequest from '../../util/useRequest'
import {
  AlignLeftOutlined
} from '@ant-design/icons';

import './index.css';

const { Sider, Content } = Layout;

export default  function Logs() {
  const { id } = useParams();

  const { data } = useRequest({
    url: 'https://jsonplaceholder.typicode.com/posts'
  })

  console.log(data)

  return (
    <Layout className="logs-section">
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[id]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
            data ? data.map(({id, title}) => (
              <Menu.Item key={id} icon={<AlignLeftOutlined />}>
                <Link to={`/logs/${id}`}>{title}</Link>
              </Menu.Item>
            )) : (
              <div className="skeletons">
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
            </div>
            )
          }
        </Menu>
      </Sider>

      <Content>
        <LogDetail id={id} />
      </Content>
    </Layout>
  )
}



function LogDetail({ id }) {
  if (!id) {
    return null;
  }

  return <p>aca id: {id}</p>;
}
