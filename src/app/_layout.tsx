import { Stack } from "expo-router";

export default function Layout(){
  return(
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" options={{ headerShown:false }} />
      <Stack.Screen name="saved" options={{ headerShown:false }} />
    </Stack>
  )  
}