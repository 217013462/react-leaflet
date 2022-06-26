import React, { useEffect, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { Button, message } from 'antd'
import { UpSquareOutlined, DownSquareOutlined } from '@ant-design/icons'

import http from '../common/http-common'
import useAuth from '../hooks/useAuth'
import iconSVG from '../icons/warning.svg'

const getIcon = new L.Icon ({
    iconUrl: iconSVG,
    iconSize: [35,35]
  })

const IncidentReport = () => {

  const [incident, setIncident] = useState([])
  const [voteDisable, setVoteDisable] = useState(false)

  const { auth } = useAuth()

  useEffect(
    async () => {
      try {
        const res = await http.get('/incident/filter/6hour')
        setIncident(res.data)
      } catch (err) {
        console.log(err)
      }
    },[incident])

/*   const upvoteIcon = (id) => {
    http.get(`/incident/vote/${id}/${auth.id}`)
      .then((response)=>{
        if (response.data[0].includes(auth.id) === true) {
          <UpSquareFilled />
        } else {
          <UpSquareOutlined />
        }
      })
  } */

  const handleUpvote = (id) => {
    setVoteDisable(true)
    console.log(id)
    console.log(auth.id)
    http.get(`/incident/vote/${id}/${auth.id}`)
      .then((response)=>{
        console.log(response.data)
        if (response.data.length===0) {
          http.put(`/incident/upvote/${id}/${auth.id}`)
            .then((response)=>{
              console.log(response.data)
              message.success('Upvoted')
              setVoteDisable(false)
            })
            .catch((err)=>{
              console.log(err)
              message.error('Unable to upvote')
              })
        } else {
          message.warning('Already voted for this incident')
          setVoteDisable(false)
        }
      })
  }
  
  const handleDownvote = (id) => {
    setVoteDisable(true)
    console.log(id)
    console.log(auth.id)
    http.get(`/incident/vote/${id}/${auth.id}`)
      .then((response)=>{
        console.log(response.data)
        if (response.data.length===0) {
          http.put(`/incident/downvote/${id}/${auth.id}`)
            .then((response)=>{
              console.log(response.data)
              message.success('Downvoted')
              setVoteDisable(false)
            })
            .catch((err)=>{
              console.log(err)
              message.error('Unable to downvote')
              })
        } else {
          message.warning('Already voted for this incident')
          setVoteDisable(false)
        }
      })
  }

  return (
    <>
      {incident && incident.map(incident => (
        <Marker
          icon={getIcon}
          key={incident._id}
          position={[incident.latitude, incident.longitude]}>
          <Popup>
            <b>{incident.type}</b> ({incident.timeReported})<br />
            {incident.description}<br />
            {auth.username ? (
            <div style={{textAlign: 'right'}}>
              <Button
                icon={<UpSquareOutlined />}
                size={'small'}
                type="text"
                onClick={()=>handleUpvote(incident._id)}
                disabled={voteDisable}
                />
              {incident.upvote.length-incident.downvote.length}
              <Button
                icon={<DownSquareOutlined />}
                size={'small'}
                type="text"
                onClick={()=>handleDownvote(incident._id)}
                disabled={voteDisable}
                />
            </div>
            ) : (
            <div style={{textAlign: 'right'}}>
              <Button
                icon={<UpSquareOutlined />}
                size={'small'}
                type="text"
                onClick={()=>{message.warning('Please login to upvote')}}
                />
              {incident.upvote.length-incident.downvote.length}
              <Button
                icon={<DownSquareOutlined />}
                size={'small'}
                type="text"
                onClick={()=>{message.warning('Please login to downvote')}}
                />
            </div>
            )}
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export default IncidentReport