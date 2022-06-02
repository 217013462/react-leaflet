import React, { useEffect } from 'react'
import { notification } from 'antd'

import http from '../common/http-common'

const TrafficNews = () => {

  useEffect(
    async () => {
      try {
        const res = await http.get('/trafficnews')
        const trafficNews = res.data.list.message
        if (trafficNews.INCIDENT_STATUS_EN == 'CLOSED') {
          console.log('Latest traffic incidents was closed, no notification will be shown.')
        } else {
        notification.open({
            message: `${trafficNews.INCIDENT_HEADING_EN} (${trafficNews.INCIDENT_DETAIL_EN})`,
            description: `${trafficNews.LOCATION_EN} NEAR ${trafficNews.NEAR_LANDMARK_EN}`,
            duration: 10,
            placement: 'bottom',
            maxCount: 1,
          })
        }
      } catch (err) {
        console.log(err)
      }
    }, [])

  return (
    <>
    </>
  )
}

export default TrafficNews