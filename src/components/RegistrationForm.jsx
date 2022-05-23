import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import http from '../common/http-common'
import { LoadingOutlined, UserAddOutlined } from '@ant-design/icons'

const RegistrationForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const onFinish = (values) => {
    setLoading(true)
    const {confirm, ...data} = values
    
    http.post('/user/reg', {
      username: data.username,
      password: data.password,
      email: data.email,
      role: "user"
    })
    .then((response)=>{
      console.log(response.data)
      setLoading(false)
      console.log('Registration Completed')
      message.success(`Registration Successful. Welcome ${data.username}.`)
      setTimeout(()=>
      navigate('/login'), 3000)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

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
  
  const emailRules = [
    {type: 'email', message: 'The input is not valid e-mail.'},
    {required: true, message: 'Please input an e-mail address.'}
  ]
  
  const passwordRules = [
    {required: true, message: 'Please input a password.'}
  ]

  const confirmPwdRules = [
    {required: true, message: 'Please confirm password.'},
    ({getFieldValue})=>({
      validator(rule, value){
        if(!value||getFieldValue('password')===value){
          return Promise.resolve()
        }
        return Promise.reject('The two passwords that entered do not match. Please re-enter.')
      }
    })
  ]

  return (
    <>
      <Form {...formItemLayout} name="register" onFinish={onFinish}>
        <Form.Item name="username" label="Username" rules={usernameRules}><Input /></Form.Item>
        <Form.Item name="email" label="E-mail" rules={emailRules}><Input /></Form.Item>
        <Form.Item name="password" label="Password" rules={passwordRules}><Input.Password /></Form.Item>
        <Form.Item name="confirm" label="Confirm Password" rules={confirmPwdRules}><Input.Password /></Form.Item>

        <Form.Item {...tailFormItemLayout}>
          { loading ? (
                <LoadingOutlined spin />
              ):(
          <Button icon={<UserAddOutlined />} type="primary" htmlType="submit">Register</Button>)}
          </Form.Item>
        </Form>
    </>
  )
}

export default RegistrationForm