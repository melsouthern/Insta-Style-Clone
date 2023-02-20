import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { mixed, object, string } from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

const uploadPostSchema = object({
  imageSource: mixed().required(),
  caption: string().max(2200, "Caption has reached the character limit."),
});

const PostUploader = ({ navigation }) => {
  const [image, setImage] = useState("");
  const placeholderImage =
    "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image-300x225.png";

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      return result.assets[0].uri;
    }
  };

  return (
    <Formik
      initialValues={{ caption: "", image: "" }}
      onSubmit={(values) => {
        console.log(values);
        navigation.goBack();
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
        setFieldValue,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              value={values.imageSource}
              source={{
                uri: image ? image : placeholderImage,
              }}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                style={{ color: "white", fontSize: 20 }}
                placeholder="Write a caption..."
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          <View>
            <TouchableOpacity
              onPress={() => {
                const newImage = pickImage();
                setFieldValue("imageSource", newImage, true);
              }}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: 42,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 17 }}>
                Upload from camera roll
              </Text>
              <Feather name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Divider width={0.2} orientation="vertical" marginTop={2} />
          {errors.caption && (
            <Text style={{ fontSize: 10, color: "red" }}>{errors.caption}</Text>
          )}
          <Button
            onPress={handleSubmit}
            title="Share"
            disabled={!isValid && !image}
          />
        </>
      )}
    </Formik>
  );
};

export default PostUploader;
