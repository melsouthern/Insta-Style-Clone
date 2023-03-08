import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Header from "../components/home/Header.js";
import Stories from "../components/home/Stories.js";
import Post from "../components/home/Post.js";
import BottomTabs from "../components/home/BottomTabs.js";
import { collectionGroup, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase.js";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();

  const fetchPosts = async () => {
    const queryPosts = query(
      collectionGroup(db, "posts"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(queryPosts);

    querySnapshot.forEach((doc) => {
      setPosts((originalPosts) => {
        const originalPostsCopy = [...originalPosts];
        originalPostsCopy.push(doc.data());
        return originalPostsCopy;
      });
    });
  };

  useEffect(() => {
    isFocused ? setPosts([]) : null;
    fetchPosts();
  }, [isFocused]);

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
