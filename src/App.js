import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import TopHeader from './components/TopHeader';
import Home from './pages/home'
import Logs from './pages/logs'


export default function App() {
  return (
    <Router>
      <Layout>
        <TopHeader/>

        <Switch>
          <Route path="/logs/:id?">
            <Logs />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}



