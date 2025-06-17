import { NEWS_API_KEY } from '../.env';

const BASE_URL = 'https://newsapi.org/v2/';

export async function fetchEverythingByCategory(category: string): Promise<any[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${category}&language=pt&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Erro ao buscar everything por categoria:', error);
    return [];
  }
}

export async function fetchTopHeadlines(): Promise<any[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?category=business&pageSize=4&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Erro ao buscar noticias para TopHeadlines:', error);
    return [];
  }
}