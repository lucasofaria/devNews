import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

type Headline = {
  id: string;
  title: string;
  imageUrl: string;
};

type Props = {
  headlines: Headline[];
};

const TopHeadlinesCarousel: React.FC<Props> = ({ headlines }) => {
  return(
    <Carousel
      width={width}
      height={200}
      data={headlines}
      autoPlay
      autoPlayInterval={5000}
      scrollAnimationDuration={2000}
      loop
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      )}
    >
      
    </Carousel>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 8,
    backgroundColor: 'trasparent'
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
});

export default TopHeadlinesCarousel;