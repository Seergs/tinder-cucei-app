import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as NativeImagePicker from "expo-image-picker";
import * as mime from "react-native-mime-types";
import Toast from "react-native-toast-message";
import { uploadImageToCloudinary } from "../../api/Upload/uploadImage";
import theme from "../styles/theme";
const { colors } = theme;

interface ImagePickerProps {
  position: "center" | "flex-end" | "flex-start";
  index?: number;
  name: string;
  value: string;
  onChange: any;
}

export default function ImagePicker({
  position,
  index,
  name,
  value,
  onChange,
}: ImagePickerProps) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await NativeImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== NativeImagePicker.PermissionStatus.GRANTED) {
          alert("Se necesitan permisos para acceder a la galería");
        }
      }
    })();
  }, []);
  const handlePickImage = async () => {
    const result = await NativeImagePicker.launchImageLibraryAsync({
      mediaTypes: NativeImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const image = {
        name: `picture-${Date.now()}`,
        type: mime.lookup(result.uri) || result.type,
        uri: result.uri,
      };
      const imageUrl = await uploadImageToCloudinary(image);

      if (imageUrl) {
        if (name === "secondaryImageUrls") {
          onChange(index, imageUrl);
        }
        onChange(name, imageUrl);
      } else
        Toast.show({
          type: "error",
          text1: "Algo salió mal, intenta de nuevo más tarde",
        });
    }
  };

  if (!value)
    return (
      <View style={[styles.container, { alignSelf: position }]}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={handlePickImage}
          activeOpacity={0.8}
        >
          <AntDesign name="camera" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );

  return (
    <View style={styles.container}>
      <Image source={{ uri: value }} style={styles.image} />
      <TouchableOpacity
        style={styles.selectButton}
        onPress={handlePickImage}
        activeOpacity={0.8}
      >
        <AntDesign name="camera" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.textLightGray,
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  selectButton: {
    position: "absolute",
    right: -5,
    bottom: -5,
    backgroundColor: colors.textDarkGray,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
});
