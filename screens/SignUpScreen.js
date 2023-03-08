import React from "react";
import { SafeAreaView } from "react-native";
import { View, StyleSheet, Image } from "react-native";
import SignUpForm from "../components/signUpScreen/SignUpForm";

const SignUpScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/insta-icon.png")}
            style={{ height: 140, width: 140 }}
          />
        </View>
        <SignUpForm navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoContainer: { alignItems: "center", marginTop: 60 },
});

export default SignUpScreen;
