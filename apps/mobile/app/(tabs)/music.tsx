import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const tracks = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", cover: "https://picsum.photos/seed/m1/100/100" },
  { id: 2, title: "Levitating", artist: "Dua Lipa", cover: "https://picsum.photos/seed/m2/100/100" },
  { id: 3, title: "Stay", artist: "The Kid LAROI", cover: "https://picsum.photos/seed/m3/100/100" },
];

export default function MusicScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Music Hub</Text>
        <Text style={styles.subtitle}>Discover and stream music</Text>
      </View>

      <Text style={styles.sectionTitle}>Trending</Text>
      {tracks.map((track) => (
        <TouchableOpacity key={track.id} style={styles.trackCard}>
          <Image source={{ uri: track.cover }} style={styles.cover} />
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{track.title}</Text>
            <Text style={styles.trackArtist}>{track.artist}</Text>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={20} color="#1A56DB" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

      <View style={styles.features}>
        <TouchableOpacity style={styles.featureCard}>
          <Ionicons name="mic" size={24} color="#EC4899" />
          <Text style={styles.featureTitle}>Vocal Remover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureCard}>
          <Ionicons name="search" size={24} color="#8B5CF6" />
          <Text style={styles.featureTitle}>Song Recognition</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureCard}>
          <Ionicons name="download" size={24} color="#22C55E" />
          <Text style={styles.featureTitle}>Download</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: { padding: 20, paddingTop: 60, backgroundColor: "white" },
  title: { fontSize: 28, fontWeight: "bold", color: "#1F2937" },
  subtitle: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#1F2937", paddingHorizontal: 20, marginTop: 20 },
  trackCard: { flexDirection: "row", alignItems: "center", padding: 16, marginHorizontal: 20, marginTop: 12, backgroundColor: "white", borderRadius: 12, gap: 12 },
  cover: { width: 56, height: 56, borderRadius: 8 },
  trackInfo: { flex: 1 },
  trackTitle: { fontSize: 16, fontWeight: "600", color: "#1F2937" },
  trackArtist: { fontSize: 14, color: "#6B7280", marginTop: 2 },
  playButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#EFF6FF", justifyContent: "center", alignItems: "center" },
  features: { flexDirection: "row", padding: 20, gap: 12, marginTop: 20 },
  featureCard: { flex: 1, backgroundColor: "white", borderRadius: 12, padding: 16, alignItems: "center", gap: 8 },
  featureTitle: { fontSize: 12, fontWeight: "500", color: "#374151", textAlign: "center" },
});
