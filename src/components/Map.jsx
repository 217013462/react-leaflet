import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet'
import { Alert } from 'antd';
import '../css/Map.css'
import http from '../common/http-common'

const popupCamera = {
  width: "200px",
  height: "175px"
};

const Map = () => {

  const [roadworks, setRoadworks] = useState([]);
  const [trafficNews, setTrafficNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [trafficCamera, setTrafficCamera] = useState([]);

  useEffect(
    async () => {
      try {
      const res = await http.get('/roadworks')
      setRoadworks(res.data)
    } catch (err) {
        console.log(err)
    }
  }, [])
  
  useEffect(
    async () => {
      setLoadingNews(true)
      try {
      const res = await http.get('/trafficnews')
      setTrafficNews(res.data.list.message)
      } catch (err) {
        console.log(err)
      }
      setLoadingNews(false)
    }, [])
  
  useEffect(
    async () => {
      try {
      const res = await http.get('/trafficcamera')
      setTrafficCamera(res.data['image-list'].image)
      } catch (err) {
        console.log(err)
      }
    }, [])

  console.log(loadingNews)

  return (
    <>
      {loadingNews == "true" ? (<></>):(<>
      {trafficNews.INCIDENT_STATUS_EN == "CLOSED" ? ( <></> ) : ( <>
        <Alert
          message={<><b>{trafficNews.INCIDENT_HEADING_EN}</b>: {trafficNews.INCIDENT_DETAIL_EN} ({trafficNews.INCIDENT_STATUS_EN}: {trafficNews.ANNOUNCEMENT_DATE})</>}
          description={trafficNews.CONTENT_EN}
          banner
          /></>)
      } </> ) }
    
    <MapContainer center={[22.2992961, 114.1894218]} zoom={14} scrollWheelZoom={true} minZoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright">
        <LayersControl.Overlay name="Roadworks">
          <LayerGroup>
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
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Traffic Camera">
          <LayerGroup>
            {trafficCamera && trafficCamera.map(camera => (
              <Marker
                key={camera.key}
                position={[camera.latitude, camera.longitude]}>
                <Popup>
                  <div style={popupCamera}>
                  Key: {camera.key}<br />
                  <img src={camera.url} width="205"/>
                  </div>
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>

</>
  )
}

export default Map