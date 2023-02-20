import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PostUploader from "./PostUploader";

const AddNewPost = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <PostUploader navigation={navigation} />
    </View>
  );
};

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="ios-chevron-back-sharp" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerText}>New Post</Text>
      <Text />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    marginRight: 25,
  },
});

export default AddNewPost;
