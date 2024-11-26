import { View, Image, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "expo-router";

interface Props {
  status: any;
}
export default function SavingPlansEmoji({ status }: Props) {
  console.log("status es: ", status);

  let imageUrl;
  if (status === "VERY_POOR") {
    imageUrl = require("@/assets/images/VERY_POORSAVING.png");
  } else if (status === "EXCELENT") {
    imageUrl = require("@/assets/images/EXCELENTSAVING.png");
  } else if (status === "GOOD") {
    imageUrl = require("@/assets/images/GOODSAVING.png");
  } else if (status === "POOR") {
    imageUrl = require("@/assets/images/POORSAVING.png");
  } else if (status === "AVERAGE") {
    imageUrl = require("@/assets/images/AVERAGESAVING.png");
  }

  return (
    <View style={styles.imageContainer}>
      <Image source={imageUrl} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 2,
    alignItems: "center",
  },

  image: {
    width: "65%",
    height: "100%",
    borderRadius: 200,
    resizeMode: "contain",
    //backgroundColor: 'green'
  },
});

function fetchGeneralStatus() {
  throw new Error("Function not implemented.");
}
