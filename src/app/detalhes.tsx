import colors from '@/constants/colors';
import { addFavorite, isFavorite, removeFavorite } from '@/src/utils/storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Linking, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Detalhes() {
  const { title, content, urlToImage, author, url, publishedAt } = useLocalSearchParams<{ title: string; content: string; urlToImage: string, author: string, url: string, publishedAt: string }>();
  const router = useRouter();
  const [favorited, setFavorited] = useState(false); 

  useEffect(() => {
    checkFavorite();
  },[]);

  const checkFavorite = async () => {
    const result = await isFavorite(url);
    setFavorited(result);
  };

  const handleFavorite = async () => {
    if (favorited) {
      await removeFavorite(url);
    } else {
      await addFavorite({title, urlToImage, author, publishedAt, url, content});
    }
    setFavorited(!favorited);
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  async function shareNotice(){
    try{
      await Share.share({
        url: url,
        message: `${title}\n\nAchei essa notícia no DevNews.\n\n${url}`
      });
    }catch(error){
      console.log(error);
    }
  }

  const headerText = author && author != 'null' ? `Por ${author} - ${formatDate(publishedAt)}` : formatDate(publishedAt);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <View>
          <TouchableOpacity style={styles.areaButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={18} color={colors.red} />
          </TouchableOpacity>
        </View>
      
        <View style={styles.containerIconsRight}>
          <TouchableOpacity style={styles.areaButton} onPress={shareNotice}>
            <Ionicons name="share-social-outline" size={18} color={colors.red}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.areaButton} onPress={handleFavorite}>
            <Ionicons name={favorited ? "bookmark" : "bookmark-outline"} size={18} color={colors.red}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.areaButton}>
            <Ionicons name="search" size={18} color={colors.red}/>
          </TouchableOpacity>
        </View>
      </View>
    
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.meta}>{headerText}</Text>

        <Image source={{ uri: urlToImage }} style={{ width: '100%', height: 200, marginBottom: 20, borderRadius: 10 }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ marginTop: 10 }}>{content}</Text>

        <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL(url)}>
          <Text style={styles.linkText}>Ler notícia completa</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors.background
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
  linkButton:{
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignSelf: 'center',
  },
  meta:{
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'medium',
    marginBottom: 10,
  },
  linkText:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
})