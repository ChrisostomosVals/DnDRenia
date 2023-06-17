import {
  exoticWeapons,
  martialWeapons,
  simpleWeapons,
} from "../utils/constants";
import { globalStyles } from "../utils/styles";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

export const WeaponsShop = ({ navigateToPage }) => {
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
    },
    equipment: {
      flex: 1,
      justifyContent: "space-evenly",
      margin: 20,
      alignItems: "center",
    },
    selection: {
      alignItems: "center",
      padding: 10,
    },
    itemCard: {
      margin: 10,
      width: "80%",
    },
  });
  return (
    <ScrollView scrollEnable={true}>
      <View style={styles.container}>
      
        <View style={styles.equipment}>
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              onPress={() => navigateToPage("Simple Weapons", simpleWeapons)}
              style={styles.selection}
            >
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Simple Weapons
              </Text>
              <Image source={require("../assets/images/simple-weapons.png")} />
            </TouchableOpacity>
          </View>

          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              onPress={() => navigateToPage("Martial Weapons", martialWeapons)}
              style={styles.selection}
            >
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Martial Weapons
              </Text>
              <Image source={require("../assets/images/martial-weapons.png")} />
            </TouchableOpacity>
          </View>
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              onPress={() => navigateToPage("Exotic Weapons", exoticWeapons)}
              style={styles.selection}
            >
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Exotic Weapons
              </Text>
              <Image source={require("../assets/images/exotic-weapons.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
