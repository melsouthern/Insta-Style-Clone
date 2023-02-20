import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Header from "../components/home/Header.js";
import Stories from "../components/home/Stories.js";
import Post from "../components/home/Post.js";
import { posts } from "../data/userData.js";
import BottomTabs from "../components/home/BottomTabs.js";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => {
          return <Post post={post} key={index} />;
        })}
      </ScrollView>
      <BottomTabs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});

export default HomeScreen;
