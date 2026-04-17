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
import {
  bestSellingProducts,
  featuredProducts,
  groceryHighlights,
  groceryProducts,
} from "../config/catalog";
import { homeImages } from "../config/imageSources";

function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.productCard} activeOpacity={0.9} onPress={onPress}>
      <Image source={homeImages.products[item.id]} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productMeta}>{item.subtitle}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionLink}>See all</Text>
    </View>
  );
}

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.topBrand}>
            <Image source={homeImages.carrotIcon} style={styles.carrotIcon} />
            <View style={styles.locationRow}>
              <Image source={homeImages.locationIcon} style={styles.locationIcon} />
              <Text style={styles.locationText}>Dhaka, Banassre</Text>
            </View>
          </View>

          <View style={styles.searchBar}>
            <Image source={homeImages.searchIcon} style={styles.searchIcon} />
            <Text style={styles.searchText}>Search Store</Text>
          </View>

          <View style={styles.banner}>
            <Image source={homeImages.bannerImage} style={styles.bannerImage} />
          </View>

          <SectionHeader title="Exclusive Offer" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productRow}
          >
            {featuredProducts.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onPress={() => {
                  if (item.id === "apple") {
                    navigation.navigate("ProductDetail");
                  }
                }}
              />
            ))}
          </ScrollView>

          <SectionHeader title="Best Selling" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productRow}
          >
            {bestSellingProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ScrollView>

          <SectionHeader title="Groceries" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.highlightRow}
          >
            {groceryHighlights.map((item) => (
              <View key={item.id} style={[styles.highlightCard, { backgroundColor: item.tint }]}>
                <Image source={homeImages.categories[item.id]} style={styles.highlightImage} />
                <Text style={styles.highlightText}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productRow}
          >
            {groceryProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </ScrollView>

        <BottomMenu navigation={navigation} active="Home" />
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
    paddingTop: 12,
    paddingBottom: 120,
  },
  topBrand: {
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  carrotIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    
  },
  locationIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  locationText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#181725",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F2F3F2",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
  },
  searchText: {
    fontSize: 14,
    color: "#7C7C7C",
    fontWeight: "500",
  },
  searchIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  banner: {
    borderRadius: 18,
    marginBottom: 24,
  },
  bannerImage: {
    width: "100%",
    height: 116,
    borderRadius: 18,
    resizeMode: "cover",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: "650",
    color: "#181725",
  },
  sectionLink: {
    fontSize: 16,
    color: "#53B175",
    fontWeight: "500",
  },
  productRow: {
    flexDirection: "row",
    marginBottom: 26,
    paddingRight: 24,
    gap: 12,
  },
  productCard: {
    width: 173,
    minHeight: 248,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 18,
    padding: 14,
  },
  productImage: {
    width: "100%",
    height: 92,
    resizeMode: "contain",
  },
  productTitle: {
    fontSize: 15,
    color: "#181725",
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 4,
  },
  productMeta: {
    color: "#7C7C7C",
    fontSize: 12,
    marginBottom: 18,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  price: {
    fontSize: 15,
    color: "#181725",
    fontWeight: "700",
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#53B175",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginTop: -2,
    resizeMode: "contain",
  },
  highlightRow: {
    flexDirection: "row",
    marginBottom: 24,
    paddingRight: 24,
    gap: 12,
  },
  highlightCard: {
    width: 248,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  highlightText: {
    flex: 1,
    fontSize: 18,
    color: "#181725",
    fontWeight: "700",
  },
  highlightImage: {
    width: 62,
    height: 62,
    borderRadius: 18,
    resizeMode: "contain",
   
  },
});
