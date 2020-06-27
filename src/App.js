import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { RecoilRoot } from 'recoil';

import TopHeader from './components/TopHeader';
import Agents from './pages/agents'
import Jobs from './pages/jobs'

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Layout>
          <TopHeader/>

          <Switch>
            <Route path="/agents/:id?">
              <Agents />
            </Route>
            <Route path="/jobs/:agentID?/:logID?">
              <Jobs />
            </Route>
            <Route path="/">
              <Redirect to="/jobs"/>
            </Route>
          </Switch>
        </Layout>
      </Router>
    </RecoilRoot>
  );
}



