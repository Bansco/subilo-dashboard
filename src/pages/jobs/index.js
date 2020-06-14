import React from 'react'
import {
  Layout,
  Menu,
  Skeleton,
  Empty,
  Spin
} from 'antd';
import {
  Link,
  useParams
} from "react-router-dom";
import useRequest from '../../util/useRequest'
import {
  AlignLeftOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import {
  useRecoilValue,
 } from 'recoil';
import {
  agentsState,
} from '../../store'

import './index.css';

export default  function Jobs() {
  const agents = useRecoilValue(agentsState);
  const { id } = useParams();

  const agent = agents[0];

  const { data } = useRequest({
    request: {
      url: `${agent.url}/logs`,
      headers: {
        Authorization: `Bearer ${agent.token}`
      }
    }
  })

  return (
    <Layout className="jobs-section">
      <Layout.Sider width={300} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[id]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
            data ? data.map((logName) => (
              <Menu.Item key={logName} icon={<AlignLeftOutlined />}>
                <Link to={`/jobs/${logName}`}>{logName}</Link>
              </Menu.Item>
            )) : (
              <div className="skeletons">
              <Skeleton active/>
              <Skeleton active/>
              <Skeleton active/>
            </div>
            )
          }
        </Menu>
      </Layout.Sider>

      {id && <JobDetail agent={agent} id={id.replace('.log', '')} />}
      {!id && <Layout.Content><Empty className="center" description={false}/></Layout.Content>}
    </Layout>
  )
}



function JobDetail({ agent, id }) {
  const { data } = useRequest({
    request: {
      url: `${agent.url}/logs/${id}`,
      headers: {
        Authorization: `Bearer ${agent.token}`
      }
    }
  })

  return (
    <Layout.Content className="job-detail">
      {data && (
        <Layout className="job-code">
          {data.split('\n').map((line, index) => (
            <code key={index}>
              {line}
            </code>
          ))}
        </Layout>
      )}

      {!data && (
        <div className="center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 45 }} spin />} />
        </div>
      )}
    </Layout.Content>
  );
}
