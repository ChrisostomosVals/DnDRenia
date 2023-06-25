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

export const GoodAndServices = ({
  navigateToPage
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
              onPress={() =>
                navigateToPage("Adventure Gear", equipment.adventureGear)
              }
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
                // @ts-expect-error TS(2304): Cannot find name 'Adventure'.
                Adventure Gear
              </Text>
              // @ts-expect-error TS(2304): Cannot find name 'source'.
              <Image source={require("../assets/images/adventure-gear.png")} />
            </TouchableOpacity>
          </View>

          // @ts-expect-error TS(2304): Cannot find name 'style'.
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              // @ts-expect-error TS(2304): Cannot find name 'onPress'.
              onPress={() =>
                // @ts-expect-error TS(2304): Cannot find name 'navigateToPage'.
                navigateToPage(
                  "Special Substances",
                  equipment.specialSubstancesAndItems
                )
              }
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
                // @ts-expect-error TS(2304): Cannot find name 'Special'.
                Special Substances
              </Text>
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
                {" "}
                // @ts-expect-error TS(2304): Cannot find name 'And'.
                And Items
              </Text>
              // @ts-expect-error TS(2304): Cannot find name 'source'.
              <Image source={require("../assets/images/special-items.png")} />
            </TouchableOpacity>
          </View>
          // @ts-expect-error TS(2304): Cannot find name 'style'.
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              // @ts-expect-error TS(2304): Cannot find name 'onPress'.
              onPress={() =>
                // @ts-expect-error TS(2304): Cannot find name 'navigateToPage'.
                navigateToPage(
                  "Tools And Skill Kits",
                  equipment.toolsAndSkillKits
                )
              }
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
                // @ts-expect-error TS(2304): Cannot find name 'Tools'.
                Tools And Skill
              </Text>
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
                {" "}
                // @ts-expect-error TS(2304): Cannot find name 'Kits'.
                Kits
              </Text>
              <Image
                // @ts-expect-error TS(2304): Cannot find name 'source'.
                source={require("../assets/images/tools-skills-kit.png")}
              />
            </TouchableOpacity>
          </View>
          // @ts-expect-error TS(2304): Cannot find name 'style'.
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              // @ts-expect-error TS(2304): Cannot find name 'onPress'.
              onPress={() => navigateToPage("Clothing", equipment.clothing)}
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
                // @ts-expect-error TS(2304): Cannot find name 'Clothing'.
                Clothing
              </Text>
              // @ts-expect-error TS(2304): Cannot find name 'source'.
              <Image source={require("../assets/images/clothing.png")} />
            </TouchableOpacity>
          </View>
          // @ts-expect-error TS(2304): Cannot find name 'style'.
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              // @ts-expect-error TS(2304): Cannot find name 'onPress'.
              onPress={() =>
                // @ts-expect-error TS(2304): Cannot find name 'navigateToPage'.
                navigateToPage(
                  "Food Drink And Lodging",
                  equipment.foodDrinkAndLodging
                )
              }
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
                // @ts-expect-error TS(2304): Cannot find name 'Food'.
                Food Drink And
              </Text>
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
                // @ts-expect-error TS(2304): Cannot find name 'Lodging'.
                Lodging
              </Text>
              // @ts-expect-error TS(2304): Cannot find name 'source'.
              <Image source={require("../assets/images/food-drinks.png")} />
            </TouchableOpacity>
          </View>
          // @ts-expect-error TS(2304): Cannot find name 'style'.
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              // @ts-expect-error TS(2304): Cannot find name 'onPress'.
              onPress={() =>
                // @ts-expect-error TS(2304): Cannot find name 'navigateToPage'.
                navigateToPage(
                  "Mounts And Related Gear",
                  equipment.mountsAndRelatedGear
                )
              }
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
                // @ts-expect-error TS(2304): Cannot find name 'Mounts'.
                Mounts And
              </Text>
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
                // @ts-expect-error TS(2304): Cannot find name 'Related'.
                Related Gear
              </Text>
              <Image
                // @ts-expect-error TS(2304): Cannot find name 'source'.
                source={require("../assets/images/mount-related-gear.png")}
              />
            </TouchableOpacity>
          </View>
          // @ts-expect-error TS(2304): Cannot find name 'style'.
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              // @ts-expect-error TS(2304): Cannot find name 'onPress'.
              onPress={() => navigateToPage("Transport", equipment.transport)}
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
                // @ts-expect-error TS(2304): Cannot find name 'Transport'.
                Transport
              </Text>
              // @ts-expect-error TS(2304): Cannot find name 'source'.
              <Image source={require("../assets/images/transport.png")} />
            </TouchableOpacity>
          </View>
          // @ts-expect-error TS(2304): Cannot find name 'style'.
          <View style={{ ...globalStyles.card, ...styles.itemCard }}>
            <TouchableOpacity
              // @ts-expect-error TS(2304): Cannot find name 'onPress'.
              onPress={() =>
                // @ts-expect-error TS(2304): Cannot find name 'navigateToPage'.
                navigateToPage(
                  "SpellCasting And Services",
                  equipment.spellCastingAndServices
                )
              }
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
                // @ts-expect-error TS(2304): Cannot find name 'SpellCasting'.
                SpellCasting And
              </Text>
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
                // @ts-expect-error TS(2304): Cannot find name 'Services'.
                Services
              </Text>
              // @ts-expect-error TS(2304): Cannot find name 'source'.
              <Image source={require("../assets/images/spellcasting.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
