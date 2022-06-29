import React, { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, useMap, LayersControl, LayerGroup, ScaleControl } from 'react-leaflet'
import { geosearch } from 'esri-leaflet-geocoder'
import L from 'leaflet'
import ResetViewControl from '@20tab/react-leaflet-resetview'
//import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch"

import '../css/Map.css'

import Roadworks from './Roadworks'
import TrafficNews from './TrafficNews'
import TrafficCamera from './TrafficCamera'
import AddIncident from './AddIncident'
import IncidentReport from './IncidentReport'
import CurrentLocation from './CurrentLocation'
import CLPEv from './CLPEv'

const center = [22.2992961, 114.1894218]
const zoom = 14
const hkBounds = ([[22.1244,113.8094],[22.6089,114.4549]])

const Map = () => {

// origin openstreetmap raster layer
/*        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/
  
  return (
    <>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} minZoom={11} maxBounds={hkBounds}>

        <ResetViewControl
          title="Home Extend"
          icon={"🌎"}
          />
        <ScaleControl imperial={false} />
        <TrafficNews />
        <CurrentLocation />
        <AddIncident />
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=ab019d63-891a-4828-96e5-13d85de98400"
        />
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Incidents">
            <LayerGroup>
              <IncidentReport />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Roadworks">
            <LayerGroup>
              <Roadworks />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Traffic Snapshots">
            <LayerGroup>
              <TrafficCamera />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Electric Vehicle Charging Staion">
            <LayerGroup>
              <CLPEv />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>

    </>
  )
}

export default Map