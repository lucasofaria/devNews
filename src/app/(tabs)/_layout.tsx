import colors from "@/constants/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function TabLayout(){
  return(
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: colors.white,
        paddingTop: 10,
      },
      tabBarActiveTintColor: colors.red,
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarShowLabel: false,
    }}>
      <Tabs.Screen
        name="page"
        options={{
          tabBarIcon: ({ focused, size }) => {
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
          tabBarIcon: ({ focused, size }) => {
            if (focused){
              return <Ionicons name="bookmark" size={size} color={colors.red} />
            }
            return <Ionicons name="bookmark-outline" size={size} color={colors.red} />
          },
        }}
      />
    </Tabs>
  )
}