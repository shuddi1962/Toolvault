import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#6B7280" />
        </View>
        <Text style={styles.name}>Guest User</Text>
        <View style={styles.planBadge}>
          <Text style={styles.planText}>Free Plan</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Files</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>50</Text>
          <Text style={styles.statLabel}>AI Credits</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>0 MB</Text>
          <Text style={styles.statLabel}>Storage</Text>
        </View>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings" size={20} color="#6B7280" />
          <Text style={styles.menuText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="card" size={20} color="#6B7280" />
          <Text style={styles.menuText}>Billing</Text>
          <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="cloud" size={20} color="#6B7280" />
          <Text style={styles.menuText}>My Files</Text>
          <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="time" size={20} color="#6B7280" />
          <Text style={styles.menuText}>History</Text>
          <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.upgradeButton}>
        <Ionicons name="star" size={20} color="white" />
        <Text style={styles.upgradeText}>Upgrade to Pro - $9/mo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out" size={20} color="#EF4444" />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: { alignItems: "center", padding: 20, paddingTop: 60, backgroundColor: "white" },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#F3F4F6", justifyContent: "center", alignItems: "center" },
  name: { fontSize: 20, fontWeight: "600", color: "#1F2937", marginTop: 12 },
  planBadge: { backgroundColor: "#F3F4F6", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 8 },
  planText: { fontSize: 12, color: "#6B7280" },
  statsRow: { flexDirection: "row", padding: 20, gap: 12 },
  stat: { flex: 1, backgroundColor: "white", borderRadius: 12, padding: 16, alignItems: "center" },
  statValue: { fontSize: 20, fontWeight: "bold", color: "#1F2937" },
  statLabel: { fontSize: 12, color: "#6B7280", marginTop: 4 },
  menu: { margin: 20, backgroundColor: "white", borderRadius: 12, overflow: "hidden" },
  menuItem: { flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#F3F4F6", gap: 12 },
  menuText: { flex: 1, fontSize: 16, color: "#374151" },
  upgradeButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#1A56DB", marginHorizontal: 20, padding: 16, borderRadius: 12, gap: 8 },
  upgradeText: { color: "white", fontSize: 16, fontWeight: "600" },
  logoutButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 12, marginHorizontal: 20, padding: 16, borderRadius: 12, gap: 8 },
  logoutText: { color: "#EF4444", fontSize: 16, fontWeight: "500" },
});
