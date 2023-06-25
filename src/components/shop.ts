import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../utils/styles";

export const Shop = ({
  setRender
}: any) => {
  const styles = StyleSheet.create({
    welcomeStyle: {
      borderRadius: 5,
      fontSize: 30,
      textAlign: "center",
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
    },

    container: {
      flex: 10,
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "20%",
    },
    selection: {
      alignItems: "center",
      padding: 10,
    },
    itemCard: {
      margin: 10,
      width: "80%",
    },
    equipment: {
      flex: 1,
      justifyContent: "space-evenly",
      margin: 20,
      alignItems: "center",
    },
  });

  // @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'ScrollVi... Remove this comment to see the full error message
  return (
    // @ts-expect-error TS(2304): Cannot find name 'scrollEnable'.
    <ScrollView scrollEnable={true}>
      // @ts-expect-error TS(7027): Unreachable code detected.
      <View style={styles.container}>
        
        // @ts-expect-error TS(2304): Cannot find name 'style'.
        <View style={styles.equipment}>
          // @ts-expect-error TS(2304): Cannot find name 'style'.
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              // @ts-expect-error TS(2304): Cannot find name 'onPress'.
              onPress={() => setRender("goodAndServices")}
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              style={styles.selection}
            >
              <Text
                // @ts-expect-error TS(2304): Cannot find name 'style'.
                style={{
                  // @ts-expect-error TS(2304): Cannot find name 'styles'.
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  // @ts-expect-error TS(2304): Cannot find name 'backgroundColor'.
                  backgroundColor: "transparent",
                }}
              >
                // @ts-expect-error TS(2304): Cannot find name 'Good'.
                Good And Services
              </Text>
              // @ts-expect-error TS(2304): Cannot find name 'source'.
              <Image source={require("../assets/images/adventure-gear.png")} />
            </TouchableOpacity>
          </View>
          // @ts-expect-error TS(2304): Cannot find name 'style'.
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              // @ts-expect-error TS(2304): Cannot find name 'onPress'.
              onPress={() => setRender("weaponsShop")}
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              style={styles.selection}
            >
              <Text
                // @ts-expect-error TS(2304): Cannot find name 'style'.
                style={{
                  // @ts-expect-error TS(2304): Cannot find name 'styles'.
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  // @ts-expect-error TS(2304): Cannot find name 'backgroundColor'.
                  backgroundColor: "transparent",
                }}
              // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
              >
                // @ts-expect-error TS(2304): Cannot find name 'Weapons'.
                Weapons
              </Text>
              // @ts-expect-error TS(2304): Cannot find name 'source'.
              <Image source={require("../assets/images/weapons.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
