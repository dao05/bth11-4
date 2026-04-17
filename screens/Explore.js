import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomMenu from "../components/BottomMenu";
import { exploreCategories } from "../config/catalog";
import { exploreImages } from "../config/imageSources";

export default function Explore({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Find Products</Text>

          <View style={styles.searchBar}>
            <Image source={exploreImages.searchIcon} style={styles.searchIcon} />
            <Text style={styles.searchText}>Search Store</Text>
          </View>

          <View style={styles.grid}>
            {exploreCategories.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.categoryCard, { backgroundColor: item.tint, borderColor: item.border }]}
                activeOpacity={0.88}
                onPress={() => {
                  if (item.id === "beverages") {
                    navigation.navigate("Beverages");
                  }
                }}
              >
                <Image source={exploreImages.categories[item.id]} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <BottomMenu navigation={navigation} active="Explore" />
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
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 120,
  },
  title: {
    fontSize: 22,
    color: "#181725",
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 22,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F2F3F2",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 22,
  },
  searchText: {
    fontSize: 14,
    color: "#7C7C7C",
    fontWeight: "500",
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  categoryCard: {
    width: "48%",
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    minHeight: 188,
  },
  categoryImage: {
    width: "100%",
    height: 92,
    borderRadius: 22,
    resizeMode: "contain",
  },
  categoryText: {
    marginTop: 18,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#181725",
    fontWeight: "700",
  },
});
