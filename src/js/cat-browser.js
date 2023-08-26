import axios from 'axios';

const API_KEY =
  'live_rJDwycvns7X8IoZRtEmgGXCRlaA8jpPi955nhOhH5oExFCrCaPJZyXq8rOTTseqk';
const headers = {
  'x-api-key': API_KEY,
};

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`, { headers });
}

export function fetchEachCat(breedId) {
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`, {
    headers,
  });
}
