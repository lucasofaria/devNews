import TopHeadlinesCarousel from "@/components/TopHeadlinesCarousel";
import colors from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Headline = {
  id: string;
  title: string;
  imageUrl: string;
}

const Home: React.FC = () => {

  const [topHeadlines, setTopHeadlines] = useState<Headline[]>([]);

  useEffect(() => {
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

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
        
        <View style={styles.ButtonSearch}>
          <Ionicons name="search" size={18} color={colors.red} />
        </View>
      </View>

      <ScrollView>
        <View>
          <Text style={styles.title}>Últimas notícias</Text>
        </View>
      
        <TopHeadlinesCarousel headlines={topHeadlines} />

        <Text style={styles.title}>Categorias</Text>
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
    paddingLeft: 10,
    paddingRight: 10,
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
  }
})

export default Home;