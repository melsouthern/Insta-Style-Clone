import React from "react";
import { SafeAreaView } from "react-native";
import { View, StyleSheet, Image } from "react-native";
import LoginForm from "../components/loginScreen/LoginForm";

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/insta-icon.png")}
            style={{ height: 140, width: 140 }}
          />
        </View>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  logoContainer: { alignItems: "center", marginTop: 60 },
});

export default LoginScreen;
