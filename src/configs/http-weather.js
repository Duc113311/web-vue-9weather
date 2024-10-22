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

//API_WEATHER
export const httpWeather = axios.create({
  baseURL: `/swtapi`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  timeout: 20000,
  withCredentials: false,
});

//API_AQI
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
