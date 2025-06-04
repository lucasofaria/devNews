import colors from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import TopHeadlines from "../../../../components/TopHeadlines";

export default function Home(){
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
        
        <View style={styles.areaSearch}>
          <Ionicons name="search" size={18} color={colors.red} />
        </View>
      </View>
      
      <View>
        <Text style={styles.title}>Últimas notícias</Text>
      </View>

      <TopHeadlines/>
    </SafeAreaView>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingLeft: 15,
    paddingRight: 15
  },
  header:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
    marginTop: 50,
  },
  logo:{
    width: 100,
    height: 50
  },
  areaSearch:{
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    color: colors.red,
    marginTop: 20,
    marginBottom: 20
  }
})