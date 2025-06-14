import { NEWS_API_KEY } from '../.env';

const BASE_URL = 'https://newsapi.org/v2/';

export async function fetchTopHeadlines(country = 'us') {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=Brasil&language=pt&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao buscar notícias');
    }

    return data.articles;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}