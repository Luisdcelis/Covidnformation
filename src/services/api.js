import axios from "axios";
import moment from "moment";

const API_KEY = "e916c96f8ad54710839b38b5164077ac";

let today = moment().format("YYYY-MM-DD");
let aweekago = moment().subtract(10, "days").format("YYYY-MM-DD");

const BASE_URL = `http://newsapi.org/v2/everything?language=es&from=${aweekago}&to=${today}&sortBy=popularity&q=coronavirus&apiKey=${API_KEY}`;

const api = axios.create({ baseURL: BASE_URL });

export const getNews = async () => {
  const res = await api.get();
  return res.data;
};

const api_covid = axios.create({
  baseURL: "https://api.covid19tracking.narrativa.com/api/",
});

export const getDataCovidSpain = async (fecha) => {
  const res = await api_covid.get(`${fecha}/country/spain`);
  return Object.values(res.data.dates)[0].countries.Spain;
};

export const getDataCovidGlobal = async (fecha) => {
  const res = await api_covid.get(`${fecha}/country/spain`);
  return res.data.total;
};

const api_stats = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://covid19tracking.narrativa.com/feed_en_graphs.json",
});

export const getStats = async () => {
  const res = await api_stats.get();
  return res.data.data.post[0];
};
