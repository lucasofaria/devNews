import CardNoticia from "@/components/CardNoticia";
import TopHeadlinesCarousel from "@/components/TopHeadlinesCarousel";
import colors from "@/constants/colors";
import { fetchTopHeadlines } from "@/src/services/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Headline = {
  id: string;
  title: string;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [topHeadlines, setTopHeadlines] = useState<Headline[]>([]);

  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {

    fetchTopHeadlines().then(setNews).finally(() => setLoading(false));

    const fetchHeadlines = async () => {
    const data: Headline[] = [
      {
        id: "1",
        title: "Notícia urgente sobre tecnologia.",
        imageUrl: "https://picsum.photos/400/200",
      },
      {
        id: "2",
        title: "Nova atualização do React Native.",
        imageUrl: "https://picsum.photos/400/200",
      },
      {
        id: "3",
        title: "Lançamento de app que vai revolucionar o mundo.",
        imageUrl: "https://picsum.photos/400/200",
      },
    ];
       setTopHeadlines(data);
     };

    fetchHeadlines();

  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
        
        <View style={styles.ButtonSearch}>
          <Ionicons name="search" size={18} color={colors.red} />
        </View>
      </View>

      <ScrollView showsHorizontalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>Últimas notícias</Text>
        </View>

        <TouchableOpacity>
          <TopHeadlinesCarousel headlines={topHeadlines} />
        </TouchableOpacity>

        <Text style={styles.title}>Categorias</Text>

        <View>
          <FlatList
            data={news}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
              <CardNoticia
                urlToImage={item.urlToImage} 
                title={item.title} 
                publishedAt={item.publishedAt} 
                onPress={() => router.push({ pathname: '/detalhes', params: { urlToImage: item.urlToImage, title: item.title, content: item.content }})} 
              />
            )}
            contentContainerStyle={{ padding: 10}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  ButtonSearch:{
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
  areaTopHeadlines:{
    width: "100%",
  },
  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },
  newsItem:{
    width: "95%",
    height: 120,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row"
  },
  newsContent:{
    flex: 1,
    width: 100,
  }
})

export default Home;