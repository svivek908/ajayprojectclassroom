import axios from 'axios';

export default axios.create({
  baseURL: `http://192.168.0.248/driving/api/`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin":"*",
    
  }
});