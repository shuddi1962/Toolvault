import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const quickTools = [
  { name: "PDF Merge", icon: "document-text", color: "#EF4444" },
  { name: "Image Compress", icon: "image", color: "#22C55E" },
  { name: "QR Generator", icon: "qr-code", color: "#6366F1" },
  { name: "JSON Format", icon: "code-slash", color: "#F59E0B" },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello! 👋</Text>
        <Text style={styles.title}>ToolVault Pro</Text>
        <Text style={styles.subtitle}>Your complete digital toolkit</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>50</Text>
          <Text style={styles.statLabel}>AI Credits</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Ops Today</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>Free</Text>
          <Text style={styles.statLabel}>Plan</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Tools</Text>
      <View style={styles.toolsGrid}>
        {quickTools.map((tool) => (
          <TouchableOpacity key={tool.name} style={styles.toolCard}>
            <Ionicons name={tool.icon as any} size={28} color={tool.color} />
            <Text style={styles.toolName}>{tool.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.upgradeCard}>
        <Ionicons name="star" size={24} color="#FCD34D" />
        <View style={styles.upgradeText}>
          <Text style={styles.upgradeTitle}>Upgrade to Pro</Text>
          <Text style={styles.upgradeSubtitle}>Get unlimited access for $9/mo</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: { padding: 20, paddingTop: 60, backgroundColor: "#1A56DB" },
  greeting: { fontSize: 14, color: "rgba(255,255,255,0.8)" },
  title: { fontSize: 28, fontWeight: "bold", color: "white", marginTop: 4 },
  subtitle: { fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 4 },
  statsRow: { flexDirection: "row", padding: 20, gap: 12 },
  statCard: { flex: 1, backgroundColor: "white", borderRadius: 12, padding: 16, alignItems: "center" },
  statValue: { fontSize: 24, fontWeight: "bold", color: "#1F2937" },
  statLabel: { fontSize: 12, color: "#6B7280", marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#1F2937", paddingHorizontal: 20, marginTop: 8 },
  toolsGrid: { flexDirection: "row", flexWrap: "wrap", padding: 20, gap: 12 },
  toolCard: { width: "47%", backgroundColor: "white", borderRadius: 12, padding: 16, alignItems: "center", gap: 8 },
  toolName: { fontSize: 14, fontWeight: "500", color: "#374151" },
  upgradeCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#FEF3C7", margin: 20, padding: 16, borderRadius: 12, gap: 12 },
  upgradeText: { flex: 1 },
  upgradeTitle: { fontSize: 16, fontWeight: "600", color: "#92400E" },
  upgradeSubtitle: { fontSize: 12, color: "#B45309", marginTop: 2 },
});
