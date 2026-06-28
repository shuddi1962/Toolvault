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

const languages = [
  { code: "en-US", label: "English" },
  { code: "es-ES", label: "Spanish" },
  { code: "fr-FR", label: "French" },
  { code: "de-DE", label: "German" },
  { code: "hi-IN", label: "Hindi" },
  { code: "ja-JP", label: "Japanese" },
];

export default function TextToSpeechScreen() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [rate, setRate] = useState("1.0");
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);

  const handleSpeak = async () => {
    if (!text.trim()) {
      Alert.alert("Error", "Enter text to speak");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setPlaying(true);
    setTimeout(() => setPlaying(false), 3000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Text-to-Speech</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Text</Text>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Enter text to convert to speech..."
            multiline
            numberOfLines={5}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Language</Text>
          <View style={styles.chipRow}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[styles.chip, language === lang.code && styles.chipActive]}
                onPress={() => setLanguage(lang.code)}
              >
                <Text style={[styles.chipText, language === lang.code && styles.chipTextActive]}>
                  {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Speed: {rate}x</Text>
          <View style={styles.speedRow}>
            {["0.5", "0.75", "1.0", "1.5", "2.0"].map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.speedBtn, rate === s && styles.speedBtnActive]}
                onPress={() => setRate(s)}
              >
                <Text style={[styles.speedText, rate === s && styles.speedTextActive]}>{s}x</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.processBtn, loading && styles.processBtnDisabled]}
          onPress={handleSpeak}
          disabled={loading || playing}
        >
          <Text style={styles.processBtnText}>
            {loading ? "Preparing..." : playing ? "🔊 Speaking..." : "🔊 Speak"}
          </Text>
        </TouchableOpacity>

        {playing && (
          <View style={styles.playingIndicator}>
            <View style={styles.bar1} />
            <View style={styles.bar2} />
            <View style={styles.bar3} />
            <View style={styles.bar4} />
            <View style={styles.bar5} />
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
    minHeight: 120,
    textAlignVertical: "top",
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  chipActive: { backgroundColor: "#6366f1" },
  chipText: { fontSize: 13, color: "#666" },
  chipTextActive: { color: "#fff" },
  speedRow: { flexDirection: "row", gap: 6 },
  speedBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  speedBtnActive: { backgroundColor: "#6366f1" },
  speedText: { fontSize: 13, color: "#666" },
  speedTextActive: { color: "#fff" },
  processBtn: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  processBtnDisabled: { opacity: 0.6 },
  processBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  playingIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: 40,
    marginTop: 20,
    gap: 6,
  },
  bar1: { width: 6, height: 20, backgroundColor: "#6366f1", borderRadius: 3 },
  bar2: { width: 6, height: 30, backgroundColor: "#6366f1", borderRadius: 3 },
  bar3: { width: 6, height: 15, backgroundColor: "#6366f1", borderRadius: 3 },
  bar4: { width: 6, height: 35, backgroundColor: "#6366f1", borderRadius: 3 },
  bar5: { width: 6, height: 25, backgroundColor: "#6366f1", borderRadius: 3 },
});
