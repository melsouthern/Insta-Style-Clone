import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { getUsers } from "../../utils/apiRequests";

const Stories = () => {
  const { data } = getUsers();

  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data &&
          data.map((user, index) => {
            return (
              <View key={index} style={{ alignItems: "center" }}>
                <Image source={{ uri: user.image }} style={styles.story} />
                <Text style={{ color: "white" }}>
                  {user.username.length > 8
                    ? `${user.username.slice(0, 8).toLowerCase()}...`
                    : user.username.toLowerCase()}
                </Text>
              </View>
            );
          })}
        <Image />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 3,
    borderColor: "#FF8501",
  },
});

export default Stories;
