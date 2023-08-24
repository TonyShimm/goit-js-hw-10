import axios from 'axios';

const API_KEY =
  'live_rJDwycvns7X8IoZRtEmgGXCRlaA8jpPi955nhOhH5oExFCrCaPJZyXq8rOTTseqk';
const headers = {
  'x-api-key': API_KEY,
};

export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

  return axios
    .get(BASE_URL, { headers })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}

export function fetchEachCat(breedId) {
  const SEARCH_URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios
    .get(SEARCH_URL, { headers })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}
