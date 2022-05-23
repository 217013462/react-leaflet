import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import http from '../common/http-common'
import useAuth from '../hooks/useAuth'
import {decode as base64_decode, encode as base64_encode} from 'base-64'
import { LoadingOutlined, LoginOutlined } from '@ant-design/icons'

const LoginForm = () => {

  const { setAuth } = useAuth()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
    }
  
  const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } }
    }

  const usernameRules = [
    {required: true, message: 'Please input a username.'}
    ]
    
  const passwordRules = [
    {required: true, message: 'Please input a password.'}
    ]
  
  const onFinish = async (e) => {
    setLoading(true)
    try {
      const encoded = `${username}:${password}`
      const accessToken = base64_encode(encoded)
      const response = await http.get(`/user/${username}`, {
        headers: {'Authorization': `Basic ${accessToken}`}}, {
        withCredentials: true
      })
      console.log(response.status)
      const userData = response?.data[0]
      const id = userData._id
      setAuth({username, password, accessToken, id})
      console.log(`Welcome ${username}`)
      message.success(`Login Successful. Welcome ${username}.`)
      navigate('/')
    } catch (err) {
      setLoading(false)
      if (!err?.response) {
        console.log(err)
        message.error('No Server Response')
        } else if (err.response?.status == 401) {
        message.error('Unauthorized')
        } else {
        message.error('Login Failed')
        }
      }
    }

    return (
      <>
          <Form {...formItemLayout} name="register" onFinish={onFinish}>
            <Form.Item name="username" label="Username" rules={usernameRules}>
              <Input
                id="username"
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                value={username}/>
              </Form.Item>
            <Form.Item name="password" label="Password" rules={passwordRules}>
              <Input.Password
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
              </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              { loading ? (
                <LoadingOutlined spin />
              ):(
                <Button icon={<LoginOutlined />} type="primary" htmlType="submit">Login</Button>)}
              </Form.Item>
            </Form>
      </>
    )
}

export default LoginForm