import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PdfCompressScreen() {
  const navigation = useNavigation();
  const [hasFile, setHasFile] = useState(false);
  const [quality, setQuality] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ original: string; compressed: string; savings: string } | null>(null);

  const qualities = ["low", "medium", "high"];

  const handleSelectFile = () => {
    setHasFile(true);
  };

  const handleCompress = async () => {
    if (!hasFile) {
      Alert.alert("Error", "Select a PDF file first");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setResult({
      original: "5.2 MB",
      compressed: quality === "high" ? "3.8 MB" : quality === "medium" ? "2.1 MB" : "1.4 MB",
      savings: quality === "high" ? "27%" : quality === "medium" ? "60%" : "73%",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>PDF Compress</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.selectBtn} onPress={handleSelectFile}>
          <Text style={styles.selectBtnText}>
            {hasFile ? "📄 report_2026.pdf" : "+ Select PDF File"}
          </Text>
        </TouchableOpacity>

        <View style={styles.qualitySection}>
          <Text style={styles.sectionTitle}>Compression Quality</Text>
          <View style={styles.qualityRow}>
            {qualities.map((q) => (
              <TouchableOpacity
                key={q}
                style={[styles.qualityBtn, quality === q && styles.qualityBtnActive]}
                onPress={() => setQuality(q)}
              >
                <Text style={[styles.qualityText, quality === q && styles.qualityTextActive]}>
                  {q.charAt(0).toUpperCase() + q.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.processBtn, loading && styles.processBtnDisabled]}
          onPress={handleCompress}
          disabled={loading}
        >
          <Text style={styles.processBtnText}>
            {loading ? "Compressing..." : "Compress PDF"}
          </Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.result}>
            <Text style={styles.resultTitle}>Compression Result</Text>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Original</Text>
                <Text style={styles.statValue}>{result.original}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Compressed</Text>
                <Text style={styles.statValue}>{result.compressed}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Savings</Text>
                <Text style={[styles.statValue, { color: "#059669" }]}>{result.savings}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { padding: 16, paddingTop: 48, backgroundColor: "#fff" },
  backBtn: { fontSize: 16, color: "#6366f1" },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 8 },
  content: { padding: 16 },
  selectBtn: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#6366f1",
    alignItems: "center",
  },
  selectBtnText: { fontSize: 16, color: "#6366f1", fontWeight: "600" },
  qualitySection: { marginTop: 20 },
  sectionTitle: { fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 10 },
  qualityRow: { flexDirection: "row", gap: 10 },
  qualityBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  qualityBtnActive: { backgroundColor: "#6366f1" },
  qualityText: { fontSize: 14, color: "#666", fontWeight: "500" },
  qualityTextActive: { color: "#fff" },
  processBtn: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  processBtnDisabled: { opacity: 0.6 },
  processBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  result: {
    backgroundColor: "#ecfdf5",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  resultTitle: { fontSize: 14, fontWeight: "600", color: "#065f46", marginBottom: 12 },
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  stat: { alignItems: "center" },
  statLabel: { fontSize: 12, color: "#6b7280" },
  statValue: { fontSize: 18, fontWeight: "bold", marginTop: 4 },
});
