import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const videos = [
  { id: 1, title: "Building a SaaS", channel: "TechChannel", thumbnail: "https://picsum.photos/seed/vid1/320/180" },
  { id: 2, title: "React 19 Features", channel: "CodeAcademy", thumbnail: "https://picsum.photos/seed/vid2/320/180" },
  { id: 3, title: "Next.js Tutorial", channel: "DevMastery", thumbnail: "https://picsum.photos/seed/vid3/320/180" },
];

export default function VideosScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Video Hub</Text>
        <Text style={styles.subtitle}>Watch trending videos</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Downloader</Text>
        </TouchableOpacity>
      </View>

      {videos.map((video) => (
        <TouchableOpacity key={video.id} style={styles.videoCard}>
          <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Text style={styles.videoChannel}>{video.channel}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: { padding: 20, paddingTop: 60, backgroundColor: "white" },
  title: { fontSize: 28, fontWeight: "bold", color: "#1F2937" },
  subtitle: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  tabs: { flexDirection: "row", padding: 20, gap: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: "white", borderWidth: 1, borderColor: "#E5E7EB" },
  activeTab: { backgroundColor: "#1A56DB", borderColor: "#1A56DB" },
  tabText: { fontSize: 14, color: "#374151" },
  activeTabText: { color: "white" },
  videoCard: { marginHorizontal: 20, marginTop: 12, backgroundColor: "white", borderRadius: 12, overflow: "hidden" },
  thumbnail: { width: "100%", height: 180 },
  videoInfo: { padding: 12 },
  videoTitle: { fontSize: 16, fontWeight: "600", color: "#1F2937" },
  videoChannel: { fontSize: 14, color: "#6B7280", marginTop: 4 },
});
