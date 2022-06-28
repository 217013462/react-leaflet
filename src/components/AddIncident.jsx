import React, { useState } from 'react'
import { useMapEvents, Marker } from 'react-leaflet'
import L from "leaflet"
import { Modal, Form, Input, Select, message, Button } from 'antd'
import moment from 'moment'

import http from '../common/http-common'
import useAuth from '../hooks/useAuth'

const AddIncident = () => {
  const [markers, setMarkers] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const { Option } = Select
  const [form] = Form.useForm()
  const { auth } = useAuth()
  
  const map = useMapEvents({
    click(e) {
      if (!auth.username) {
        message.warning('Please login to report incident')
      } else {
          
        const { lat, lng } = e.latlng
  /*       L.marker([lat, lng], { Marker }).addTo(map) */
        console.log(e.latlng)
        setLatitude(lat)
        setLongitude(lng)
        setIsModalVisible(true)
        form.resetFields()
      }
    }
  })
  
  const handleOk = (values) => {
    const {confirm, ...data} = values
    const accessToken = auth.accessToken
      form.validateFields()
    
    if (!data.incident) {
      
      } else {
      setIsModalLoading(true)
      
      http.post('/incident/add', {
        type: data.incident,
        latitude: latitude,
        longitude: longitude,
        description: data.description,
        momentReported: moment().format(),
        dateReported: moment().format("YYYY-MM-DD"),
        timeReported: moment().format("HH:mm:ss"),
        userReported: auth.id,
        upvote: [],
        downvote: []
      } , {
        headers: {
          'Authorization': `Basic ${accessToken}`
        }})
      .then((response)=>{
        console.log(response.data)
        //update the user detail for adding the incident (as array)
        http.put(`/user/${auth.id}/${response.data.data.insertedId}`)
        
        console.log(response.data)
        setIsModalLoading(false)
        message.success('Reported')
        setIsModalVisible(false)
      })
      .catch((err)=>{
        setIsModalLoading(false)
        message.error('Unable to report')
        console.log(err)
        setIsModalVisible(false)
      })
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalVisible(false)
  }

  const incidentRules = [
    {required: true, message: 'Please select the type of incident you would like to report.'}
  ]
  
  return (
    <>
      {auth.username ? (<>
        
        <Modal title="Report an incident"
          visible={isModalVisible}
          closable={false}
          footer={[
          <Button key="back" disabled={isModalLoading} onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="reset" disabled={isModalLoading} onClick={()=>{form.resetFields()}}>
            Reset
          </Button>,
          <Button key="submit" type="primary" loading={isModalLoading} onClick={form.submit}>
            Report
          </Button>,
          ]}
          >
        <Form form={form} name="incidentForm" onFinish={handleOk}>
          <Form.Item name="incident" label="Incident" rules={incidentRules}>
            <Select placeholder="Please select the type of incident" disabled={isModalLoading}>
              <Option value="Heavy Traffic">Heavy Traffic</Option>
              <Option value="Standstill Traffic">Standstill Traffic</Option>
              <Option value="Crash">Crash</Option>
              <Option value="Road Hazard">Road Hazard</Option>
            </Select>  
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input type="textarea" disabled={isModalLoading}/>
          </Form.Item>
        </Form>
        </Modal>
        
      </>):(<>

      </>)}
    </>
  )
}

export default AddIncident