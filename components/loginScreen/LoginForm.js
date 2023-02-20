import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import { object, string } from "yup";
import { Validator } from "email-validator";

const LoginForm = () => {
  const loginFormSchema = object({
    email: string().email().required("An email is required"),
    password: string()
      .required()
      .min(8, "Your password must have at least 8 characters"),
  });

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={loginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <TextInput
              placeholderTextColor="#444"
              placeholder="Phone number, username or email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={styles.inputField}
            />

            <TextInput
              placeholderTextColor="#444"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={styles.inputField}
            />
            <View>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </View>
            <Pressable
              titleSize={20}
              style={styles.logInButton(isValid)}
              onPress={handleSubmit}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>
                Log in
              </Text>
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 50,
              }}
            >
              <Text style={{ fontWeight: "600" }}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={{ color: "#6BB0F5", fontWeight: "600" }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 70,
  },

  inputField: {
    height: 40,
    borderWidth: 1,
    borderColor: "#BBBBBB",
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: "#FAFAFA",
  },

  forgotPassword: {
    fontSize: 14,
    textAlign: "right",
    marginRight: 10,
    marginBottom: 30,
    color: "#6BB0F5",
    fontWeight: "600",
  },

  logInButton: (isValid) => ({
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
    backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
  }),
});

export default LoginForm;
