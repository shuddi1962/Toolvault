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

export default function Base64Screen() {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!input.trim()) {
      Alert.alert("Error", "Enter text to process");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    try {
      if (mode === "encode") {
        setResult(btoa(unescape(encodeURIComponent(input))));
      } else {
        setResult(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      Alert.alert("Error", "Invalid input for decoding");
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Base64 Encoder/Decoder</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.modeRow}>
          <TouchableOpacity
            style={[styles.modeBtn, mode === "encode" && styles.modeBtnActive]}
            onPress={() => { setMode("encode"); setResult(null); }}
          >
            <Text style={[styles.modeText, mode === "encode" && styles.modeTextActive]}>Encode</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeBtn, mode === "decode" && styles.modeBtnActive]}
            onPress={() => { setMode("decode"); setResult(null); }}
          >
            <Text style={[styles.modeText, mode === "decode" && styles.modeTextActive]}>Decode</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{mode === "encode" ? "Plain Text" : "Base64 String"}</Text>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder={mode === "encode" ? "Enter text..." : "Enter base64..."}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity
          style={[styles.processBtn, loading && styles.processBtnDisabled]}
          onPress={handleProcess}
          disabled={loading}
        >
          <Text style={styles.processBtnText}>
            {loading ? "Processing..." : mode === "encode" ? "Encode" : "Decode"}
          </Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.result}>
            <Text style={styles.resultTitle}>{mode === "encode" ? "Encoded" : "Decoded"} Result</Text>
            <Text style={styles.resultText} selectable>{result}</Text>
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
  modeRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  modeBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  modeBtnActive: { backgroundColor: "#6366f1" },
  modeText: { fontSize: 14, fontWeight: "600", color: "#666" },
  modeTextActive: { color: "#fff" },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    minHeight: 100,
    textAlignVertical: "top",
  },
  processBtn: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
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
  resultText: {
    fontSize: 14,
    color: "#047857",
    fontFamily: "monospace",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
  },
});
