import React, { useEffect, useState } from 'react'
import { Alert } from 'antd'

import http from '../common/http-common'

const TrafficNews = () => {

  const [trafficNews, setTrafficNews] = useState([])
  const [loadingNews, setLoadingNews] = useState(true)

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

  return (
    <>
      {loadingNews == "true" ? (<></>) : (<>
        {trafficNews.INCIDENT_STATUS_EN == "CLOSED" ? (<>
          <Alert showIcon={false}
            message={<>{trafficNews.INCIDENT_HEADING_EN}: {trafficNews.INCIDENT_DETAIL_EN} (<b>{trafficNews.INCIDENT_STATUS_EN}</b>: {trafficNews.ANNOUNCEMENT_DATE})</>}
            description={trafficNews.CONTENT_EN}
            type="success"
            banner
          />
        </>) : (<>
          <Alert
            message={<><b>{trafficNews.INCIDENT_HEADING_EN}</b>: {trafficNews.INCIDENT_DETAIL_EN} ({trafficNews.INCIDENT_STATUS_EN}: {trafficNews.ANNOUNCEMENT_DATE})</>}
            description={trafficNews.CONTENT_EN}
            banner
          /></>)
        } </>)}
    </>
  )
}

export default TrafficNews