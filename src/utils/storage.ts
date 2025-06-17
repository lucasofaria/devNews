import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorites_news';

export async function getFavorites(): Promise<any[]> {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

export async function addFavorite(article: any): Promise<void> {
  const favorites = await getFavorites();
  const isAlreadyFavorited = favorites.some((item) => item.url === article.url);

  if (!isAlreadyFavorited) {
    favorites.push(article);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    console.log('Noticia favoritada com sucesso!');
  }
}

export async function removeFavorite(url: string): Promise<void> {
  const favorites = await getFavorites();
  const updated = favorites.filter((item) => item.url !== url);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  console.log('Notícia removida dos favoritos com sucesso!');
}

export async function isFavorite(url: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.some((item) => item.url === url);
}
