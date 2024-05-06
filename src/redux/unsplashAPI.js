// src/redux/unsplashAPI.js
import axios from 'axios';

const unsplashAPI = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID YOUR_ACCESS_KEY',
  },
});

export const getImageForTask = async (taskText) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: taskText,
          // per_page: 10,
          client_id: 'pS0leomaJA2ZpgHPnP26Kj051RiZGl0Dcjii5qBq5w4',
        },
      });

    if (response.data.results.length > 0) {
      console.log(response.data.results[0].urls.regular);
      return response.data.results[0].urls.regular;
    }

    return null;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};