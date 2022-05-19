import React, { useEffect, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'

import http from '../common/http-common'

const Roadworks = () => {

  const [roadworks, setRoadworks] = useState([])

  useEffect(
    async () => {
      try {
        const res = await http.get('/roadworks')
        setRoadworks(res.data)
      } catch (err) {
        console.log(err)
      }
    }, [])

  return (
    <>
      {roadworks && roadworks.map(rw => (
        <Marker
          key={rw.roadworks_id}
          position={[rw.latitude, rw.longitude]}>
          <Popup>
            {rw.workstype} ({rw.worksstatus})<br />
            Start time: {rw.starttime}<br />
            End time: {rw.endtime}
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export default Roadworks