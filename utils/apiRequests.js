import { useQuery } from "react-query";
import { userProfileImages } from "../data/userData";
import { auth, db, storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, Timestamp, addDoc, collection } from "firebase/firestore";
import { Alert } from "react-native";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const getUsers = () => {
  return useQuery("userStoryData", async () => {
    try {
      let response = await fetch("https://dummyjson.com/users");
      let json = await response.json();
      let dataNeeded = json.users
        .slice(0, 5)
        .map(({ username, id }, index) => ({
          username,
          id,
          // Update each image to look like real people for instagram feel
          image: userProfileImages[index].user,
        }));

      return dataNeeded;
    } catch {
      (error) => error;
    }
  });
};

export const getRandomProfilePicture = async () => {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();
  return data.results[0].picture.large;
};

export const onSignUp = async (email, username, password) => {
  try {
    const authUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docRef = doc(db, "users", authUser.user.email);
    const data = {
      owner_uid: authUser.user.uid,
      username: username,
      email: authUser.user.email,
      profile_picture: await getRandomProfilePicture(),
    };

    setDoc(docRef, data);
  } catch (error) {
    Alert.alert("Oops!", "There was a problem signing you up.", [
      {
        text: "Ok",
        style: "cancel",
      },
    ]);
  }
};

export const onLogin = async (email, password, navigation) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    Alert.alert(
      "Oops!",
      "Email or password is invalid. \n Do you need to sign up?",
      [
        {
          text: "Go back",
          style: "cancel",
        },
        { text: "Sign up", onPress: () => navigation.push("SignUpScreen") },
      ]
    );
  }
};

const uploadImageToFirebase = async (image) => {
  try {
    const response = await fetch(image);
    const blob = await response.blob();

    const storageRef = ref(storage, `/${Date.now()}`);

    const update = await uploadBytesResumable(storageRef, blob);
    const url = await getDownloadURL(update.ref);
    return url;
  } catch (error) {
    return "not found";
  }
};

export const uploadPostToFirebase = async (
  caption,
  currentUser,
  navigation,
  image
) => {
  const url = await uploadImageToFirebase(image);

  const data = {
    imageUrl: url,
    username: currentUser.username,
    profilePic: currentUser.profile_picture,
    ownerUid: currentUser.owner_uid,
    caption: caption,
    createdAt: Timestamp.fromDate(new Date()),
    likesByUsers: [],
    comments: [],
    email: currentUser.email,
  };

  const docref = doc(collection(db, "users"), currentUser.email);
  const colref = collection(docref, "posts");
  await addDoc(colref, data);

  navigation.goBack();
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    Alert.alert("Oops!", "There was a problem signing out", [
      {
        text: "Ok",
        style: "cancel",
      },
    ]);
  }
};
