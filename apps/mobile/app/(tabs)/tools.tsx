import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  { name: "PDF Tools", icon: "document-text", color: "#EF4444", tools: ["Merge", "Split", "Compress"] },
  { name: "Image Tools", icon: "image", color: "#22C55E", tools: ["Compress", "Upscale", "BG Remove"] },
  { name: "AI Content", icon: "sparkles", color: "#8B5CF6", tools: ["Article", "Email", "Rewrite"] },
  { name: "Dev Tools", icon: "code-slash", color: "#3B82F6", tools: ["JSON", "Base64", "Regex"] },
  { name: "Calculators", icon: "calculator", color: "#14B8A6", tools: ["BMI", "EMI", "GST"] },
  { name: "Audio Editor", icon: "musical-notes", color: "#EC4899", tools: ["Trim", "Merge", "Convert"] },
  { name: "Video Editor", icon: "film", color: "#06B6D4", tools: ["Trim", "Merge", "Subtitles"] },
  { name: "SEO Tools", icon: "globe", color: "#F97316", tools: ["PageSpeed", "Backlinks"] },
];

export default function ToolsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Tools</Text>
        <Text style={styles.subtitle}>15 modules, 100+ tools</Text>
      </View>

      <View style={styles.grid}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.name} style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: `${cat.color}15` }]}>
              <Ionicons name={cat.icon as any} size={28} color={cat.color} />
            </View>
            <Text style={styles.cardTitle}>{cat.name}</Text>
            <Text style={styles.cardTools}>{cat.tools.join(" • ")}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: { padding: 20, paddingTop: 60, backgroundColor: "white" },
  title: { fontSize: 28, fontWeight: "bold", color: "#1F2937" },
  subtitle: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  grid: { padding: 20, gap: 16 },
  card: { backgroundColor: "white", borderRadius: 16, padding: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  iconContainer: { width: 56, height: 56, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#1F2937" },
  cardTools: { fontSize: 13, color: "#6B7280", marginTop: 4 },
});
