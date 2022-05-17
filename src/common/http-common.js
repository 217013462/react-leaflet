import axios from 'axios'

export default axios.create({
  baseURL: 'https://node-leaflet.shingwy.repl.co/api/v1',
  headers: {
    'Content-type': 'application/json'
  }
})