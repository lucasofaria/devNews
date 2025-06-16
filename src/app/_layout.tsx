import { Stack } from "expo-router";

export default function RootLayout(){
  return(
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
      <Stack.Screen name="detalhes" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
    </Stack>
  )  
}