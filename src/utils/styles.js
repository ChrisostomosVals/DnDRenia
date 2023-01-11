import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 15,
    height: 45,
    border: "2px solid #1A1A1A",
    backgroundColor: "#6e40c9",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 0.3,
    backgroundColor: "rgb(220,220,220)",
    borderRadius: 5,
    margin: 10
  },
  card:{
    borderRadius: 15,
    backgroundColor: 'rgba(16,36,69,0.95)',
  },
  textStyle:{
    fontFamily: "BlackCastle",
    color: 'white'
  },
  button: {
    elevation: 2,
    borderRadius: 15,
    backgroundColor: 'rgba(16,36,69,0.95)',
    alignItems: "center",
    padding: "2%",
  },
});
