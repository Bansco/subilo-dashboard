import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Analytics from 'react-router-ga';

import TopHeader from './components/TopHeader';
// import Theme from './components/Theme';
import Agents from './pages/agents'
import Jobs from './pages/jobs'
import Home from './pages/home'

export default function App() {
  return (
    <RecoilRoot>
      {/* using Dark theme for now */}
      {/*<Theme/>*/}

      <Router>
        <Analytics id="UA-8293285-16">
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
              <Home />
            </Route>
          </Switch>
        </Layout>
        </Analytics>
      </Router>
    </RecoilRoot>
  );
}



