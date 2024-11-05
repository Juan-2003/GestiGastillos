// App/styles.ts
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  // Contenedores
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
  },
  middleContainer: {
    flex: 3,
  },
  textContainer: {
    width: '70%',
    justifyContent: 'flex-start',
  },
  inputTextContainer: {
    alignItems: "center",
    paddingTop: 30,
  },
  imageContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  // Estilos
  button: {
    backgroundColor: "#0078FF",
    alignItems: "center",
    width: "80%",
    padding: 6,
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#005AC0"
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
  iconImage: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  textInput: {
    borderBottomWidth: 1,
    fontSize: 12,
    width: '70%',
    borderBottomColor: "#000000",
    marginBottom: 40,
  },
  // Texto
  text: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 20,
  },
  textForm: {
    fontWeight: 'bold',
    color: 'black'
  },
});

export default globalStyles;
