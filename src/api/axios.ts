import axios from 'axios';

const apiEndpoint = (window.location.host.toLocaleLowerCase() === process.env.VUE_APP_PRODUCTION_HOST)
  ? process.env.VUE_APP_API_ENDPOINT
  : process.env.VUE_APP_API_DEV_ENDPOINT;

export default axios.create({
  baseURL: apiEndpoint,
  withCredentials: true,
});
