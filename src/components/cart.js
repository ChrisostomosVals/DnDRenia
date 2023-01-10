import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../utils/styles";
import { Col, Row, Grid } from "react-native-easy-grid";
import { useEffect, useState } from "react";
import { PageUpAndDown } from "./pageUpAndDown";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


export const Cart = ({
  cart,
  modalVisible,
  setModalVisible,
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
}) => {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalCost, setTotalCost] = useState({
    gold: '',
    silver: '',
    copper: ''
  })
  useEffect(() => {
    setTotal(0)
    calculateTotal();
  }, [cart, modalVisible, setModalVisible]);
  const calculateTotal = () => {
    for (let item of cart) {
      let cost = item.cost.split(" ")[0];
      const curr = item.cost.split(" ")[1];
      switch (curr) {
        case "gp":
          cost = cost * 1000;
          break;
        case "sp":
          cost = cost * 100;
          break;
        case "cp":
          cost = cost * 10;
          break;
        default:
          break;
      }
      cost = (item.quantity*cost/1000)
      setTotal((tot) => (tot + cost));
    }
    if(total !=0 ){
      const tot = total.toFixed(2)
      setTotalCost({
        gold: tot.split('.')[0],
        silver: tot.split('.')[1][0],
        copper: tot.split('.')[1][1]
      })
    }
   
  };
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      width: "90%",
      alignItems: "center",
      backgroundColor: "#DAA520",
      borderRadius: 15,
      padding: 35,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,

      justifyContent: "space-around",
    },
    button: {
      elevation: 2,
      ...globalStyles.card,
      alignItems: "center",
    },
    textStyle: {
      ...globalStyles.textStyle,
      fontSize: 18,
      textAlign: "center",
    },
    table: {
      ...globalStyles.card,
      width: "115%",
      paddingLeft: 10,
      paddingRight: 10,
      height: "80%",
    },
    row: {
      alignItems: "center",
    },
    grid: {
      justifyContent: "center",
    },
    closeButton: {
      fontSize: 30,
      textAlign: "center",
      padding: "4%",
      borderRadius: 15,
      ...globalStyles.textStyle,
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    plusMinusButton: {
      ...globalStyles.card,
      width: "45%",
      alignItems: "center",
    },
    removeButton: {
      ...globalStyles.card,
      alignItems: "center",
    },
    buttonText: {
      ...globalStyles.textStyle,
      fontSize: 35,
    },
  });
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>Your Cart</Text>
            {cart.length > 0 && (
              <View style={styles.table}>
                {cart.length > 0 && (
                  <Grid style={styles.grid}>
                    <Row style={styles.row}>
                      <Col>
                        <Text style={styles.textStyle}>Goods</Text>
                      </Col>
                      <Col>
                        <Text style={styles.textStyle}>Cost</Text>
                      </Col>
                      <Col>
                        <Text style={styles.textStyle}>Quantity</Text>
                      </Col>
                      <Col></Col>
                      <Col></Col>
                    </Row>
                    <View
                      style={{
                        borderBottomColor: "black",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                    />
                  </Grid>
                )}
                {cart.length > 0 &&
                  cart.map((e, index) => {
                    if (index >= page * 4 && index < 4 * (page + 1)) {
                      return (
                        <Grid key={e.name} style={styles.grid}>
                          <Row style={styles.row}>
                            <Col>
                              <Text
                                style={{
                                  ...styles.textStyle,
                                  color: index % 2 ? "white" : "#DAA520",
                                }}
                              >
                                {e.name}
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  ...styles.textStyle,
                                  color: index % 2 ? "white" : "#DAA520",
                                }}
                              >
                                {e.cost}
                              </Text>
                            </Col>
                            <Col>
                              <Text
                                style={{
                                  ...styles.textStyle,
                                  color: index % 2 ? "white" : "#DAA520",
                                }}
                              >
                                {e.quantity}
                              </Text>
                            </Col>

                            <Col style={styles.buttons}>
                              <Icon
                                onPress={() => addItemToCart(e.name, e.weight)}
                                size={20}
                                color={index % 2 ? "#DAA520" : "white"}
                                name="plus"
                              />

                              <Icon
                                onPress={() => removeItemFromCart(e.name)}
                                size={20}
                                color={index % 2 ? "#DAA520" : "white"}
                                name="minus"
                              />
                            </Col>
                            <Col style={{ alignItems: "flex-end" }}>
                              <Icon
                                onPress={() => deleteItemFromCart(e.name)}
                                size={20}
                                color={index % 2 ? "#DAA520" : "white"}
                                name="remove"
                              />
                            </Col>
                          </Row>
                          <View
                            style={{
                              borderBottomColor: "black",
                              borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                          />
                        </Grid>
                      );
                    }
                  })}
                {cart.length > 0 && (
                  <PageUpAndDown
                    page={page}
                    setPage={setPage}
                    equipment={cart}
                    parent="cart"
                    itemsLength={cart.length}
                  />
                )}
                <Text style={styles.textStyle}>
                  Total: {totalCost.gold}{" "}
                  <FontAwesome5 name="coins" color="gold" /> {totalCost.silver}{" "}
                  <FontAwesome5 name="coins" color="silver" />{" "}
                  {totalCost.copper}{" "}
                  <FontAwesome5 name="coins" color="#b87333" />
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
