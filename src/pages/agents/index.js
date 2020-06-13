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
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import {
  useRecoilValue,
  useSetRecoilState
 } from 'recoil';
import { agentsState } from '../../store'

import './index.css';

export default function Agents() {
  const [isAgentDetailVisible, setIsAgentDetailVisible] = useState(false);
  const setAgents = useSetRecoilState(agentsState)
  const agents = useRecoilValue(agentsState);

  function onSubmit(agent) {
    setAgents((oldAgents) => [
      ...oldAgents,
      agent
    ])
    hideAgentDetail();
  }

  function hideAgentDetail() {
    setIsAgentDetailVisible(false);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Last Log Date',
      dataIndex: 'lastLogDate',
      key: 'lastLogDate',
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
          <Button shape="circle" type="primary" icon={<EditOutlined />}/>
          <Button shape="circle" type="primary" icon={<DeleteOutlined />}/>
        </Space>
      ),
    },
  ];

  const data = agents.map((agent, index) => ({
    key: index,
    name: agent.name,
    status: ['online']
  }));

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
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
      />
      <AgentDetail
        isVisible={isAgentDetailVisible}
        onSubmit={onSubmit}
        onClose={hideAgentDetail}
      />
      </Layout.Content>
    </Layout>
  )
}

function AgentDetail({ id, isVisible, onSubmit, onClose }) {
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

  const title = isCreate ? 'Create new agent' : 'Update agent';

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
          <Button onClick={() => onSubmit(agent)} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout={'vertical'}
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
