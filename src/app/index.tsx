import colors from "@/constants/colors";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={colors.red} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background
  }  
})
