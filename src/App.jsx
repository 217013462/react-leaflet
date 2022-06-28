import React, { useState } from 'react'
import './css/App.css'
import { Layout, Space, Button, Modal, message } from 'antd'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { saveAs } from 'file-saver'

import Home from './components/Map'
import Register from './components/Register'
import Login from './components/Login'

import http from './common/http-common'
import useAuth from './hooks/useAuth'

function App() {

  const { Header, Content } = Layout
  const { auth, setAuth } = useAuth()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const Logout = () => {
    setAuth({})
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const exportJSON = () => {
    http.get('/incident', {
      responseType: 'arraybuffer',
      headers: {
                  'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const blob = new Blob([response.data])
        saveAs(blob, "incidents.json")
      })
    .catch((error) => console.log(error))
    setIsModalVisible(false)
    message.loading('Download in progress...')
  }

  return (
    <Router>
      <Header>
        <nav>
          <Space>
            <Link to="/">Home</Link>
            {auth.username ? (<></>) : (<><Link to="/register">Register</Link></>)}
            {auth.username ? (<></>) : (<><Link to="/login">Login</Link></>)}
            {auth.username ? (<><Link onClick={() => Logout()} to="/">Logout</Link></>) : (<></>)}
          </Space>
          <div style={{float: 'right'}}>
            <Button type="link" onClick={()=>{setIsModalVisible(true)}}>Export</Button>
          </div>
        </nav>
      </Header>
      <Content>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    <Modal title="Export Incidents" visible={isModalVisible} onOk={exportJSON} onCancel={handleCancel}>
      <p>Are you sure you want to download all the historical incidents?</p>
    </Modal>
      </Content>
    </Router>
  )
}

export default App