import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { useState, useEffect } from "react";
import { globalStyles } from "../utils/styles";
import { Col, Row, Grid } from "react-native-easy-grid";
import { PageUpAndDown } from "./pageUpAndDown";
import { GoodItem } from "./goodItem";
import IonIcon from "react-native-vector-icons/Ionicons";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
export const GoodCategory = ({
  cart,
  category,
  equipment,
  setShopVisible,
  removeItem,
  addItem,
}) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [category, equipment, setShopVisible]);

  const styles = StyleSheet.create({
    categoryTitle: {
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
      flexDirection: "row",
      margin: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    welcomeStyle: {
      fontSize: 30,
      textAlign: "center",
      alignSelf: "center",
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
      justifyContent: "center",
    },
    table: {
      backgroundColor: "rgba(16,36,69,0.95)",
    },
    title: {
      marginTop: "10%",
    },
    row: {
      alignItems: "center",
      padding: "2%",
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
    backButton: {
      position: "absolute",
      left: 5,
    },
  });
  if (!equipment) {
    return <Text style={styles.textStyle}>Loading...</Text>;
  }
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
          <Text style={styles.welcomeStyle}>{category}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.table}>
          <Grid style={{...styles.grid, backgroundColor: '#DAA520'}}>
            <Row style={styles.row}>
              <Col>
                <Text style={styles.textStyle}>Goods</Text>
              </Col>
              <Col>
                <Text style={styles.textStyle}>Cost</Text>
              </Col>
              <Col>
                <Text style={styles.textStyle}>Weight</Text>
              </Col>
              <Col></Col>
            </Row>
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </Grid>
          {equipment &&
            equipment.length > 0 &&
            equipment.map((e, index) => (
              <GoodItem
                key={e.name}
                cart={cart}
                removeItemFromCart={removeItem}
                page={page}
                addItemToCart={addItem}
                e={e}
                index={index}
                category={category}
              />
            ))}
        </View>

        {category !== "Food Drink And Lodging" && (
          <PageUpAndDown
            page={page}
            setPage={setPage}
            equipment={equipment}
            pageLength={parseInt(equipment.length / 8)}
          />
        )}
      </ScrollView>
    </>
  );
};
