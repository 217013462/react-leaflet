import React, { useEffect, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'

import http from '../common/http-common'

const popupCamera = {
  width: "200px",
  height: "175px"
}

const TrafficCamera = () => {

  const [trafficCamera, setTrafficCamera] = useState([])

  useEffect(
    async () => {
      try {
        const res = await http.get('/trafficcamera')
        setTrafficCamera(res.data['image-list'].image)
      } catch (err) {
        console.log(err)
      }
    }, [])

  return (
    <>
      {trafficCamera && trafficCamera.map(camera => (
        <Marker
          key={camera.key}
          position={[camera.latitude, camera.longitude]}>
          <Popup>
            <div style={popupCamera}>
              Key: {camera.key}<br />
              <img src={camera.url} width="205" />
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export default TrafficCamera