import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // Check auth status and redirect
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F9FAFB" }}>
      <ActivityIndicator size="large" color="#1A56DB" />
    </View>
  );
}
