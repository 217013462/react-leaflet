import React, { useEffect, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'

import http from '../common/http-common'
import iconSVG from '../icons/ev-station-2.svg'

const getIcon = new L.Icon ({
    iconUrl: iconSVG,
    iconSize: [30,30],
  })

const CLPEv = () => {

  const [CLPEv, setCLPEv] = useState([])

  useEffect(
    async () => {
      try {
        const res = await http.get('/clpev')
        setCLPEv(res.data.ChargingStationData.stationList.station)
      } catch (err) {
        console.log(err)
      }
    }, [])

  return (
    <>
      {CLPEv && CLPEv.map(ev => (
        <Marker
          icon={getIcon}
          key={ev.no}
          position={[ev.lat, ev.lng]}>
          <Popup>
            {ev.location} ({ev.type})<br />
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export default CLPEv