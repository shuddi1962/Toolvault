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

type CalculatorType = "bmi" | "emi" | "gst";

export default function CalculatorScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<CalculatorType>("bmi");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [gstAmount, setGstAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    if (activeTab === "bmi") {
      const h = parseFloat(height) / 100;
      const w = parseFloat(weight);
      if (h > 0 && w > 0) {
        const bmi = (w / (h * h)).toFixed(1);
        const category =
          parseFloat(bmi) < 18.5
            ? "Underweight"
            : parseFloat(bmi) < 25
            ? "Normal"
            : parseFloat(bmi) < 30
            ? "Overweight"
            : "Obese";
        setResult(`BMI: ${bmi} (${category})`);
      }
    } else if (activeTab === "emi") {
      const p = parseFloat(loanAmount);
      const r = parseFloat(interestRate) / 12 / 100;
      const n = parseFloat(tenure) * 12;
      if (p > 0 && r > 0 && n > 0) {
        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const total = emi * n;
        const interest = total - p;
        setResult(`EMI: ₹${emi.toFixed(0)}/mo | Total: ₹${total.toFixed(0)} | Interest: ₹${interest.toFixed(0)}`);
      }
    } else {
      const amount = parseFloat(gstAmount);
      const rate = parseFloat(gstRate);
      if (amount > 0) {
        const gst = (amount * rate) / 100;
        setResult(`GST (${rate}%): ₹${gst.toFixed(2)} | Total: ₹${(amount + gst).toFixed(2)}`);
      }
    }
    setLoading(false);
  };

  const tabs: { key: CalculatorType; label: string }[] = [
    { key: "bmi", label: "BMI" },
    { key: "emi", label: "EMI" },
    { key: "gst", label: "GST" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Universal Calculator</Text>
      </View>

      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabBtn, activeTab === tab.key && styles.tabBtnActive]}
            onPress={() => { setActiveTab(tab.key); setResult(null); }}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {activeTab === "bmi" && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput style={styles.input} value={height} onChangeText={setHeight} keyboardType="numeric" placeholder="170" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" placeholder="70" />
            </View>
          </>
        )}

        {activeTab === "emi" && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Loan Amount (₹)</Text>
              <TextInput style={styles.input} value={loanAmount} onChangeText={setLoanAmount} keyboardType="numeric" placeholder="1000000" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Interest Rate (%)</Text>
              <TextInput style={styles.input} value={interestRate} onChangeText={setInterestRate} keyboardType="numeric" placeholder="8.5" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tenure (Years)</Text>
              <TextInput style={styles.input} value={tenure} onChangeText={setTenure} keyboardType="numeric" placeholder="20" />
            </View>
          </>
        )}

        {activeTab === "gst" && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amount (₹)</Text>
              <TextInput style={styles.input} value={gstAmount} onChangeText={setGstAmount} keyboardType="numeric" placeholder="1000" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>GST Rate (%)</Text>
              <View style={styles.rateRow}>
                {["5", "12", "18", "28"].map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={[styles.rateBtn, gstRate === r && styles.rateBtnActive]}
                    onPress={() => setGstRate(r)}
                  >
                    <Text style={[styles.rateText, gstRate === r && styles.rateTextActive]}>{r}%</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}

        <TouchableOpacity
          style={[styles.processBtn, loading && styles.processBtnDisabled]}
          onPress={handleCalculate}
          disabled={loading}
        >
          <Text style={styles.processBtnText}>
            {loading ? "Calculating..." : "Calculate"}
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
  tabRow: { flexDirection: "row", padding: 16, gap: 8 },
  tabBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  tabBtnActive: { backgroundColor: "#6366f1" },
  tabText: { fontSize: 14, fontWeight: "600", color: "#666" },
  tabTextActive: { color: "#fff" },
  content: { padding: 16 },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  rateRow: { flexDirection: "row", gap: 8 },
  rateBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  rateBtnActive: { backgroundColor: "#6366f1" },
  rateText: { fontSize: 14, color: "#666" },
  rateTextActive: { color: "#fff" },
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
  },
  resultTitle: { fontSize: 14, fontWeight: "600", color: "#065f46", marginBottom: 4 },
  resultText: { fontSize: 15, color: "#047857", fontWeight: "500" },
});
