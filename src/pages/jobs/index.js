import React from 'react'
import {
  Layout,
  Menu,
  Skeleton,
  Empty,
  Spin,
} from 'antd';
import {
  Link,
  useParams,
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
  getAgent,
} from '../../store'

import './index.css';

export default  function Jobs() {
  const agents = useRecoilValue(agentsState);
  const { agentID, logID } = useParams();

  return (
    <Layout className="jobs-section">
      <Layout.Sider width={300} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[`${agentID}-${logID}`]}
          defaultOpenKeys={[agentID]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {agents.map((agent) => (
            <AgentSubMenu key={agent.id} agent={agent}/>
          ))}
        </Menu>
      </Layout.Sider>

      {agents && logID && <LogDetail agentID={agentID} logID={logID.replace('.log', '')} />}
      {(!agentID || !logID) && <Layout.Content><Empty className="center" description={false}/></Layout.Content>}
    </Layout>
  )
}

function AgentSubMenu({ agent, ...rest }) {
  const { data: logs } = useRequest({
    request: {
      url: `${agent.url}/logs`,
      headers: {
        Authorization: `Bearer ${agent.token}`
      }
    }
  })

  if (!logs) {
    return (
      <div className="skeletons">
        <Skeleton active/>
      </div>
    );
  }

  return (
    <Menu.SubMenu {...rest} key={agent.id} icon={<AlignLeftOutlined />} title={agent.name}>
      {logs.map(log => (
        <Menu.Item key={`${agent.id}-${log}`}>
          <Link to={`/jobs/${agent.id}/${log}`}>{log}</Link>
        </Menu.Item>
      ))}
    </Menu.SubMenu>
  )
}

function LogDetail({ agentID, logID }) {
  const agent = useRecoilValue(getAgent(agentID));

  const { data } = useRequest({
    request: {
      url: `${agent.url}/logs/${logID}`,
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
