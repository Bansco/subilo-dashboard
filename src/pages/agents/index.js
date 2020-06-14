import React, { useState, useEffect } from 'react'
import {
  Layout,
  Button,
  Table,
  Tag,
  Space,
  Drawer,
  Form,
  Input
} from 'antd';
import {
  useParams
} from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import {
  useRecoilValue,
  useSetRecoilState
 } from 'recoil';
import {
  agentsState,
  getAgent,
} from '../../store'

import './index.css';

export default function Agents() {
  const { id } = useParams();
  const [isAgentDetailVisible, setIsAgentDetailVisible] = useState(!!id);
  const [selectedID, setSelectedID] = useState(id);
  const setAgents = useSetRecoilState(agentsState)

  useEffect(() => {
    if (selectedID) {
      setIsAgentDetailVisible(true);
    }
  }, [selectedID])

  function onSubmit(agentToSave) {
    setAgents((oldAgents) => {
      if (agentToSave.id) {
        return oldAgents.map(agent => {
          if (agent.id === agentToSave.id) {
            return agentToSave
          }
          return agent;
        })
      }

      return [
        ...oldAgents,
        {
          ...agentToSave,
          id: getRandomID()
        }
      ]
    })
    hideAgentDetail();
  }

  function hideAgentDetail() {
    setIsAgentDetailVisible(false);
    setSelectedID(null);
  }

  return (
    <Layout className="agents-section">
      <Layout.Content>
      <div className="section-actions">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAgentDetailVisible(true)}
        >
          New Agent
        </Button>
      </div>
      <AgentsList setSelectedID={setSelectedID} />
      <AgentDetail
        id={selectedID}
        isVisible={isAgentDetailVisible}
        onSubmit={onSubmit}
        onClose={hideAgentDetail}
      />
      </Layout.Content>
    </Layout>
  )
}

function AgentsList({ setSelectedID }) {
  const agents = useRecoilValue(agentsState);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => (
        <>
          {status.map(tag => {
            const color = tag === 'online' ? 'green' : 'red';
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            shape="circle"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setSelectedID(record.id)}
          />
          <Button shape="circle" type="primary" icon={<DeleteOutlined />}/>
        </Space>
      ),
    },
  ];

  const data = agents.map((agent, index) => ({
    key: index,
    id: agent.id,
    name: agent.name,
    status: ['online']
  }));

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
    />
  )
}

function AgentDetail({ id, isVisible, onSubmit, onClose }) {
  const savedAgent = useRecoilValue(getAgent(id));
  const [form] = Form.useForm()
  const [agent, setAgent] = useState({});
  const isCreate = !id;

  useEffect(() => {
    form.resetFields();
  }, [form, isVisible])

  function onChange(change) {
    setAgent({
      ...agent,
      ...change
    })
  }

  function saveAgent() {
    onSubmit({
      ...(savedAgent || {}),
      ...agent
    })
  }

  const title = isCreate ? 'Create new agent' : `Update "${savedAgent.name}"`;

  return (
    <Drawer
      title={title}
      width={'70%'}
      onClose={onClose}
      visible={isVisible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={saveAgent} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout={'vertical'}
        initialValues={savedAgent}
        onValuesChange={onChange}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please, complete the name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="URL"
          name="url"
          rules={[{ required: true, type: 'url', message: 'Please, complete the URL' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Token"
          name="token"
          rules={[{ required: true, message: 'Please, complete the token' }]}
        >
          <Input addonBefore="Authorization: Bearer"/>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

function getRandomID() {
  return `_${Math.random().toString(36).substr(2, 9)}`;
}
