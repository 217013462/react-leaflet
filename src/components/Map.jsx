import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, LayersControl, LayerGroup, ScaleControl } from 'react-leaflet'
import L from 'leaflet'
import ResetViewControl from '@20tab/react-leaflet-resetview'
import '../css/Map.css'

import Roadworks from './Roadworks'
import TrafficCamera from './TrafficCamera'
import TrafficNews from './TrafficNews'

const center = [22.2992961, 114.1894218]
const zoom = 14

const Map = () => {
  
  return (
    <>
      <TrafficNews />
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} minZoom={11}>
        <ResetViewControl
          title="Home Extend"
          icon={"🌎"}
          />
        <ScaleControl imperial={false} />
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