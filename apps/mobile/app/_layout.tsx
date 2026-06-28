import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="tools" />
        <Stack.Screen name="music" />
        <Stack.Screen name="videos" />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
