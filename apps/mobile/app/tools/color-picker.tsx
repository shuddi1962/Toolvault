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

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

const presetColors = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280",
];

export default function ColorPickerScreen() {
  const navigation = useNavigation();
  const [hex, setHex] = useState("#6366f1");
  const [loading, setLoading] = useState(false);

  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(hex);
  const rgb = isValidHex ? hexToRgb(hex) : { r: 0, g: 0, b: 0 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const handleCopy = (value: string) => {
    Alert.alert("Copied", value);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Color Picker</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.colorPreview, { backgroundColor: isValidHex ? hex : "#ccc" }]} />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hex Color</Text>
          <View style={styles.hexRow}>
            <TextInput
              style={styles.hexInput}
              value={hex}
              onChangeText={(t) => setHex(t.startsWith("#") ? t : "#" + t)}
              placeholder="#6366f1"
              maxLength={7}
            />
            <View style={[styles.hexPreview, { backgroundColor: isValidHex ? hex : "#ccc" }]} />
          </View>
        </View>

        <View style={styles.presetsSection}>
          <Text style={styles.label}>Preset Colors</Text>
          <View style={styles.presetRow}>
            {presetColors.map((c) => (
              <TouchableOpacity
                key={c}
                style={[styles.presetBtn, { backgroundColor: c }, hex === c && styles.presetBtnActive]}
                onPress={() => setHex(c)}
              />
            ))}
          </View>
        </View>

        {isValidHex && (
          <View style={styles.valuesSection}>
            <Text style={styles.sectionTitle}>Color Values</Text>

            <TouchableOpacity style={styles.valueRow} onPress={() => handleCopy(hex)}>
              <Text style={styles.valueLabel}>HEX</Text>
              <Text style={styles.valueText}>{hex}</Text>
              <Text style={styles.copyHint}>Tap to copy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.valueRow} onPress={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}>
              <Text style={styles.valueLabel}>RGB</Text>
              <Text style={styles.valueText}>rgb({rgb.r}, {rgb.g}, {rgb.b})</Text>
              <Text style={styles.copyHint}>Tap to copy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.valueRow} onPress={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}>
              <Text style={styles.valueLabel}>HSL</Text>
              <Text style={styles.valueText}>hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</Text>
              <Text style={styles.copyHint}>Tap to copy</Text>
            </TouchableOpacity>
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
  colorPreview: {
    height: 120,
    borderRadius: 16,
    marginBottom: 20,
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 6 },
  hexRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  hexInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 18,
    fontFamily: "monospace",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  hexPreview: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  presetsSection: { marginBottom: 20 },
  presetRow: { flexDirection: "row", gap: 8 },
  presetBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  presetBtnActive: {
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  valuesSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: { fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 12 },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  valueLabel: {
    width: 50,
    fontSize: 12,
    fontWeight: "700",
    color: "#6366f1",
  },
  valueText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "monospace",
    color: "#333",
  },
  copyHint: { fontSize: 11, color: "#999" },
});
