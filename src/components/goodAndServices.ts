import { equipment } from "../utils/constants";
import { globalStyles } from "../utils/styles";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

export const GoodAndServices = ({ navigateToPage }) => {
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
    backButton: {
      position: "absolute",
      left: 10,
    },
  });
  return (
    <ScrollView scrollEnable={true}>
      <View style={styles.container}>
        <View style={styles.equipment}>
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              onPress={() =>
                navigateToPage("Adventure Gear", equipment.adventureGear)
              }
              style={styles.selection}
            >
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Adventure Gear
              </Text>
              <Image source={require("../assets/images/adventure-gear.png")} />
            </TouchableOpacity>
          </View>

          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              onPress={() =>
                navigateToPage(
                  "Special Substances",
                  equipment.specialSubstancesAndItems
                )
              }
              style={styles.selection}
            >
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Special Substances
              </Text>
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                {" "}
                And Items
              </Text>
              <Image source={require("../assets/images/special-items.png")} />
            </TouchableOpacity>
          </View>
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              onPress={() =>
                navigateToPage(
                  "Tools And Skill Kits",
                  equipment.toolsAndSkillKits
                )
              }
              style={styles.selection}
            >
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Tools And Skill
              </Text>
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                {" "}
                Kits
              </Text>
              <Image
                source={require("../assets/images/tools-skills-kit.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              onPress={() => navigateToPage("Clothing", equipment.clothing)}
              style={styles.selection}
            >
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Clothing
              </Text>
              <Image source={require("../assets/images/clothing.png")} />
            </TouchableOpacity>
          </View>
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              onPress={() =>
                navigateToPage(
                  "Food Drink And Lodging",
                  equipment.foodDrinkAndLodging
                )
              }
              style={styles.selection}
            >
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Food Drink And
              </Text>
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Lodging
              </Text>
              <Image source={require("../assets/images/food-drinks.png")} />
            </TouchableOpacity>
          </View>
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              onPress={() =>
                navigateToPage(
                  "Mounts And Related Gear",
                  equipment.mountsAndRelatedGear
                )
              }
              style={styles.selection}
            >
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Mounts And
              </Text>
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Related Gear
              </Text>
              <Image
                source={require("../assets/images/mount-related-gear.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              onPress={() => navigateToPage("Transport", equipment.transport)}
              style={styles.selection}
            >
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Transport
              </Text>
              <Image source={require("../assets/images/transport.png")} />
            </TouchableOpacity>
          </View>
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              onPress={() =>
                navigateToPage(
                  "SpellCasting And Services",
                  equipment.spellCastingAndServices
                )
              }
              style={styles.selection}
            >
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                SpellCasting And
              </Text>
              <Text
                style={{
                  ...styles.welcomeStyle,
                  ...globalStyles.textStyle,
                  backgroundColor: "transparent",
                }}
              >
                Services
              </Text>
              <Image source={require("../assets/images/spellcasting.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
