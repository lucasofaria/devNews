import HeaderDetails from '@/components/HeaderDetails';
import colors from '@/constants/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Detalhes() {
  const { title, content, urlToImage, author, url, publishedAt } = useLocalSearchParams<{ title: string; content: string; urlToImage: string, author: string, url: string, publishedAt: string }>();
  const router = useRouter();

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  const headerText = author && author != 'null' ? `Por ${author} - ${formatDate(publishedAt)}` : formatDate(publishedAt);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderDetails />
    
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