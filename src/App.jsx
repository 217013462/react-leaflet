import React from 'react'
import './css/App.css'

import { Layout/* , Space */ } from 'antd'
import {BrowserRouter as Router/* , Routes, Route, Link */} from 'react-router-dom' 

import Map from './components/Map'

function App() {

  const { Header, Content } = Layout;
  
  return (

    <Router>
    <Layout>
      <Header>Header</Header>
      <Content>
       <Map />
      </Content>
    </Layout>
    </Router>

  )
}

export default App