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

const currencies = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"];

export default function CurrencyScreen() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const rates: Record<string, number> = {
    USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.5, JPY: 149.2, CAD: 1.36, AUD: 1.53,
  };

  const handleConvert = async () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      Alert.alert("Error", "Enter a valid amount");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const converted = (val / rates[from] * rates[to]).toFixed(2);
    setLoading(false);
    setResult(`${val} ${from} = ${converted} ${to}`);
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setResult(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Currency Converter</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="100"
          />
        </View>

        <View style={styles.currencyRow}>
          <View style={styles.currencyCol}>
            <Text style={styles.label}>From</Text>
            <View style={styles.chipRow}>
              {currencies.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.chip, from === c && styles.chipActive]}
                  onPress={() => setFrom(c)}
                >
                  <Text style={[styles.chipText, from === c && styles.chipTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.swapBtn} onPress={handleSwap}>
          <Text style={styles.swapBtnText}>⇅ Swap</Text>
        </TouchableOpacity>

        <View style={styles.currencyCol}>
          <Text style={styles.label}>To</Text>
          <View style={styles.chipRow}>
            {currencies.map((c) => (
              <TouchableOpacity
                key={c}
                style={[styles.chip, to === c && styles.chipActive]}
                onPress={() => setTo(c)}
              >
                <Text style={[styles.chipText, to === c && styles.chipTextActive]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.processBtn, loading && styles.processBtnDisabled]}
          onPress={handleConvert}
          disabled={loading}
        >
          <Text style={styles.processBtnText}>
            {loading ? "Converting..." : "Convert"}
          </Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.result}>
            <Text style={styles.resultTitle}>Result</Text>
            <Text style={styles.resultText}>{result}</Text>
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
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  currencyRow: { marginBottom: 12 },
  currencyCol: { marginBottom: 12 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  chipActive: { backgroundColor: "#6366f1" },
  chipText: { fontSize: 13, color: "#666", fontWeight: "500" },
  chipTextActive: { color: "#fff" },
  swapBtn: {
    alignSelf: "center",
    padding: 10,
    marginBottom: 12,
  },
  swapBtnText: { fontSize: 18, color: "#6366f1" },
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
    backgroundColor: "#ecfdf5",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
  },
  resultTitle: { fontSize: 14, fontWeight: "600", color: "#065f46", marginBottom: 4 },
  resultText: { fontSize: 18, color: "#047857", fontWeight: "bold" },
});
