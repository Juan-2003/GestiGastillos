import { StyleSheet } from "react-native";

const cardStyles = StyleSheet.create({
    middleContainer: {
      flex: 3,
    },
    bottomContainer: {
      alignItems: 'center',
      marginVertical: 50,
    },
    cardContainer: {
      padding: 3,
      backgroundColor: "#27C1F9",
      borderRadius: 10,
      marginVertical: 8,
      marginHorizontal: 10,
      elevation: 5,
      borderWidth: 1,
      borderColor: "#1E91BB"
    },
    topCard: {
      flex: 1,
      flexDirection: "row",
      marginVertical: 5,
      marginHorizontal: 3,
    },
    middleCard: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 1,
    },
    bottomCard: {
      flex: 1,
      flexDirection: "row",
      marginVertical: 5,
      marginHorizontal: 3,
    },
    dataBottomCard: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    dateContainer: {
      flex: 0.8,
      justifyContent: "center",
      paddingLeft: 10,
    },
    numberContainer: {
      flex: 0.5,
      alignItems: "center",
    },
    nameContainer: {
      flex: 0.5,
      alignItems: "center",
    },
    typeContainer: {
      flex: 0.3,
      alignItems: "center",
    },
    iconsContainer: {
      flex: 0.3,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: "row",
    },
    text: {
      fontSize: 16,
      color: "#FFFFFF",
      textAlign: 'center',
      padding: 2,
    },
    emptyMessage: {
      fontSize: 20,
      color: "red",
      textAlign: 'center',
      marginVertical: 100,
    },
    dateText: {
      fontSize: 16,
      color: "#FFFFFF",
    },
    textNumber: {
      fontSize: 18,
      color: "#FFFFFF",
      padding: 2,
    },
    digits: {
      fontSize: 30,
      color: "#FFFFFF",
      padding: 10,
    },
    image: {
      height: 38,
      width: 38,
      resizeMode: 'contain',
    },
  });

  export default cardStyles;