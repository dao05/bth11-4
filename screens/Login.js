import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/globalStyles";
import { userInfo } from "../config/user";

export default function Login({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>

          {/* BACK */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("../assets/backicon.png")} style={styles.back} />
          </TouchableOpacity>

          {/* LOGO */}
          <Image
            source={require("../assets/carroticon.png")}
            style={styles.carrotSmall}
          />

          {/* TITLE */}
          <Text style={styles.loginTitle}>Log In</Text>
          <Text style={[styles.underTitle, { color: "#888888", fontSize:15, marginBottom: 30, }]}>
  Enter your emails and password
</Text>
          {/* EMAIL */}
          <Text style={styles.labelemail}>Email</Text>
          <TextInput
            style={styles.inputRow}
            placeholder="Enter your email"
          />

          {/* PASSWORD */}
          <Text style={styles.labelpassword}>Password</Text>

          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Image
                source={require("../assets/seepwicon.png")} // 👈 icon mắt của m
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* FORGOT */}
          <Text style={styles.forgot}>Forgot Password?</Text>

          {/* LOGIN BUTTON */}
          <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.replace("Home")}>   
            <Text style={styles.submitText}>Log In</Text>
          </TouchableOpacity>

          {/* SIGN UP */}
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.bottomText}>
              Don’t have an account?{" "}
              <Text style={{ color: "#53B175" }}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
          <Text style={styles.userText}>
                     {userInfo.name} - {userInfo.msv}
                   </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
