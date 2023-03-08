import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import {
  doc,
  getDocs,
  getDoc,
  collection,
  query,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const Post = ({ post }) => {
  const [currentUser, setCurrentUser] = useState();
  const [updatedLikes, setUpdatedLikes] = useState(post.likesByUsers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        setCurrentUser(userData);
      }
    });
    setLoading(false);
  }, []);

  const handleLike = async () => {
    const updateItemRef = query(collection(db, "users", post.email, "posts"));
    const itemSnapshot = await getDocs(updateItemRef);

    itemSnapshot.forEach((doc) => {
      const docData = doc.data();

      if (docData.imageUrl === post.imageUrl) {
        docData.likesByUsers.includes(currentUser.email)
          ? (updateDoc(doc.ref, {
              likesByUsers: arrayRemove(currentUser.email),
            }),
            setUpdatedLikes(() => {
              return docData.likesByUsers.filter(
                (user) => user !== currentUser.email
              );
            }))
          : (updateDoc(doc.ref, {
              likesByUsers: arrayUnion(currentUser.email),
            }),
            setUpdatedLikes(() => {
              const likesArray = [];
              docData.likesByUsers.map((user) => likesArray.push(user)),
                likesArray.push(currentUser.email);
              return likesArray;
            }));
      }
    });
  };

  if (loading) {
    return <></>;
  } else {
    return (
      <View style={{ marginBottom: 30 }}>
        <Divider width={1} orientation="vertical" />
        <PostHeader post={post} />
        <PostImage post={post} />
        {currentUser && (
          <PostFooter
            handleLike={handleLike}
            updatedLikes={updatedLikes}
            currentUser={currentUser}
          />
        )}
        <Likes updatedLikes={updatedLikes} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    );
  }
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
          {post.username}
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

const PostFooter = ({ handleLike, updatedLikes, currentUser }) => {
  return (
    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={handleLike}
          style={{ marginLeft: 15, marginTop: 10 }}
        >
          {updatedLikes.includes(currentUser.email) ? (
            <FontAwesome name="heart" size={24} color="#FF3250" />
          ) : (
            <Feather name="heart" size={24} color={"white"} />
          )}
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

const Likes = ({ updatedLikes }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 4, marginLeft: 12 }}>
      <Text style={{ color: "white", fontWeight: "600" }}>
        {updatedLikes.length} likes
      </Text>
    </View>
  );
};

const Caption = ({ post }) => {
  return (
    <View style={{ marginTop: 5, marginLeft: 12 }}>
      <Text style={{ color: "white" }}>
        <Text style={{ fontWeight: "600" }}>{post.username} </Text>
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
      {post.comments.map((comment) => {
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
