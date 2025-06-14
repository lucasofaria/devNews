import colors from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function HeaderDetails() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.areaButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={18} color={colors.red} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.containerIconsRight}>
        <TouchableOpacity style={styles.areaButton}>
          <Ionicons name="share-social-outline" size={18} color={colors.red}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.areaButton}>
          <Ionicons name="bookmark-outline" size={18} color={colors.red}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.areaButton}>
          <Ionicons name="search" size={18} color={colors.red}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 10,
  },
  containerIconsRight:{
    flexDirection: "row",
    gap: 10,
  },
  areaButton:{
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  }
})