import colors from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TopHeadlines() {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <Image 
        source={require("@/assets/images/teste.jpg")}  
        style={styles.image} 
      />

      <View style={styles.titleArea}>
        <Text style={styles.title}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
      </View>

      <LinearGradient
        style={styles.gradient}
        colors={['transparent', 'rgba(0,0,0, 0.70)', 'rgba(0,0,0, 0.95)']}
      />  
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
    width: 300,
  },
  image:{
    width: "100%", 
    height: 180, 
    borderRadius: 10,
  },
  titleArea:{
    position: "absolute",
    bottom: 14,
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 99,
  },
  title:{
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "justify",
  },
  gradient:{
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "055%",
    borderRadius: 10,
    zIndex: 1,
    backgroundColor: "transparent",
  }
})