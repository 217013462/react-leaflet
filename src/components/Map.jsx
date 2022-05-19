import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, LayersControl, LayerGroup } from 'react-leaflet'
import '../css/Map.css'

import Roadworks from './Roadworks'
import TrafficCamera from './TrafficCamera'
import TrafficNews from './TrafficNews'

const Map = () => {

  return (
    <>
      <TrafficNews />
      <MapContainer center={[22.2992961, 114.1894218]} zoom={14} scrollWheelZoom={true} minZoom={11}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.Overlay name="Roadworks">
            <LayerGroup>
              <Roadworks />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Traffic Camera">
            <LayerGroup>
              <TrafficCamera />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>

    </>
  )
}

export default Map