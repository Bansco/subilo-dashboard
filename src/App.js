import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import TopHeader from './components/TopHeader';
import Home from './pages/home'
import Jobs from './pages/jobs'


export default function App() {
  return (
    <Router>
      <Layout>
        <TopHeader/>

        <Switch>
          <Route path="/jobs/:id?">
            <Jobs />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}



