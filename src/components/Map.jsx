import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet'
import '../css/Map.css'
import axios from 'axios'

const Map = () => {

    const [roadworks, setRoadworks] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(
          'https://resource.data.one.gov.hk/td/roadworks-location/get_all_the_roadworks.json',
        )
        setRoadworks(result.data)
      };
      fetchData();
    }, [setRoadworks]);
  
  return (
    <MapContainer center={[22.2992961, 114.1894218]} zoom={14} scrollWheelZoom={true} minZoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <LayersControl position="topright">
          <LayersControl.Overlay name="Roadworks">
            <LayerGroup>
              {roadworks && roadworks.map(rw =>(
              <Marker 
                key = {rw.roadworks_id}
                position={[rw.latitude, rw.longitude]}>
                <Popup>
                  {rw.workstype} ({rw.worksstatus})<br/>
                  Start time: {rw.starttime}<br/>
                  End time: {rw.endtime}
                </Popup>
              </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
    </MapContainer>

  )
}

export default Map