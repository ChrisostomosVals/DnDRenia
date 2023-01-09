import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { globalStyles } from "../utils/styles";

export const CartAndMoney = (props) =>{
    const styles = StyleSheet.create({
        cartMoney: {
            flexDirection: "row",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: "rgba(16,36,69,0.95)",
            borderRadius: 15,
            marginBottom: 10,
            marginTop: 10,
          },
          cartButton: {
            ...globalStyles.card,
            backgroundColor: "#DAA520",
            width: "25%",
            alignItems: "center",
          }, 
          buttonText: {
            ...globalStyles.textStyle,
            fontSize: 35,
          },
    })
    return(
        <View style={styles.cartMoney}>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() =>props.setModalVisible(true)}
            >
              <Text
                style={styles.buttonText}
              >
                Cart
              </Text>
            </TouchableOpacity>
            {props.money && (
              <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                Money: {props.money.gold.quantity}{" "}
                <FontAwesome5 name={"coins"} color="gold" />{" "}
                {props.money.silver.quantity}{" "}
                <FontAwesome5 name={"coins"} color="silver" />{" "}
                {props.money.copper.quantity}{" "}
                <FontAwesome5 name={"coins"} color="#b87333" />
              </Text>
            )}
          </View>
    )
}