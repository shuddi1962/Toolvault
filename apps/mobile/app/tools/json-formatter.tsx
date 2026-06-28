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

export default function JsonFormatterScreen() {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState("2");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormat = async () => {
    if (!input.trim()) {
      Alert.alert("Error", "Enter JSON to format");
      return;
    }
    setLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 300));
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, parseInt(indent) || 2);
      setResult(formatted);
    } catch (e: any) {
      setError(e.message);
      setResult(null);
    }
    setLoading(false);
  };

  const handleMinify = async () => {
    if (!input.trim()) {
      Alert.alert("Error", "Enter JSON to minify");
      return;
    }
    setLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 200));
    try {
      const parsed = JSON.parse(input);
      setResult(JSON.stringify(parsed));
    } catch (e: any) {
      setError(e.message);
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>JSON Formatter</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>JSON Input</Text>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder='{"key": "value"}'
            multiline
            numberOfLines={6}
          />
        </View>

        <View style={styles.indentRow}>
          <Text style={styles.label}>Indent</Text>
          <View style={styles.indentBtns}>
            {["2", "4", "Tab"].map((v) => (
              <TouchableOpacity
                key={v}
                style={[styles.indentBtn, indent === v && styles.indentBtnActive]}
                onPress={() => setIndent(v)}
              >
                <Text style={[styles.indentText, indent === v && styles.indentTextActive]}>{v}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.processBtn, loading && styles.processBtnDisabled]}
            onPress={handleFormat}
            disabled={loading}
          >
            <Text style={styles.processBtnText}>Format</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.minifyBtn, loading && styles.processBtnDisabled]}
            onPress={handleMinify}
            disabled={loading}
          >
            <Text style={styles.minifyBtnText}>Minify</Text>
          </TouchableOpacity>
        </View>

        {error && (
          <View style={styles.error}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        )}

        {result && (
          <View style={styles.result}>
            <Text style={styles.resultTitle}>Formatted Output</Text>
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
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "monospace",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    minHeight: 140,
    textAlignVertical: "top",
  },
  indentRow: { marginBottom: 14 },
  indentBtns: { flexDirection: "row", gap: 8 },
  indentBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  indentBtnActive: { backgroundColor: "#6366f1" },
  indentText: { fontSize: 14, color: "#666" },
  indentTextActive: { color: "#fff" },
  btnRow: { flexDirection: "row", gap: 10 },
  processBtn: {
    flex: 1,
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  minifyBtn: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6366f1",
  },
  processBtnDisabled: { opacity: 0.6 },
  processBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  minifyBtnText: { color: "#6366f1", fontSize: 16, fontWeight: "600" },
  error: {
    backgroundColor: "#fef2f2",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  errorText: { fontSize: 13, color: "#dc2626" },
  result: {
    backgroundColor: "#ecfdf5",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  resultTitle: { fontSize: 14, fontWeight: "600", color: "#065f46", marginBottom: 8 },
  resultText: {
    fontSize: 13,
    fontFamily: "monospace",
    color: "#047857",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
  },
});
