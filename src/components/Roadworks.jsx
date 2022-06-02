import React, { useEffect, useState } from 'react'
import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

import http from '../common/http-common'
import iconSVG from '../icons/road-worker.svg'

const getIcon = new L.Icon ({
    iconUrl: iconSVG,
    iconSize: [25,25]
  })

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
          icon={getIcon}
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