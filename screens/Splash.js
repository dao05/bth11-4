import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "../styles/globalStyles";

export default function Splash({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.splashContainer}
      onPress={() => navigation.navigate("Onboarding")}
      activeOpacity={1} // để không bị mờ khi bấm
    >
      <Image
        source={require("../assets/logosplash.png")}
        style={styles.logo}
      />

      
    </TouchableOpacity>
    
  );
}