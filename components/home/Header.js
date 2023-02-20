import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Octicons, Feather } from "@expo/vector-icons";

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("../../assets/insta-logo-white.png")}
        />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.push("NewPostScreen")}
        >
          <Octicons name="diff-added" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Feather name="heart" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Feather name="message-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },

  logo: {
    width: 115,
    height: 50,
    resizeMode: "contain",
  },

  iconsContainer: { flexDirection: "row" },

  icon: { marginLeft: 15 },

  unreadBadge: {
    backgroundColor: "#FF3250",
    position: "absolute",
    left: 10,
    bottom: 15,
    width: 24,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },

  unreadBadgeText: { color: "white" },
});

export default Header;
