import React, { useEffect, useState } from "react";
import { Pressable, Alert, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Componente para seleccionar imagenes
const ImagePickerComponent = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Cargar la URI de la imagen almacenada cuando el componente se monta
  useEffect(() => {
    const loadImage = async () => {
      const storedImageUri = await AsyncStorage.getItem("imageUri");
      if (storedImageUri) {
        setImageUri(storedImageUri);
      }
    };

    loadImage();
  }, []);

  // Selecciona la imagen
  const selectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("¡Necesitas permisos para acceder a la galería!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      setImageUri(newImageUri);
      // Almacenar la nueva URI de la imagen en AsyncStorage
      await AsyncStorage.setItem("imageUri", newImageUri);
    }
  };

  return (
    <View style={styles.imageContainer}>
      <Pressable onPress={selectImage}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require("@/assets/images/iconUser.png")
          } // Placeholder
          style={styles.image}
        />
      </Pressable>
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
    //backgroundColor: 'green'
  },
  imageContainer: {
    borderWidth: 3,
    borderRadius: 200,
    borderColor: "#BF1515"
    //backgroundColor: "red",
  },
});
