import React, { useMemo, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomMenu from "../components/BottomMenu";
import { beveragesImages, exploreImages } from "../config/imageSources";
import { useStore } from "../context/StoreContext";
import { formatPrice, searchableProducts } from "../data";

function SearchCard({ item, onAdd }) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardMeta}>{item.subtitle}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => onAdd(item.id)}>
          <Image source={beveragesImages.addIcon} style={styles.addIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Search({ navigation }) {
  const [query, setQuery] = useState("");
  const { addToCart, filtersApplied, selectedFilters } = useStore();

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return searchableProducts.filter((item) => {
      const matchQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery);

      const matchCategory =
        !filtersApplied ||
        selectedFilters.categories.length === 0 ||
        selectedFilters.categories.includes(item.filterCategory);

      const matchBrand =
        !filtersApplied ||
        selectedFilters.brands.length === 0 ||
        selectedFilters.brands.includes(item.brand);

      return matchQuery && matchCategory && matchBrand;
    });
  }, [filtersApplied, query, selectedFilters]);

  const handleAddToCart = (productId) => {
    addToCart(productId);
    navigation.navigate("Cart");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.searchBar}>
            <Image source={exploreImages.searchIcon} style={styles.searchIcon} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search products"
              placeholderTextColor="#7C7C7C"
              style={styles.input}
              autoFocus
            />
            {query.length > 0 ? (
              <TouchableOpacity onPress={() => setQuery("")}>
                <Text style={styles.clearText}>x</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate("Filter")}
          >
            <Image source={beveragesImages.filterIcon} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.grid}>
            {filteredProducts.map((item) => (
              <SearchCard key={item.id} item={item} onAdd={handleAddToCart} />
            ))}
          </View>

          {filteredProducts.length === 0 ? (
            <Text style={styles.emptyText}>No products match your search.</Text>
          ) : null}
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
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    borderRadius: 14,
    paddingHorizontal: 14,
    minHeight: 52,
    gap: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#181725",
    fontWeight: "500",
  },
  clearText: {
    color: "#B3B3B3",
    fontSize: 18,
    fontWeight: "700",
  },
  filterButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
     resizeMode: "contain",
  },
  filterIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  content: {
    paddingBottom: 120,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  card: {
    width: "48%",
    minHeight: 240,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    padding: 14,
  },
  productImage: {
    width: "100%",
    height: 92,
    borderRadius: 16,
    resizeMode: "contain",
  },
  cardTitle: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 22,
    color: "#181725",
    fontWeight: "600",
  },
  cardMeta: {
    marginTop: 4,
    marginBottom: 18,
    fontSize: 12,
    color: "#7C7C7C",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  cardPrice: {
    fontSize: 16,
    color: "#181725",
    fontWeight: "700",
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#53B175",
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    tintColor: "#FFFFFF",
  },
  emptyText: {
    marginTop: 32,
    textAlign: "center",
    fontSize: 14,
    color: "#7C7C7C",
    fontWeight: "500",
  },
});
