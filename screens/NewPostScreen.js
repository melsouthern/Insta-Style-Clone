import React from "react";
import { SafeAreaView } from "react-native";
import AddNewPost from "../components/newPosts/AddNewPost";

const NewPostScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
};

export default NewPostScreen;
