import { Noticia } from "@/src/types/Noticia";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

type Props = {
  headlines: Noticia[];
};

const TopHeadlinesCarousel: React.FC<Props> = ({ headlines }) => {
  const router = useRouter();
  const progress = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  return(
    <>
      <Carousel
        width={width}
        height={200}
        data={headlines}
        autoPlay
        autoPlayInterval={5000}
        scrollAnimationDuration={2000}
        loop
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
          setCurrentIndex(Math.round(absoluteProgress));
        }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.container} 
              onPress={() => 
                router.push({
                  pathname: '/detalhes',
                  params: {
                    title: item.title,
                    urlToImage: item.urlToImage || '',
                    author: item.author || '',
                    publishedAt: item.publishedAt,
                    url: item.url,
                    content: item.content || '',
                  },
                })
            }
          >
            <Image 
              source={{ 
                uri: item.urlToImage.startsWith('http')
                ? item.urlToImage
                : `https://placehold.co/400x200?text=Sem+conteúdo`, 
              }}
              style={styles.image} 
            />
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />    
          
      <View style={styles.indicatorContainer}>
        {headlines.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: 'trasparent',
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#e60023", // Vermelho
  },
});

export default TopHeadlinesCarousel;