import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { globalStyles } from "../utils/styles";
import { Col, Row, Grid } from "react-native-easy-grid";
import { WeaponItem } from "./weaponItem";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import IonIcon from "react-native-vector-icons/Ionicons";

export const WeaponsCategory = ({
  cart,
  category,
  weapons,
  setShopVisible,
  removeItem,
  addItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedWeapons, setSelectedWeapons] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setCategories([])
    if (weapons.unarmedAttacks) {
      setCategories([
        { label: "Unarmed Attacks", value: 1, category: "unarmedAttacks" },
      ]);
      setSelectedCategory(1);
      setSelectedWeapons(weapons.unarmedAttacks);
    } else {
      setSelectedCategory(2);
      setSelectedWeapons(weapons.lightMeleeWeapons);
    }
    setCategories((cat) => [
      ...cat,
      { label: "Light Melee Weapons", value: 2, category: "lightMeleeWeapons" },
      {
        label: "One-Handed Melee Weapons",
        value: 3,
        category: "oneHandedMeleeWeapons",
      },
      {
        label: "Two-Handed Melee Weapons",
        value: 4,
        category: "twoHandedMeleeWeapons",
      },
      { label: "Ranged Weapons", value: 5, category: "rangedWeapons" },
    ]);
  }, [weapons, category]);

  const styles = StyleSheet.create({
    categoryTitle: {
        backgroundColor: "rgba(16,36,69,0.95)",
        borderRadius: 15,
        flexDirection: 'row',
        margin: 20,
        alignItems:'center',
        justifyContent: 'center'
    },
    welcomeStyle: {
      fontSize: 30,
      textAlign: "center",
      alignSelf: 'center',
      ...globalStyles.textStyle,
    },
    textStyle: {
      ...globalStyles.textStyle,
      fontSize: 20,
    },
    button: {
      ...globalStyles.card,
      width: "45%",
      alignItems: "center",
    },
    pageButton: {
      ...globalStyles.card,
      alignItems: "center",
    },
    grid: {
      justifyContent: "space-between",
    },
    table: {
      backgroundColor: "rgba(16,36,69,0.95)",
    },
    row: {
      alignItems: "center",
      padding: "2%",
      justifyContent: "space-between",
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    buttonText: {
      ...globalStyles.textStyle,
      fontSize: 35,
    },
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
    pageSelection: {
      position: "absolute",
      backgroundColor: "red",
      left: 0,
      right: 0,
      bottom: -20,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      marginTop: "10%",
    },
    dropDownStyle: {
      backgroundColor: "#102445",
      marginBottom: 10,
    },
    pageText: {
      fontSize: 30,
      textAlign: "center",
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
      ...globalStyles.textStyle,
    },
    backButton:{
        position: 'absolute',
        left: 5
    }
  });
  const handleWeaponCategory = (e) => {
    const findCategory = categories.find((c) => c.value === e);
    setSelectedWeapons(weapons[`${findCategory.category}`]);
  };
  return (
    <>
      <View style={styles.title}>
        <View style={styles.categoryTitle}>
        <IonIcon
            style={styles.backButton}
            name="arrow-back-circle"
            color="#DAA520"
            size={30}
            onPress={() => setShopVisible(true)}
          />
        <Text style={styles.welcomeStyle}>
       
          {category}
        </Text>
        </View>
        {categories.length > 0 && (
          <DropDownPicker
            placeholder="Select Category"
            onChangeValue={handleWeaponCategory}
            textStyle={styles.pageText}
            open={open}
            arrowIconStyle={{ backgroundColor: "#DAA520", borderRadius: 25 }}
            selectedItemContainerStyle={{ backgroundColor: "#DAA520" }}
            value={selectedCategory}
            setValue={(e) => setSelectedCategory(e)}
            setOpen={(thisOpen) => setOpen(thisOpen)}
            items={categories}
            style={styles.dropDownStyle}
            closeOnBackPressed
            itemSeparator={true}
            zIndex={7}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
        )}
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 2, width: "225%" }}
        horizontal={true}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.table}>
            <Grid style={{...styles.grid, backgroundColor: '#DAA520'}}>
              <Row style={styles.row}>
                <Col style={{ paddingRight: "1%", paddingLeft: "1%" }}>
                  <Text style={styles.textStyle}>Name</Text>
                </Col>
                <Col style={{ padding: "1%" }}>
                  <Text style={styles.textStyle}>Cost</Text>
                </Col>
                <Col style={{ paddingRight: "1%", paddingLeft: "1%" }}>
                  <Text style={styles.textStyle}>Dmg {"(S)"}</Text>
                </Col>
                <Col style={{ paddingRight: "1%", paddingLeft: "1%" }}>
                  <Text style={styles.textStyle}>Dmg {"(M)"}</Text>
                </Col>
                <Col style={{ paddingRight: "1%", paddingLeft: "1%" }}>
                  <Text style={styles.textStyle}>Critical</Text>
                </Col>
                <Col style={{ paddingRight: "1%", paddingLeft: "1%" }}>
                  <Text style={styles.textStyle}>Range{"\n"}Increment</Text>
                </Col>
                <Col style={{ paddingRight: "1%", paddingLeft: "1%" }}>
                  <Text style={styles.textStyle}>Weight</Text>
                </Col>
                <Col style={{ paddingRight: "1%", paddingLeft: "1%" }}>
                  <Text style={styles.textStyle}>Type</Text>
                </Col>
                <Col style={{ paddingRight: "1%", paddingLeft: "1%" }}></Col>
              </Row>
              <View
                style={{
                  borderBottomColor: "white",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            </Grid>
            {selectedWeapons &&
              selectedWeapons.length > 0 &&
              selectedWeapons.map((e, index) => (
                <WeaponItem
                  key={e.name + index}
                  cart={cart}
                  removeItemFromCart={removeItem}
                  addItemToCart={addItem}
                  e={e}
                  index={index}
                />
              ))}
          </View>
        </ScrollView>
      </ScrollView>
     
    </>
  );
};
