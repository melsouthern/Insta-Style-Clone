import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Octicons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { userProfileImages } from "../../data/userData";

const BottomTabs = () => {
  const [activeTabs, setActiveTabs] = useState("Home");

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setActiveTabs("Home")}>
          {activeTabs === "Home" ? (
            <Octicons name="home" size={30} color="white" />
          ) : (
            <Octicons name="home" size={30} color="#A9A9A9" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTabs("Search")}>
          {activeTabs === "Search" ? (
            <Ionicons name="search-sharp" size={32} color="white" />
          ) : (
            <Ionicons name="search-sharp" size={32} color="#A9A9A9" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTabs("Reels")}>
          {activeTabs === "Reels" ? (
            <MaterialCommunityIcons
              name="movie-play-outline"
              size={32}
              color="white"
            />
          ) : (
            <MaterialCommunityIcons
              name="movie-play-outline"
              size={32}
              color="#A9A9A9"
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTabs("Shop")}>
          {activeTabs === "Shop" ? (
            <MaterialCommunityIcons
              name="shopping-outline"
              size={32}
              color="white"
            />
          ) : (
            <MaterialCommunityIcons
              name="shopping-outline"
              size={32}
              color="#A9A9A9"
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTabs("Profile")}>
          {activeTabs === "Profile" ? (
            <Image
              source={{ uri: userProfileImages[0].user }}
              style={styles.profilePicActive}
            />
          ) : (
            <Image
              source={{ uri: userProfileImages[0].user }}
              style={styles.profilePicInactive}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: "3%",
    zIndex: 999,
    backgroundColor: "#000",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    paddingTop: 15,
  },

  profilePicInactive: {
    height: 30,
    width: 30,
    backgroundColor: "white",
    borderRadius: 50,
  },

  profilePicActive: {
    height: 30,
    width: 30,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
  },
});

export default BottomTabs;
