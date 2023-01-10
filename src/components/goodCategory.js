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
import {GoodItem} from "./goodCategoryItem"

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
export const GoodCategory = ({ cart, category, heroId, equipment, setShopVisible, removeItem, addItem }) => {
 
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0)
  }, [category, heroId, equipment, setShopVisible]);



  const removeItemFromCart = (name) => {
    removeItem(name);
  };
  const addItemToCart = (name, cost, weight) => {
    addItem(name, cost, weight);
  };
  
  const styles = StyleSheet.create({
    container: {
    },
    welcomeStyle: {
      fontSize: 30,
      textAlign: "center",
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
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
      backgroundColor: 'red',
      left: 0,
      right: 0,
      bottom: -20,
      justifyContent: "center",
      alignItems: "center",
    },
    title:{
      marginTop: '10%'
    }
  });
  if(!equipment){
    return (<Text style={styles.textStyle}>Loading...</Text>)
  }
  return (
    <>
    <View style={styles.title}><Text style={{...styles.welcomeStyle, marginBottom: 20}}>{category}</Text></View>
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.table}>
          <Grid style={styles.grid}>
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
                <GoodItem cart={cart} removeItemFromCart={removeItem} page={page} addItemToCart={addItem} e={e} index={index} category={category} />
            )
            )}
        </View>

     {category !== "Food Drink And Lodging" && <PageUpAndDown page={page} setPage={setPage} equipment={equipment} pageLength={parseInt(equipment.length/8)}/>} 
      <TouchableOpacity
                            style={styles.button}
                            onPress={() => setShopVisible(true)}
                          >
                            <Text
                              style={styles.buttonText}
                            >
                              Back
                            </Text>
                          </TouchableOpacity>
    </ScrollView>
    </>
  );
};
