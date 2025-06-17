import CardNoticia from "@/components/CardNoticia";
import TopHeadlinesCarousel from "@/components/TopHeadlinesCarousel";
import colors from "@/constants/colors";
import { fetchTopHeadlines } from "@/src/services/api";
import { Noticia } from "@/src/types/Noticia";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = ['Geral', 'Tecnologia', 'Esporte', 'Negócios', 'Política', 'Entretenimento', 'Saúde', 'Ciência'];

const Home: React.FC = () => {
  const [topHeadlines, setTopHeadlines] = useState<any[]>([]);
  const [news, setNews] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [categorySelected, setCategorySelected] = useState('general');
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const router = useRouter();

  // Atualiza a página para 1 ao trocar a categoria
  useEffect(() => {
    setPage(1);
  }, [categorySelected]);

  // Busca notícias sempre que page ou categoria mudar
  useEffect(() => {
    fetchNoticias(page > 1);
  }, [page, categorySelected]);


  useEffect(() => {
    const getTopHeadlines = async () => {
      try {
        const data = await fetchTopHeadlines();
        setTopHeadlines(data.slice(0, 4));
      } catch (error) {
        console.error("Erro ao buscar top headlines", error);
      }
    };

    getTopHeadlines();
  },[])


  async function fetchNoticias(isLoadMore = false) {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await fetch(
      `https://newsapi.org/v2/everything?q=${categorySelected}&language=pt&sortBy=publishedAt&page=${page}&pageSize=10&apiKey=${Constants.expoConfig?.extra?.newsApiKey}`
    );
    const data = await response.json();

    if (isLoadMore) {
      const newArticles = data.articles.filter(
        (article: any) => !news.some((n) => n.url === article.url)
      );
      setNews(prev => [...prev, ...data.articles]);
    } else {
      setNews(data.articles || []);
    }
    } catch (error) {
      console.error("Erro ao buscar noticias", error);
    }
    
    if (isLoadMore) setLoadingMore(false);
    else setLoading(false);
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage(prev => prev + 1);
    }
  };

  const renderHeader = () => (
    <>
      <Text style={styles.title}>Últimas notícias</Text>
      
      <TouchableOpacity>
        <TopHeadlinesCarousel headlines={topHeadlines} />
      </TouchableOpacity>

      <Text style={styles.title}>Categorias</Text>
        
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setCategorySelected(item)}
            style={[
              styles.buttonCategory,
              categorySelected === item && styles.buttonSelected,
            ]}
          >
            <Text
              style={[
                styles.textCategory,
                categorySelected === item && styles.textSelected,
              ]}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  )
  
  return(
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.buttonSearch} onPress={() => router.push('/search')}>
          <Ionicons name="search" size={18} color={colors.red} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={news}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <CardNoticia
            urlToImage={item.urlToImage} 
            title={item.title}
            author={item.author} 
            publishedAt={item.publishedAt} 
            onPress={() => 
              router.push({ 
                pathname: '/detalhes', 
                params: { 
                  urlToImage: item.urlToImage, 
                  title: item.title, 
                  content: item.content, 
                  author: item.author, 
                  url: item.url, 
                  publishedAt: item.publishedAt 
                }
              })
            } 
          />
        )}

        ListHeaderComponent={renderHeader}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size="small" color={colors.red} style={{ marginVertical: 20 }} /> : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 10,
  },
  logo:{
    width: 100,
    height: 50
  },
  buttonSearch:{
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    color: colors.red,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 20
  },
  categories: {
    flexDirection: "row",
    paddingLeft: 10,
    marginBottom: 20,
  },
  buttonCategory: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  buttonSelected: {
    backgroundColor: colors.red,
  },
  textCategory: {
    color: "#333",
  },
  textSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
})

export default Home;