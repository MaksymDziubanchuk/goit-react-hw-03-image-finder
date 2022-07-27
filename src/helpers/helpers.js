import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '27848247-ce78afbd89c0e4185f88b7a39';
const LIMIT = 12;

export const fetchItems = async (request, page) => {
  const decodeQuery = decodeURIComponent(request.replace(' ', '+'));
  const params = new URLSearchParams({
    per_page: LIMIT,
    page: page,
    key: KEY,
    q: decodeQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  try {
    const url = `${BASE_URL}?${params}`;
    let buttonVisible = '';
    const response = await axios.get(url);
    if (response.data.totalHits !== 0) {
      const items = response.data.hits.map(
        ({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        }
      );
      const shownImages = LIMIT * page;
      if (response.data.total < shownImages) {
        buttonVisible = false;
      } else {
        buttonVisible = true;
      }

      return { items, buttonVisible };
    } else {
      return Promise.reject(new Error('Bad request'));
    }
  } catch (error) {
    console.log(error);
  }
};
