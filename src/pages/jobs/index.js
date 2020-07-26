import React from 'react'
import { Layout, Menu, Skeleton, Empty, Spin, message, Tag } from 'antd'
import { Link, useParams } from 'react-router-dom'
import useRequest from '../../util/useRequest'
import {
  DesktopOutlined,
  CodeOutlined,
  LoadingOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  DatabaseOutlined,
} from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { agentsState, getAgent } from '../../store'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import Ansi from 'ansi-to-react'

import './index.css'

export default function Jobs() {
  const agents = useRecoilValue(agentsState)
  const { agentID, logID } = useParams()
  const emptyAgents = agents && !agents.length
  const emptyContentDescription = emptyAgents ? <NoAgents /> : false
  const firstAgentID = !emptyAgents && agents[0].id
  const defaultOpenKeys = agentID || firstAgentID

  return (
    <Layout className="jobs-section">
      {!emptyAgents && (
        <Layout.Sider width={320} className="site-layout-background">
          <Menu
            mode="inline"
            className="jobs-list"
            selectedKeys={[`${agentID}-${logID}`]}
            defaultOpenKeys={[defaultOpenKeys]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {agents.map(agent => (
              <AgentSubMenu key={agent.id} agent={agent} />
            ))}
          </Menu>
        </Layout.Sider>
      )}

      {agents && logID && (
        <LogDetail agentID={agentID} logID={logID.replace('.log', '')} />
      )}
      {(!agentID || !logID) && (
        <Layout.Content>
          <Empty
            className="center"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={emptyContentDescription}
          />
        </Layout.Content>
      )}
    </Layout>
  )
}

function AgentSubMenu({ agent, ...rest }) {
  const { data: logs, error } = useRequest({
    request: {
      url: `${agent.url}/jobs`,
      headers: {
        Authorization: `Bearer ${agent.token}`,
      },
    },
  })

  if (error) {
    return (
      <Menu.Item
        {...rest}
        key={agent.id}
        icon={<WarningOutlined />}
        onClick={() => message.error(JSON.stringify(error))}
      >
        Couldn't connect to {agent.name}
      </Menu.Item>
    )
  }

  if (!logs) {
    return (
      <div className="skeletons">
        <Skeleton active />
      </div>
    )
  }

  const projects = Object.entries(
    groupBy(projectNameFromJobId, logs.slice(0).sort(byDateDesc)),
  )

  return (
    <Menu.SubMenu
      {...rest}
      key={agent.id}
      icon={<DesktopOutlined />}
      title={agent.name}
    >
      {
        // If there are projects, each will have at least one log (because of grogroupBy)
        projects.length ? (
          projects.map(([project, logs]) => (
            <Menu.SubMenu
              key={`${agent.id}-${project}`}
              icon={<DatabaseOutlined />}
              title={project}
            >
              {logs
                .map(log => [log, getFormattedJobDate(log)])
                .map(([log, date]) => (
                  <Menu.Item
                    key={`${agent.id}-${log}`}
                    icon={<CodeOutlined />}
                  >
                    <Link to={`/jobs/${agent.id}/${log}`} title={date}>
                      {date}
                    </Link>
                  </Menu.Item>
                ))}
            </Menu.SubMenu>
          ))
        ) : (
          <Menu.Item key={`${agent.id}-no-logs`} icon={<CodeOutlined />}>
            No Logs
          </Menu.Item>
        )
      }
    </Menu.SubMenu>
  )
}

function LogDetail({ agentID, logID }) {
  const agent = useRecoilValue(getAgent(agentID))

  const { data, error } = useRequest({
    request: {
      url: `${agent.url}/jobs/${logID}`,
      headers: {
        Authorization: `Bearer ${agent.token}`,
      },
    },
  })

  if (error) {
    return "Couldn't load logs for this job"
  }

  return (
    <Layout.Content className="job-detail">
      {data && (
        <>
          <JobHeader metadata={data.metadata} />
          <Layout className="job-code">
            {data.log.split('\n').map((line, index) => (
              <Ansi
                key={index}
                className={line.startsWith('$ ') ? 'job-command' : ''}
              >
                {line}
              </Ansi>
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
  )
}

function JobHeader({ metadata }) {
  const startedAt = new Date(metadata.started_at)
  const endedAt = metadata.ended_at && new Date(metadata.ended_at)
  return (
    <div className="job-header">
      <div className="project-name">
        <h2>{metadata.name}</h2>
        <StatusLabel status={metadata.status} />
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
  if (status === 'started') {
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

  return null
}

function NoAgents() {
  return (
    <span>
      No jobs. Please, create an <Link to="/agents">agent</Link> first.
    </span>
  )
}

const DATE_LENGTH = 20

function getFormattedJobDate(id) {
  const [year, month, day, , hour, minute, second] = jobDateFromId(id).split(
    '-',
  )

  const timestamp = Date.UTC(year, month, day, hour, minute, second)
  return new Date(timestamp).toLocaleString()
}

function projectNameFromJobId(id) {
  return id
    .split('')
    .reverse()
    .slice(DATE_LENGTH)
    .reverse()
    .join('')
    .replace(/_$/, '')
}

function jobDateFromId(id) {
  return id.split('').slice(-DATE_LENGTH).join('')
}

function byDateDesc(a, b) {
  return jobDateFromId(a) < jobDateFromId(b) ? 1 : -1
}

function groupBy(by, xs) {
  return xs.reduce((acc, x) => {
    const key = by(x)
    if (acc[key]) {
      acc[key].push(x)
    } else {
      acc[key] = [x]
    }

    return acc
  }, {})
}
