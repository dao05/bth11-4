import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { menuImages } from "../config/imageSources";

const items = [
  { key: "Home", label: "Shop", icon: menuImages.shop },
  { key: "Explore", label: "Explore", icon: menuImages.explore },
  { key: "Cart", label: "Cart", icon: menuImages.cart },
  { key: "Favourite", label: "Favourite", icon: menuImages.favourite },
  { key: "Account", label: "Account", icon: menuImages.account },
];

export default function BottomMenu({ navigation, active }) {
  return (
    <View style={styles.wrapper}>
      {items.map((item) => {
        const isActive = item.key === active;

        return (
          <TouchableOpacity
            key={item.key}
            style={styles.item}
            activeOpacity={0.85}
            onPress={() => {
              if (item.key === "Home") {
                navigation.navigate("Home");
              }
              if (item.key === "Explore") {
                navigation.navigate("Explore");
              }
            }}
          >
            <Image source={item.icon} style={[styles.icon, isActive && styles.activeIcon]} />
            <Text style={[styles.label, isActive && styles.active]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingTop: 14,
    paddingBottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
  },
  item: {
    alignItems: "center",
    gap: 4,
    minWidth: 54,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    tintColor: "#4C4F5E",
  },
  label: {
    fontSize: 11,
    color: "#4C4F5E",
    fontWeight: "600",
  },
  active: {
    color: "#53B175",
  },
  activeIcon: {
    tintColor: "#53B175",
  },
});
