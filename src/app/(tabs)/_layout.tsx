import colors from "@/constants/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function Layout(){
  return(
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: colors.white,
        borderTopWidth: 0,
      },
      tabBarActiveTintColor: colors.red,
      headerShown: false,
    }}>
      <Tabs.Screen
        name="page"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused){
              return <Ionicons name="home" size={size} color={colors.red} />
            }
            return <Ionicons name="home-outline" size={size} color={colors.red} />
          },
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused){
              return <Ionicons name="save" size={size} color={colors.red} />
            }
            return <Ionicons name="save-outline" size={size} color={colors.red} />
          },
        }}
      />
    </Tabs>
  )
}