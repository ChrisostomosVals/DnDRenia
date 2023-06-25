import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../utils/styles";
import { Col, Row, Grid } from "react-native-easy-grid";
import { useCallback, useEffect, useState } from "react";
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
  onBuy
}: any) => {
  const [page, setPage] = useState(0);
  const [totalCost, setTotalCost] = useState({
    gold: "",
    silver: "",
    copper: "",
  });
  useEffect(() => {
    calculateTotal();
  }, [cart, modalVisible, setModalVisible]);
  const calculateTotal = () => {
    let total = 0;
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
      cost = (item.quantity * cost) / 1000;
      total += cost;
    }
    if (total !== 0) {
      const tot = total.toFixed(2);
      setTotalCost({
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        gold: tot.split(".")[0],
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        silver: tot.split(".")[1][0],
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        copper: tot.split(".")[1][1],
      });
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
      width: "95%",
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
      width: "120%",
      paddingLeft: 10,
      paddingRight: 10,
      height: "80%",
      alignSelf: "center",
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
    actionButtons: {
      flexDirection: "row",
      justifyContent: "space-around",
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
    emptyView:{
      ...globalStyles.card,
      alignItems: 'center',
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
    }
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
            <Text style={{ ...styles.textStyle, fontSize: 25 }}>Your Cart</Text>
            {cart.length > 0 ? (
              <>
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
                    // @ts-expect-error TS(7030): Not all code paths return a value.
                    cart.map((e: any, index: any) => {
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
                                  onPress={() =>
                                    addItemToCart(e.name, e.weight)
                                  }
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
                      pageLength={cart.length}
                    />
                  )}
                  <Text style={styles.textStyle}>
                    Total: {totalCost.gold}{" "}
                    <FontAwesome5 name="coins" color="gold" />{" "}
                    {totalCost.silver}{" "}
                    <FontAwesome5 name="coins" color="silver" />{" "}
                    {totalCost.copper}{" "}
                    <FontAwesome5 name="coins" color="#b87333" />
                  </Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={{
                      ...styles.button,
                      opacity: cart.length > 0 ? 1 : 0.5,
                    }}
                    onPress={onBuy}
                    disabled={cart.length === 0}
                  >
                    <Text style={styles.closeButton}>Buy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButton}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
              <View style={styles.emptyView}>
                <Text style={styles.textStyle}>Your cart is empty</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButton}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
