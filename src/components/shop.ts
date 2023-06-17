import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../utils/styles";

export const Shop = ({setRender}) => {
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

  return (
    <ScrollView scrollEnable={true}>
      <View style={styles.container}>
        
        <View style={styles.equipment}>
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              onPress={() => setRender("goodAndServices")}
              style={styles.selection}
            >
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Good And Services
              </Text>
              <Image source={require("../assets/images/adventure-gear.png")} />
            </TouchableOpacity>
          </View>
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              onPress={() => setRender("weaponsShop")}
              style={styles.selection}
            >
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Weapons
              </Text>
              <Image source={require("../assets/images/weapons.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
