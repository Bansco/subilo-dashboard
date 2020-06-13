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

import './index.css';

const { Sider, Content } = Layout;

export default  function Jobs() {
  const { id } = useParams();

  const { data } = useRequest({
    url: 'https://jsonplaceholder.typicode.com/posts'
  })

  return (
    <Layout className="jobs-section">
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[id]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
            data ? data.map(({id: JobID , title}) => (
              <Menu.Item key={JobID} icon={<AlignLeftOutlined />}>
                <Link to={`/jobs/${JobID}`}>Job {JobID}</Link>
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
      </Sider>

      {id && <JobDetail id={id} />}
      {!id && <Content><Empty className="center" description={false}/></Content>}
    </Layout>
  )
}



function JobDetail({ id }) {
  const { data } = useRequest({
    url: `https://jsonplaceholder.typicode.com/posts/${id}`
  })

  return (
    <Content className="job-detail">
      {data && (
        <Layout className="job-code">
          <code>
            Project gillchristian/tsplay.dev on branch master at ~/www/tsplay.dev/server<br/>
            $ git pull --rebase<br/>
            First, rewinding head to replay your work on top of it...<br/>
            Fast-forwarded master to 19ccd79752cd517a8adb3933b897d0642db798b1.<br/>
            $ docker pull gillchristian/tsplay:latest<br/>
            latest: Pulling from gillchristian/tsplay<br/>
            23884877105a: Already exists<br/>
            bc38caa0f5b9: Already exists<br/>
            2910811b6c42: Already exists<br/>
            36505266dcc6: Already exists<br/>
            41681e62cc54: Pulling fs layer<br/>
            3ffe2ae11f79: Pulling fs layer<br/>
            2bd280408016: Pulling fs layer<br/>
            41681e62cc54: Verifying Checksum<br/>
            41681e62cc54: Download complete<br/>
            41681e62cc54: Pull complete<br/>
            2bd280408016: Verifying Checksum<br/>
            2bd280408016: Download complete<br/>
            3ffe2ae11f79: Verifying Checksum<br/>
            3ffe2ae11f79: Download complete<br/>
            3ffe2ae11f79: Pull complete<br/>
            2bd280408016: Pull complete<br/>
            Digest: sha256:9f2fec392bfb42d717fc937f2f963ca6bc06eb710928d32e59eb721ba3df2e68<br/>
            Status: Downloaded newer image for gillchristian/tsplay:latest<br/>
            $ docker-compose down<br/>
            $ docker-compose up -d<br/>
            $ docker-compose logs<br/>
            Attaching to server_tsplay_1<br/>

            Project gillchristian/tsplay.dev on branch master at ~/www/tsplay.dev/server<br/>
            $ git pull --rebase<br/>
            First, rewinding head to replay your work on top of it...<br/>
            Fast-forwarded master to 19ccd79752cd517a8adb3933b897d0642db798b1.<br/>
            $ docker pull gillchristian/tsplay:latest<br/>
            latest: Pulling from gillchristian/tsplay<br/>
            23884877105a: Already exists<br/>
            bc38caa0f5b9: Already exists<br/>
            2910811b6c42: Already exists<br/>
            36505266dcc6: Already exists<br/>
            41681e62cc54: Pulling fs layer<br/>
            3ffe2ae11f79: Pulling fs layer<br/>
            2bd280408016: Pulling fs layer<br/>
            41681e62cc54: Verifying Checksum<br/>
            41681e62cc54: Download complete<br/>
            41681e62cc54: Pull complete<br/>
            2bd280408016: Verifying Checksum<br/>
            2bd280408016: Download complete<br/>
            3ffe2ae11f79: Verifying Checksum<br/>
            3ffe2ae11f79: Download complete<br/>
            3ffe2ae11f79: Pull complete<br/>
            2bd280408016: Pull complete<br/>
            Digest: sha256:9f2fec392bfb42d717fc937f2f963ca6bc06eb710928d32e59eb721ba3df2e68<br/>
            Status: Downloaded newer image for gillchristian/tsplay:latest<br/>
            $ docker-compose down<br/>
            $ docker-compose up -d<br/>
            $ docker-compose logs<br/>
            Attaching to server_tsplay_1<br/>
          </code>
        </Layout>
      )}

      {!data && (
        <div className="center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 45 }} spin />} />
        </div>
      )}
    </Content>
  );
}
