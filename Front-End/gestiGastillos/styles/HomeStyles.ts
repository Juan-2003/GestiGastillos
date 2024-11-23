import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 60,
  },
  buttonContainer: {
    backgroundColor: "#0078FF",
    height: 50,
    width: "60%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    // Sombras en iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombras en Android
    elevation: 5,
    marginVertical: 40,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#005AC0",
  },
  text: {
    color: "white",
    fontWeight: "semibold",
    fontSize: 24,
    textAlign: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});

export default homeStyles;