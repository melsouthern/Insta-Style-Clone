import React from "react";
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
import * as EmailValidator from "email-validator";
import { onSignUp } from "../../utils/apiRequests";

const SignUpForm = ({ navigation }) => {
  const signUpFormSchema = object({
    email: string().email().required("An email is required"),
    username: string().required().min(2, "A username is required"),
    password: string()
      .required()
      .min(6, "Your password must have at least 6 characters"),
  });

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) =>
          onSignUp(values.email, values.username, values.password)
        }
        validationSchema={signUpFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <TextInput
              placeholderTextColor="#444"
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 ||
                    EmailValidator.validate(values.email)
                      ? "#BBBBBB"
                      : "red",
                },
              ]}
            />
            <TextInput
              placeholderTextColor="#444"
              placeholder="Username"
              autoCapitalize="none"
              textContentType="username"
              autoFocus={true}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.username.length > 0 && values.username.length < 2
                      ? "red"
                      : "#BBBBBB",
                },
              ]}
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
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.password.length > 0 && values.password.length < 6
                      ? "red"
                      : "#BBBBBB",
                },
              ]}
            />
            <View
              style={{
                marginRight: 10,
                marginBottom: 47,
              }}
            ></View>
            <Pressable
              titleSize={20}
              style={styles.signUpButton(isValid)}
              onPress={handleSubmit}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>
                Sign up
              </Text>
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 50,
              }}
            >
              <Text style={{ fontWeight: "600" }}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.goBack("LoginScreen")}
              >
                <Text style={{ color: "#6BB0F5", fontWeight: "600" }}>
                  Log in
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

  signUpButton: (isValid) => ({
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
    backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
  }),
});

export default SignUpForm;
