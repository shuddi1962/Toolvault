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

export default function PasswordGenScreen() {
  const navigation = useNavigation();
  const [length, setLength] = useState("16");
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const generatePassword = () => {
    const len = parseInt(length) || 16;
    let chars = "";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return "Error";
    let pass = "";
    for (let i = 0; i < len; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  };

  const handleGenerate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    setLoading(false);
    setResult(generatePassword());
  };

  const toggle = (setter: (v: boolean) => void, value: boolean) => setter(!value);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Password Generator</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Length</Text>
          <TextInput
            style={styles.input}
            value={length}
            onChangeText={setLength}
            keyboardType="numeric"
            placeholder="16"
          />
        </View>

        <View style={styles.optionsGrid}>
          {[
            { label: "Uppercase", value: useUpper, setter: setUseUpper },
            { label: "Lowercase", value: useLower, setter: setUseLower },
            { label: "Numbers", value: useNumbers, setter: setUseNumbers },
            { label: "Symbols", value: useSymbols, setter: setUseSymbols },
          ].map((opt) => (
            <TouchableOpacity
              key={opt.label}
              style={[styles.optionBtn, opt.value && styles.optionBtnActive]}
              onPress={() => toggle(opt.setter, opt.value)}
            >
              <Text style={[styles.optionText, opt.value && styles.optionTextActive]}>
                {opt.value ? "✓" : "✕"} {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.processBtn, loading && styles.processBtnDisabled]}
          onPress={handleGenerate}
          disabled={loading}
        >
          <Text style={styles.processBtnText}>
            {loading ? "Generating..." : "Generate Password"}
          </Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.result}>
            <Text style={styles.resultTitle}>Generated Password</Text>
            <Text style={styles.passwordText} selectable>{result}</Text>
            <Text style={styles.resultInfo}>Tap to select and copy</Text>
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
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  optionBtn: {
    width: "48%",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  optionBtnActive: { backgroundColor: "#ede9fe" },
  optionText: { fontSize: 14, color: "#999", fontWeight: "500" },
  optionTextActive: { color: "#6366f1" },
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
  },
  resultTitle: { fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 10 },
  passwordText: {
    fontSize: 18,
    fontFamily: "monospace",
    color: "#111",
    backgroundColor: "#f3f4f6",
    padding: 14,
    borderRadius: 8,
    letterSpacing: 1,
  },
  resultInfo: { fontSize: 12, color: "#999", marginTop: 8, textAlign: "center" },
});
