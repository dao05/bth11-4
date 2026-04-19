import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { productDetailImages } from "../config/imageSources";
import { formatPrice, getProductById } from "../data";
import { useStore } from "../context/StoreContext";

export default function ProductDetail({ navigation }) {
  const insets = useSafeAreaInsets();
  const product = useMemo(() => getProductById("apple"), []);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, favouriteIds, toggleFavourite } = useStore();
  const isFavourite = favouriteIds.includes(product.id);

  const handleAddToBasket = () => {
    for (let index = 0; index < quantity; index += 1) {
      addToCart(product.id);
    }

    navigation.navigate("Cart");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { paddingTop: insets.top + 14 }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={productDetailImages.backIcon} style={styles.headerIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={productDetailImages.uploadIcon} style={styles.headerIcon} />
            </TouchableOpacity>
          </View>

          <Image source={productDetailImages.productImage} style={styles.productImage} />

          <View style={styles.sliderDots}>
            <View style={[styles.sliderDot, styles.sliderDotActive]} />
            <View style={styles.sliderDot} />
            <View style={styles.sliderDot} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.nameRow}>
            <View style={styles.flexOne}>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.meta}>{product.subtitle}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavourite(product.id)}>
              <Image
                source={productDetailImages.favouriteIcon}
                style={[styles.favorite, isFavourite && styles.favoriteActive]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.quantityRow}>
            <TouchableOpacity onPress={() => setQuantity((current) => Math.max(1, current - 1))}>
              <Text style={styles.adjust}>-</Text>
            </TouchableOpacity>
            <View style={styles.quantityBox}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => setQuantity((current) => current + 1)}>
              <Text style={[styles.adjust, styles.plus]}>+</Text>
            </TouchableOpacity>
            <Text style={styles.detailPrice}>{formatPrice(product.price * quantity)}</Text>
          </View>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.expandRow}>
            <View style={styles.flexOne}>
              <Text style={styles.sectionTitle}>Product Detail</Text>
              <Text style={styles.description}>
                Apples are nutritious. Apples may be good for weight loss, may be good for your heart, and are part of a healthy and varied diet.
              </Text>
            </View>
            <Image source={productDetailImages.collapseIcon} style={styles.arrowIcon} />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nutritions</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>100gr</Text>
            </View>
            <Image source={productDetailImages.arrowRightIcon} style={styles.arrowIcon} />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.infoRow}>
            <Text style={styles.infoLabel}>Review</Text>
            <Text style={styles.rating}>*****</Text>
            <Image source={productDetailImages.arrowRightIcon} style={styles.arrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.basketButton} onPress={handleAddToBasket}>
            <Text style={styles.basketText}>Add To Basket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    paddingBottom: 24,
  },
  hero: {
    backgroundColor: "#F2F3F2",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  productImage: {
    width: "100%",
    height: 240,
    resizeMode: "contain",
  },
  sliderDots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
  },
  sliderDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D9D9D9",
  },
  sliderDotActive: {
    width: 18,
    backgroundColor: "#53B175",
  },
  content: {
    paddingHorizontal: 24,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  flexOne: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#181725",
    marginBottom: 4,
  },
  meta: {
    fontSize: 15,
    color: "#7C7C7C",
  },
  favorite: {
    width: 21,
    height: 21,
    resizeMode: "contain",
  },
  favoriteActive: {
    tintColor: "#53B175",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
    gap: 16,
  },
  adjust: {
    fontSize: 25,
    color: "#B3B3B3",
    fontWeight: "500",
  },
  plus: {
    color: "#53B175",
  },
  quantityBox: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    color: "#181725",
    fontWeight: "600",
  },
  detailPrice: {
    marginLeft: "auto",
    fontSize: 25,
    color: "#181725",
    fontWeight: "700",
  },
  separator: {
    height: 1,
    backgroundColor: "#E2E2E2",
  },
  expandRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#181725",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#7C7C7C",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 18,
  },
  infoLabel: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#181725",
  },
  badge: {
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#7C7C7C",
    fontSize: 10,
    fontWeight: "600",
  },
  arrowIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  rating: {
    color: "#F3603F",
    letterSpacing: 2,
    fontSize: 16,
  },
  basketButton: {
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: "#53B175",
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 20,
  },
  basketText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "650",
  },
});
