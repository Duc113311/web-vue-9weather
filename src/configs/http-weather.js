import axios from "axios";

//API_IP_FIND   https://ipfind.co/
export const httpIpFind = axios.create({
  baseURL: `/ipfind`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
  withCredentials: false,
});

//API_WEATHER : https://swtapi.tohapp.com/
export const httpWeather = axios.create({
  baseURL: `https://server-proxy-weather.amobilab.com/proxy/swtapi/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  timeout: 30000,
  withCredentials: false,
});

//API_AQI : https://airapi.tohapp/
export const httpAqi = axios.create({
  baseURL: `https://server-proxy-weather.amobilab.com/proxy/airapi/`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
  withCredentials: false,
});

//API_RADAR
export const httpRadar = axios.create({
  baseURL: `https://sradar.tohapp.com`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: false,
});

//API_TIDES
export const httpTides = axios.create({
  baseURL: `https://server-amobilab.amobilab.com/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  timeout: 30000,
  withCredentials: false,
});
