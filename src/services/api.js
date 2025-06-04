import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.extra.apiKey;
const BASE_URL = 'https://newsapi.org/v2/';

export const getTopHeadlines = async (country = 'br') => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines?`, {
      params: {
        country,
        category,
        apiKey: API_KEY,
      }
    });
    return response.data.articles;  
  } catch(error) {
    console.log("Erro ao buscar notícias", error);
    return [];
  }
}

export default api;
