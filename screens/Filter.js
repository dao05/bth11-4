import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { filterImages } from "../config/imageSources";
import { filterBrands, filterCategories } from "../data";
import { useStore } from "../context/StoreContext";

function CheckboxRow({ checked, label, onPress }) {
  return (
    <TouchableOpacity style={styles.optionRow} activeOpacity={0.85} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checkboxActive]}>
        {checked ? <Text style={styles.checkmark}>v</Text> : null}
      </View>
      <Text style={[styles.optionText, checked && styles.optionTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function Filter({ navigation }) {
  const { selectedFilters, setFiltersApplied, setSelectedFilters } = useStore();
  const [draft, setDraft] = useState(selectedFilters);

  const toggleValue = (group, value) => {
    setDraft((current) => {
      const values = current[group];
      const nextValues = values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value];

      return {
        ...current,
        [group]: nextValues,
      };
    });
  };

  const handleApply = () => {
    setSelectedFilters(draft);
    setFiltersApplied(true);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={filterImages.closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>Categories</Text>
          {filterCategories.map((item) => (
            <CheckboxRow
              key={item.id}
              checked={draft.categories.includes(item.id)}
              label={item.label}
              onPress={() => toggleValue("categories", item.id)}
            />
          ))}

          <Text style={[styles.sectionTitle, styles.brandTitle]}>Brand</Text>
          {filterBrands.map((item) => (
            <CheckboxRow
              key={item.id}
              checked={draft.brands.includes(item.id)}
              label={item.label}
              onPress={() => toggleValue("brands", item.id)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  closeIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    color: "#181725",
    fontWeight: "700",
  },
  headerSpacer: {
    width: 24,
  },
  panel: {
    flex: 1,
    backgroundColor: "#F2F3F2",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  sectionTitle: {
    fontSize: 24,
    color: "#181725",
    fontWeight: "700",
    marginBottom: 18,
  },
  brandTitle: {
    marginTop: 26,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#B1B1B1",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxActive: {
    backgroundColor: "#53B175",
    borderColor: "#53B175",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  optionText: {
    fontSize: 16,
    color: "#181725",
    fontWeight: "500",
  },
  optionTextActive: {
    color: "#53B175",
  },
  applyButton: {
    marginTop: 24,
    backgroundColor: "#53B175",
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 20,
  },
  applyText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
