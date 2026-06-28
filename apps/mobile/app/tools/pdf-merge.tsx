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

export default function PdfMergeScreen() {
  const navigation = useNavigation();
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAddFiles = () => {
    const mockFiles = ["document1.pdf", "document2.pdf", "report.pdf"];
    setFiles(mockFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      Alert.alert("Error", "Add at least 2 PDF files to merge");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setResult("Merged successfully! Combined_2026.pdf (2.4 MB)");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>PDF Merge</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddFiles}>
          <Text style={styles.addBtnText}>+ Select PDF Files</Text>
        </TouchableOpacity>

        {files.length > 0 && (
          <View style={styles.fileList}>
            <Text style={styles.sectionTitle}>Selected Files ({files.length})</Text>
            {files.map((f, i) => (
              <View key={i} style={styles.fileItem}>
                <Text style={styles.fileName}>{f}</Text>
                <TouchableOpacity onPress={() => setFiles(files.filter((_, j) => j !== i))}>
                  <Text style={styles.removeBtn}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[styles.processBtn, loading && styles.processBtnDisabled]}
          onPress={handleMerge}
          disabled={loading}
        >
          <Text style={styles.processBtnText}>
            {loading ? "Merging..." : "Merge PDFs"}
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
  addBtn: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  fileList: { marginTop: 16 },
  sectionTitle: { fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 8 },
  fileItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  fileName: { fontSize: 14, color: "#333" },
  removeBtn: { fontSize: 16, color: "#ef4444" },
  processBtn: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
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
  resultText: { fontSize: 14, color: "#047857" },
});
