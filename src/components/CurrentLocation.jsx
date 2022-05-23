import React, { useEffect, useState, Component } from 'react'
import { useMapEvents, Marker, Popup } from 'react-leaflet'
import L, { LeafletMouseEvent, Map } from "leaflet"
import Control from 'react-leaflet-custom-control'

const CurrentLocation = () => {

  const [position, setPosition] = useState(null)
  
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 18)
    },
  })

  return ( <>
    <Control position='topleft'>
      <button>hello</button>
    </Control>
    {position === null ? (null) : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )}
  </>)
}
export default CurrentLocation