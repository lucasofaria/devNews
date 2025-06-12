import colors from '@/constants/colors';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  title: string;
  publishedAt: string;
  urlToImage: string;
  onPress: () => void;
}

export default function CardNoticia({ title, publishedAt, urlToImage, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View>
          <Image source={{ uri: urlToImage }} style={styles.newsImage}/>
        </View>

        <View style={styles.newsContent}>
          <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.published} ellipsizeMode="tail">
            {publishedAt}
          </Text>
        </View>  
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2, // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'row',
  },
  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  newsContent: {
    flex: 1,
    justifyContent: 'space-between',
    maxWidth: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  published: {
    fontSize: 14,
    color: '#555',
  },
});
