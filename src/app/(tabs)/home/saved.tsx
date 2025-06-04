import colors from "@/constants/colors";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";


export default function Saved(){
  return(
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Notícias salvas</Text>
      </View>
    </SafeAreaView>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background
  }
})