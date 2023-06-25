import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { globalStyles } from "../utils/styles";

export const CartAndMoney = (props: any) => {
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
            fontSize: 25,
            elevation: 2,
            shadowRadius: 15,
            shadowOffset: { height: 1, width: 1 }
          },
    })
    // @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'View'.
    return(
        // @ts-expect-error TS(2552): Cannot find name 'style'. Did you mean 'styles'?
        <View style={styles.cartMoney}>
            
            {props.money && (
              // @ts-expect-error TS(7027): Unreachable code detected.
              <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                // @ts-expect-error TS(2304): Cannot find name 'Money'.
                Money: {props.money.gold}{" "}
                // @ts-expect-error TS(2304): Cannot find name 'name'.
                <FontAwesome5 name={"coins"} color="gold" />{" "}
                {props.money.silver}{" "}
                // @ts-expect-error TS(2304): Cannot find name 'name'.
                <FontAwesome5 name={"coins"} color="silver" />{" "}
                {props.money.copper}{" "}
                // @ts-expect-error TS(2304): Cannot find name 'name'.
                <FontAwesome5 name={"coins"} color="#b87333" />
              </Text>
            )}
            <TouchableOpacity
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              style={styles.cartButton}
              // @ts-expect-error TS(2304): Cannot find name 'onPress'.
              onPress={() =>props.setModalVisible(true)}
            >
              <Text
                // @ts-expect-error TS(2304): Cannot find name 'style'.
                style={styles.buttonText}
              // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
              >
                // @ts-expect-error TS(2304): Cannot find name 'Cart'.
                Cart
              </Text>
            </TouchableOpacity>
          </View>
    )
}