import axios from "axios";

//API_IP_FIND
export const httpIpFind = axios.create({
  baseURL: `https://ipfind.co/`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: false,
});

//API_WEATHER : https://swtapi.tohapp.com
export const httpWeather = axios.create({
  baseURL: `/swtapi`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  timeout: 30000,
  withCredentials: false,
});

//API_AQI : https://airapi.tohapp.com
export const httpAqi = axios.create({
  baseURL: `/airapi`,
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
