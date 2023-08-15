import axios from 'axios';

const API_KEY = '38062230-7402f65f1db4c269e21af0429';
const perPage = 12;

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImage = async (searchText, currentPage) => {
  const options = new URLSearchParams({
    key: API_KEY,
    q: searchText,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: perPage,
  });

  const response = await axios.get(`?page=${currentPage}&${options}`);

  return response.data;
};
