import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Button, Image, ScrollView, Text } from 'react-native';

export default function Detalhes() {
  const { title, content, urlToImage } = useLocalSearchParams<{ title: string; content: string; urlToImage: string }>();
  const router = useRouter();

  return (
    <ScrollView style={{ padding: 20 }}>
      <Image source={{ uri: urlToImage }} style={{ width: '100%', height: 200, marginBottom: 20, borderRadius: 10 }} />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
      <Text style={{ marginTop: 10 }}>{content}</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </ScrollView>
  );
}
