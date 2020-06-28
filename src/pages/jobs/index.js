import React from 'react'
import {
  Layout,
  Menu,
  Skeleton,
  Empty,
  Spin,
  message,
  Tag
} from 'antd';
import {
  Link,
  useParams,
} from "react-router-dom";
import useRequest from '../../util/useRequest'
import {
  DesktopOutlined,
  CodeOutlined,
  LoadingOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import {
  useRecoilValue,
 } from 'recoil';
import {
  agentsState,
  getAgent,
} from '../../store'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'

import './index.css';

export default  function Jobs() {
  const agents = useRecoilValue(agentsState);
  const { agentID, logID } = useParams();
  const emptyAgents = agents && !agents.length;
  const emptyContentDescription = emptyAgents ? <NoAgents/> : false;
  const firstAgentID = !emptyAgents && agents[0].id;
  const defaultOpenKeys = agentID || firstAgentID

  return (
    <Layout className="jobs-section">
      {!emptyAgents && (
        <Layout.Sider width={300} className="site-layout-background">
          <Menu
            mode="inline"
            className="jobs-list"
            selectedKeys={[`${agentID}-${logID}`]}
            defaultOpenKeys={[defaultOpenKeys]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {agents.map((agent) => (
              <AgentSubMenu key={agent.id} agent={agent}/>
            ))}
          </Menu>
        </Layout.Sider>
      )}

      {agents && logID && <LogDetail agentID={agentID} logID={logID.replace('.log', '')} />}
      {(!agentID || !logID) && <Layout.Content><Empty className="center" description={emptyContentDescription}/></Layout.Content>}
    </Layout>
  )
}

function AgentSubMenu({ agent, ...rest }) {
  const { data: logs, error } = useRequest({
    request: {
      url: `${agent.url}/jobs`,
      headers: {
        Authorization: `Bearer ${agent.token}`
      }
    }
  })

  if (error) {
    return (
      <Menu.Item {...rest} key={agent.id} icon={<WarningOutlined />} onClick={() => message.error(JSON.stringify(error))}>
        Couldn't connect to {agent.name}
      </Menu.Item>
    )
  }

  if (!logs) {
    return (
      <div className="skeletons">
        <Skeleton active/>
      </div>
    );
  }

  return (
    <Menu.SubMenu {...rest} key={agent.id} icon={<DesktopOutlined />} title={agent.name}>
      {logs.length && logs.map(log => (
        <Menu.Item key={`${agent.id}-${log}`} icon={<CodeOutlined />}>
          <Link to={`/jobs/${agent.id}/${log}`}>{log}</Link>
        </Menu.Item>
      ))}

      {!logs.length && (
        <Menu.Item key={`${agent.id}-no-logs`} icon={<CodeOutlined />}>
          No Logs
        </Menu.Item>
      )}
    </Menu.SubMenu>
  )
}

function LogDetail({ agentID, logID }) {
  const agent = useRecoilValue(getAgent(agentID));

  const { data, error } = useRequest({
    request: {
      url: `${agent.url}/jobs/${logID}`,
      headers: {
        Authorization: `Bearer ${agent.token}`
      }
    }
  })

  if (error) {
    return  'Couldn\'t load logs for this job'
  }

  return (
    <Layout.Content className="job-detail">
      {data && (
        <>
          <JobHeader metadata={data.metadata}/>
          <Layout className="job-code">
            {data.log.split('\n').map((line, index) => (
              <code key={index}>
                {line}
              </code>
            ))}
          </Layout>
        </>
      )}

      {!data && (
        <div className="center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 45 }} spin />} />
        </div>
      )}
    </Layout.Content>
  );
}

function JobHeader({ metadata }) {
  const startedAt = new Date(metadata.started_at);
  const endedAt = metadata.ended_at && new Date(metadata.ended_at);
  return (
    <div className="job-header">
      <div className="project-name">
        <h2>{metadata.name}</h2>
        <StatusLabel status={metadata.status}/>
      </div>
      {endedAt && (
        <>
        <div title={`Started at: ${startedAt}`}>
          <b>Duration:</b> {formatDistanceStrict(endedAt, startedAt)}
        </div>
        <div title={`Ended at: ${endedAt}`}>
          <b>Finished:</b> {formatDistanceToNow(endedAt)} ago
        </div>
        </>
      )}
    </div>
  )
}

function StatusLabel({ status }) {
  if (status === 'pending') {
    return (
      <Tag icon={<SyncOutlined spin />} color="processing">
        Pending
      </Tag>
    )
  } else if (status === 'failed') {
    return (
      <Tag icon={<WarningOutlined />} color="error">
        Failed
      </Tag>
    )
  } else if (status === 'succeeded') {
    return (
      <Tag icon={<CheckCircleOutlined />} color="success">
        Success
      </Tag>
    )
  }

  return null;
}

function NoAgents() {
  return (
    <span>
      No jobs. Please, create an <Link to="/agents">agent</Link> first.
    </span>
  )
}
