// App/styles.ts
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "#BA2828",
    alignItems: "center",
    width: "40%",
    padding: 10,
    borderRadius: 20,
  },
  text: {
    color: "white",
  },
  input: {
    borderColor: "gray",
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    width: "50%",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "stretch",
  },
  imageContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "red",
  },
  textInput: {
    borderBottomWidth: 1,
    width: '70%',
    borderBottomColor: "#A9BBBD",
    marginLeft: 60,
    marginRight: 60,
    marginBottom: 40,
  },
  textContainer: {
    width: '70%',
    justifyContent: 'flex-start' 
  },
  inputTextContainer: {
    alignItems: "center",
    //backgroundColor: "green",
  },
});

export default globalStyles;
