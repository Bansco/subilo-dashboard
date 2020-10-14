import React from 'react'
import { Layout, Menu, Skeleton, Empty, Spin, message, Tag, Alert } from 'antd'
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
        <Layout.Sider width={370} className="site-layout-background">
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
  const { data: jobs, error } = useRequest({
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

  if (!jobs) {
    return (
      <div className="skeletons">
        <Skeleton active />
      </div>
    )
  }

  const byProjects = Object.entries(
    groupBy(job => job.project, jobs.slice(0).sort(byDateDesc)),
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
        byProjects.length ? (
          byProjects.map(([project, logs]) => (
            <Menu.SubMenu
              key={`${agent.id}-${project}`}
              icon={<DatabaseOutlined />}
              title={project}
            >
              {logs
                .map((job) => (
                  <Menu.Item
                    key={`${agent.id}-${job.id}`}
                    icon={<CodeOutlined />}
                  >
                    <Link to={`/jobs/${agent.id}/${job.id}`} title={new Date(job.started_at).toLocaleString()}>
                      {job.started_at}
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
  const agent = useRecoilValue(getAgent(agentID));

  const { data: job, error: jobError } = useRequest({
    request: {
      url: `${agent.url}/jobs/${logID}`,
      headers: {
        Authorization: `Bearer ${agent.token}`,
      },
    },
  });

  const { data: logs, error: logsError } = useRequest({
    request: {
      url: `${agent.url}/jobs/${logID}/log`,
      headers: {
        Authorization: `Bearer ${agent.token}`,
      },
    },
  });

  if (jobError) {
    return (
      <Layout.Content className="job-detail">
        <div className="center">
          <Alert type="error" message="Couldn't load job metadata" />
        </div>
      </Layout.Content>
    )
  }

  return (
    <Layout.Content className="job-detail">
      {job ? (
        <>
          <JobHeader metadata={job} />
          <JobLogs logs={logs} error={logsError} />
        </>
      ) : (
        <div className="center">
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 45 }} spin />}
          />
        </div>
      )}
    </Layout.Content>
  );
}

function JobLogs({ logs, error }) {
  if (error) {
    return (
      <div className="center">
        <Alert type="error" message="Couldn't load logs for this job" />
      </div>
    )
  }

  if (!logs) {
    return (
      <div className="center">
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 45 }} spin />}
        />
      </div>
    )
  }
  return (
    <Layout className="job-code">
      {logs.split("\n").map((line, index) => (
        <Ansi
          key={index}
          className={line.startsWith("$ ") ? "job-command" : ""}
        >
          {line}
        </Ansi>
      ))}
    </Layout>
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

function byDateDesc(a, b) {
  return new Date(a.started_at).getTime() < new Date(b.started_at).getTime()
    ? 1 : -1
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
