import axios from 'axios';

const API_KEY = '25a8f73a9a2b488a99a19d33d743d2ee';
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
