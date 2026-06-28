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

export default function QrCodeScreen() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [size, setSize] = useState("200");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) {
      Alert.alert("Error", "Enter text or URL to encode");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setGenerated(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>QR Code Generator</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Text or URL</Text>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="https://example.com"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Size (px)</Text>
          <View style={styles.sizeRow}>
            {["150", "200", "300", "400"].map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.sizeBtn, size === s && styles.sizeBtnActive]}
                onPress={() => setSize(s)}
              >
                <Text style={[styles.sizeText, size === s && styles.sizeTextActive]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.processBtn, loading && styles.processBtnDisabled]}
          onPress={handleGenerate}
          disabled={loading}
        >
          <Text style={styles.processBtnText}>
            {loading ? "Generating..." : "Generate QR Code"}
          </Text>
        </TouchableOpacity>

        {generated && (
          <View style={styles.result}>
            <Text style={styles.resultTitle}>QR Code Generated</Text>
            <View style={styles.qrPlaceholder}>
              <Text style={styles.qrText}>▓▓▓▓▓▓▓{'\n'}▓░░░░░▓{'\n'}▓░▓▓░▓{'\n'}▓░░░░▓{'\n'}▓▓▓▓▓▓▓</Text>
            </View>
            <Text style={styles.resultInfo}>Size: {size}×{size}px</Text>
            <Text style={styles.resultInfo}>Encoded: {text.substring(0, 30)}...</Text>
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
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    minHeight: 80,
    textAlignVertical: "top",
  },
  sizeRow: { flexDirection: "row", gap: 8 },
  sizeBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  sizeBtnActive: { backgroundColor: "#6366f1" },
  sizeText: { fontSize: 14, color: "#666" },
  sizeTextActive: { color: "#fff" },
  processBtn: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  processBtnDisabled: { opacity: 0.6 },
  processBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  result: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
  },
  resultTitle: { fontSize: 16, fontWeight: "600", marginBottom: 16 },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  qrText: { fontSize: 24, fontFamily: "monospace", color: "#333" },
  resultInfo: { fontSize: 13, color: "#666", marginTop: 8 },
});
