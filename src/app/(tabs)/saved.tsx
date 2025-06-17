import CardNoticia from '@/components/CardNoticia';
import colors from '@/constants/colors';
import { Noticia } from '@/src/types/Noticia';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Saved: React.FC = () => {
  const [favorites, setFavorites] = useState<Noticia[]>([]);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        const data = await AsyncStorage.getItem('@favorites_news');
        if (data) {
          setFavorites(JSON.parse(data));
        }
      };
      
      loadFavorites();
    }, [])
  )

  return(
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <View style={styles.containerHeader}>
        <TouchableOpacity style={styles.areaButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={18} color={colors.red} />
        </TouchableOpacity>

        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Notícias salvas</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.url}
        renderItem={({item}) => (
          <CardNoticia
            title={item.title}
            author={item.author}
            publishedAt={item.publishedAt}
            urlToImage={item.urlToImage}
            onPress={() =>
              router.push({
                pathname: "/detalhes",
                params: {
                  title: item.title,
                  urlToImage: item.urlToImage || "",
                  author: item.author || "",
                  publishedAt: item.publishedAt,
                  url: item.url,
                  content: item.content || "",
                },
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Nenhuma notícia salva ainda.</Text>}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors.background,
  },
  areaButton:{
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  containerHeader:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background,
    padding: 10,
  },
  logo:{
    width: 100,
    height: 50
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    color: colors.red,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 20
  },
});

export default Saved;