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
import { cartImages } from "../config/imageSources";
import { formatPrice } from "../data";
import { useStore } from "../context/StoreContext";

function CartRow({ item, onDecrease, onIncrease, onRemove }) {
  return (
    <View style={styles.cartRow}>
      <Image source={item.image} style={styles.productImage} />

      <View style={styles.details}>
        <View style={styles.nameRow}>
          <View style={styles.flexOne}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.subtitle}</Text>
          </View>
          <TouchableOpacity onPress={() => onRemove(item.id)}>
            <Image source={cartImages.removeIcon} style={styles.removeIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.rowFooter}>
          <View style={styles.quantityRow}>
            <TouchableOpacity style={styles.adjustButton} onPress={() => onDecrease(item)}>
              <Text style={styles.adjustText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.adjustButton} onPress={() => onIncrease(item.id)}>
              <Text style={[styles.adjustText, styles.adjustTextPlus]}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>{formatPrice(item.price * item.quantity)}</Text>
        </View>
      </View>
    </View>
  );
}

export default function Cart({ navigation }) {
  const { cartProducts, cartTotal, addToCart, removeFromCart, updateCartQuantity } = useStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>My Cart</Text>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {cartProducts.map((item) => (
            <CartRow
              key={item.id}
              item={item}
              onIncrease={addToCart}
              onDecrease={(product) => updateCartQuantity(product.id, product.quantity - 1)}
              onRemove={removeFromCart}
            />
          ))}

          {cartProducts.length === 0 ? (
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          ) : null}
        </ScrollView>

        <TouchableOpacity style={styles.checkoutButton} disabled={cartProducts.length === 0}>
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.totalBadge}>
            <Text style={styles.totalText}>{formatPrice(cartTotal)}</Text>
          </View>
        </TouchableOpacity>

        <BottomMenu navigation={navigation} active="Cart" />
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
    paddingTop: 12,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    color: "#181725",
    fontWeight: "700",
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 180,
  },
  cartRow: {
    flexDirection: "row",
    gap: 18,
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  productImage: {
    width: 72,
    height: 72,
    resizeMode: "contain",
   
  },
  details: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  flexOne: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    color: "#181725",
    fontWeight: "700",
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: "#7C7C7C",
  },
  removeIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    tintColor: "#B3B3B3",
  },
  rowFooter: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  adjustButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  adjustText: {
    fontSize: 26,
    color: "#B3B3B3",
    marginTop: -2,
  },
  adjustTextPlus: {
    color: "#53B175",
  },
  quantityText: {
    fontSize: 18,
    color: "#181725",
    fontWeight: "600",
    minWidth: 12,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "#181725",
    fontWeight: "700",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 48,
    fontSize: 15,
    color: "#7C7C7C",
    fontWeight: "500",
  },
  checkoutButton: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 92,
    backgroundColor: "#53B175",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    flexDirection: "row",
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  totalBadge: {
    position: "absolute",
    right: 18,
    backgroundColor: "rgba(24, 23, 37, 0.18)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  totalText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});
