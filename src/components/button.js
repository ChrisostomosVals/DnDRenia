
import {
    StyleSheet,
    TouchableOpacity,
    Text
  } from "react-native";
import { globalStyles } from "../utils/styles";

export const Button = ({text, opacity, disabled, onPress}) =>{


    return (
        <TouchableOpacity
        style={{...styles.button,  opacity: opacity}}
        disabled={disabled}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>
          {text}
        </Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
      borderRadius: 5,
      fontSize: 30,
      textAlign: "center",
      backgroundColor: "rgba(16,36,69,0.95)",
      ...globalStyles.textStyle,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      ...globalStyles.textStyle,
      fontSize: 30,
    },
    button: {
      ...globalStyles.button,
      marginTop: "5%",
    },
  });