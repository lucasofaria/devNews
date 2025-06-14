import { fetchTopHeadlines } from '@/src/services/api';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';

export default function Saved() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTopHeadlines()
      .then(setNews)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <SafeAreaView>

      <FlatList
        data={news}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/detalhes', params: { title: item.title, content: item.content }})}
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text numberOfLines={2}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
}
