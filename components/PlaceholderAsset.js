import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PlaceholderAsset({
  label,
  width = "100%",
  height = 80,
  borderRadius = 16,
  backgroundColor = "#F3F5F7",
  textColor = "#7C8796",
  style,
}) {
  return (
    <View
      style={[
        styles.placeholder,
        { width, height, borderRadius, backgroundColor },
        style,
      ]}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 12,
  },
});
