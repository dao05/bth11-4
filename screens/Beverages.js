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
import { beveragesImages } from "../config/imageSources";
import { beveragesProducts, formatPrice } from "../data";
import { useStore } from "../context/StoreContext";

function BeverageCard({ item, onAdd }) {
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

export default function Beverages({ navigation }) {
  const { addToCart } = useStore();

  const handleAddToCart = (productId) => {
    addToCart(productId);
    navigation.navigate("Cart");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={beveragesImages.backIcon} style={styles.headerImageIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Beverages</Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate("Filter")}
          >
            <Image source={beveragesImages.filterIcon} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.grid}>
            {beveragesProducts.map((item) => (
              <BeverageCard key={item.id} item={item} onAdd={handleAddToCart} />
            ))}
          </View>
        </ScrollView>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },  
  headerImageIcon: {
    width: 19,
    height: 19,
    resizeMode: "contain",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "#181725",
    fontWeight: "700",
  },
  filterButton: {
    width: 30,
    alignItems: "flex-end",
  },
  filterIcon: {
    width: 19,
    height: 19,
    resizeMode: "contain",
  },
  content: {
    paddingBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  card: {
    width: "48%",
    minHeight: 250,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    padding: 14,
  },
  productImage: {
    width: "100%",
    height: 94,
    borderRadius: 20,
    resizeMode: "contain",
  },
  cardTitle: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 23,
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
    fontWeight: "bold",
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#53B175",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginTop: -2,
  },
  addIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    tintColor: "#FFFFFF",
  },
});
