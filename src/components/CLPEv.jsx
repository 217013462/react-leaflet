import React, { useEffect, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'

//previous version (directly use data from CLP opendata, the data is now invalid)
//import http from '../common/http-common'
import iconSVG from '../icons/ev-station-2.svg'

import CLPEVCS from '../common/CLPEVCS.json'

const getIcon = new L.Icon ({
    iconUrl: iconSVG,
    iconSize: [30,30],
  })

const CLPEv = () => {

  const [CLPEv, setCLPEv] = useState([])

  useEffect(
    async () => {
      try {
          const res = CLPEVCS
          setCLPEv(res)
//        previous version (directly use data from CLP opendata, the data is now invalid)
//        const res = await http.get('/clpev')
//        setCLPEv(res.data.ChargingStationData.stationList.station)
      } catch (err) {
        console.log(err)
      }
    }, [])

  return (
    <>
      <MarkerClusterGroup>
      {CLPEv && CLPEv.map(ev => (
        <Marker
          icon={getIcon}
          key={ev.properties.No}
          position={[ev.properties.Latitude, ev.properties.Longitude]}>
          <Popup>
            {ev.properties.Location} ({ev.properties.Type})<br />
          </Popup>
        </Marker>
      ))}
      </MarkerClusterGroup>
    </>
  )
}

//previous version (directly use data from CLP opendata, the data is now invalid)
/*       <MarkerClusterGroup>
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
      </MarkerClusterGroup> */

export default CLPEv