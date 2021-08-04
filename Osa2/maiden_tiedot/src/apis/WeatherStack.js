import axios from 'axios';

export default axios.create({
  baseURL: 'http://api.weatherstack.com/',
  params: {
    access_key: 'd00e3fbe945cb4d74bbbd26f40f826bc',
  },
});
