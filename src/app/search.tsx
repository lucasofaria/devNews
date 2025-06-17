import CardNoticia from '@/components/CardNoticia';
import colors from '@/constants/colors';
import { Noticia } from '@/src/types/Noticia';
import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search: React.FC = () => {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (query.length < 3 ) {
      return  Alert.alert('Erro', 'Digite pelo menos 3 caracteres para buscar.');
    }
    setLoading(true);
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&language=pt&sortBy=publishedAt&apiKey=${Constants.expoConfig?.extra?.newsApiKey}`);
      const data = await response.json();
      setResults(data.articles || []);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar as notícias. Tente novamente.');
      console.error('Erro ao buscar notícias:', error);
    }
    setLoading(false);
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <TouchableOpacity style={styles.areaButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={18} color={colors.red} />
        </TouchableOpacity>

        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      <TextInput
        placeholder='Ex.: Bitcoin'
        placeholderTextColor={"#ddd"}
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      {loading ? (
        <ActivityIndicator size="large" color={colors.red} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
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
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors.background,
  },
  containerHeader:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 10,
  },
  containerIconsRight:{
    flexDirection: "row",
    gap: 10,
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
  logo:{
    width: 100,
    height: 50
  },
  input: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
})

export default Search;