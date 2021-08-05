import axios from 'axios';

export default axios.create({
  baseURL: 'http://api.weatherstack.com/',
  params: {
    access_key: process.env.REACT_APP_WEATHERSTACK_API_KEY,
  },
});
