import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '31945832-e9d492592ba6e12edc092d436',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const searchImages = async (q, page) => {
  const { data } = await instance.get('/', {
    params: { q, page },
  });
  return data;
};
