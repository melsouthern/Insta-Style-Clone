import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import { Feather, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <PostFooter />
      <Likes post={post} />
      <Caption post={post} />
      <CommentsSection post={post} />
      <Comments post={post} />
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: post.profilePic }} style={styles.story} />
        <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
          {post.user}
        </Text>
      </View>
      <View>
        <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
      </View>
    </View>
  );
};

const PostImage = ({ post }) => {
  return (
    <View style={{ width: "100%", height: 400 }}>
      <Image
        source={{ uri: post.imageUrl }}
        style={{ height: "100%", resizeMode: "cover" }}
      />
    </View>
  );
};

const PostFooter = ({ post }) => {
  return (
    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ marginLeft: 15, marginTop: 10 }}>
          <Feather name="heart" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 15, marginTop: 10 }}>
          <Feather name="message-circle" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 15, marginTop: 10 }}>
          <Ionicons name="md-paper-plane-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={{ marginRight: 15, marginTop: 10 }}>
          <Feather name="bookmark" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Likes = ({ post }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 4, marginLeft: 12 }}>
      <Text style={{ color: "white", fontWeight: "600" }}>
        {post.likes.toLocaleString("en")} likes
      </Text>
    </View>
  );
};

const Caption = ({ post }) => {
  return (
    <View style={{ marginTop: 5, marginLeft: 12 }}>
      <Text style={{ color: "white" }}>
        <Text style={{ fontWeight: "600" }}>{post.user} </Text>
        <Text>{post.caption}</Text>
      </Text>
    </View>
  );
};

const CommentsSection = ({ post }) => {
  return (
    <View style={{ marginTop: 5, marginLeft: 12 }}>
      {post.comments.length > 0 && (
        <Text style={{ color: "gray" }}>
          {post.comments.length > 1
            ? `View all ${post.comments.length} comments`
            : `View 1 comment`}
        </Text>
      )}
    </View>
  );
};

const Comments = ({ post }) => {
  return (
    <>
      {post.comments.map((comment, index) => {
        return (
          <View style={{ marginTop: 5, marginLeft: 12 }}>
            <Text style={{ color: "white" }}>
              <Text style={{ fontWeight: "600" }}>{comment.user}</Text>{" "}
              {comment.comment}
            </Text>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#FF8501",
  },
});

export default Post;
