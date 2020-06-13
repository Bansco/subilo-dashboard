import React, { useState } from 'react'
import {
  Layout,
  Skeleton,
  Empty,
  Spin,
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

import './index.css';

const { Content } = Layout;

export default function Agents() {
  const [isAgentDetailVisible, setIsAgentDetailVisible] = useState(false);

  function onSubmit(agent) {
    console.log(agent)
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

  const data = [
    {
      key: '1',
      name: 'VM Amazon',
      status: ['online'],
    },
    {
      key: '2',
      name: 'VM Google',
      status: ['offline'],
    },
  ];


  return (
    <Layout className="agents-section">
      <Content>
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
      </Content>
    </Layout>
  )
}

function AgentDetail({ id, isVisible, onSubmit, onClose }) {
  const [agent, setAgent] = useState({});
  const isCreate = !id;

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
        layout={'vertical'}
        onValuesChange={onChange}
      >
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
