import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ImageCompressScreen() {
  const navigation = useNavigation();
  const [quality, setQuality] = useState("80");
  const [hasFile, setHasFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ original: string; compressed: string; size: string } | null>(null);

  const handleSelect = () => setHasFile(true);

  const handleCompress = async () => {
    if (!hasFile) {
      Alert.alert("Error", "Select an image first");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setResult({
      original: "photo.jpg",
      compressed: "photo_compressed.jpg",
      size: `${(parseInt(quality || "80") * 4.2 / 100).toFixed(1)} MB`,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Image Compress</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.selectBtn} onPress={handleSelect}>
          <Text style={styles.selectBtnText}>
            {hasFile ? "🖼️ photo_2026.jpg" : "+ Select Image"}
          </Text>
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quality (1-100)</Text>
          <TextInput
            style={styles.input}
            value={quality}
            onChangeText={setQuality}
            keyboardType="numeric"
            placeholder="80"
          />
        </View>

        <View style={styles.presets}>
          {[60, 70, 80, 90].map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.presetBtn, quality === String(v) && styles.presetBtnActive]}
              onPress={() => setQuality(String(v))}
            >
              <Text style={[styles.presetText, quality === String(v) && styles.presetTextActive]}>
                {v}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.processBtn, loading && styles.processBtnDisabled]}
          onPress={handleCompress}
          disabled={loading}
        >
          <Text style={styles.processBtnText}>
            {loading ? "Compressing..." : "Compress Image"}
          </Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.result}>
            <Text style={styles.resultTitle}>Result</Text>
            <Text style={styles.resultText}>Original: {result.original}</Text>
            <Text style={styles.resultText}>Output: {result.compressed}</Text>
            <Text style={[styles.resultText, { fontWeight: "bold" }]}>Size: {result.size}</Text>
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
  inputGroup: { marginTop: 16 },
  label: { fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  presets: { flexDirection: "row", gap: 8, marginTop: 10 },
  presetBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  presetBtnActive: { backgroundColor: "#6366f1" },
  presetText: { fontSize: 14, color: "#666" },
  presetTextActive: { color: "#fff" },
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
  resultTitle: { fontSize: 14, fontWeight: "600", color: "#065f46", marginBottom: 8 },
  resultText: { fontSize: 14, color: "#047857", marginBottom: 4 },
});
