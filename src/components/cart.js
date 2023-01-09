import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../utils/styles";
import { Col, Row, Grid } from "react-native-easy-grid";
import { useEffect, useState } from "react";
import { PageUpAndDown } from "./pageUpAndDown";

export const Cart = ({ cart, modalVisible, setModalVisible, addItemToCart, removeItemFromCart, deleteItemFromCart }) => {
  const [page, setPage] = useState(0);
  useEffect(() => {
  }, [cart, modalVisible, setModalVisible]);
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      width: "80%",
      alignItems: 'center',
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

      justifyContent: 'space-around'
    },
    button: {
      elevation: 2,
      ...globalStyles.card,
      alignItems: "center",
    },
    textStyle: {
      ...globalStyles.textStyle,
      fontSize: 20,
    },
    table: {
      ...globalStyles.card,
      width: "120%",
      height: "50%",
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
      padding: '4%',
      borderRadius: 15,
      ...globalStyles.textStyle,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
      },
    plusMinusButton:{
        ...globalStyles.card,
      width: "45%",
      alignItems: "center",
    },
    removeButton:{
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
            {cart.length > 0 && 
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
                            <TouchableOpacity
                              style={{
                                ...styles.plusMinusButton,
                                backgroundColor:
                                  index % 2 ? "white" : "#DAA520",
                              }}
                              onPress={() =>
                                addItemToCart(e.name, e.cost, e.weight)
                              }
                            >
                              <Text
                                style={{
                                  ...styles.buttonText,
                                  color: index % 2 ? "#DAA520" : "white",
                                }}
                              >
                                +
                              </Text>
                            </TouchableOpacity>
                              <TouchableOpacity
                                style={{
                                  ...styles.plusMinusButton,
                                  backgroundColor:
                                    index % 2 ? "white" : "#DAA520",
                                }}
                                onPress={() => removeItemFromCart(e.name)}
                              >
                                <Text
                                  style={{
                                    ...styles.buttonText,
                                    color: index % 2 ? "#DAA520" : "white",
                                  }}
                                >
                                  -
                                </Text>
                              </TouchableOpacity>
                              
                          </Col>
                          <Col>
                          <TouchableOpacity
                                style={{
                                  ...styles.removeButton,
                                  backgroundColor:
                                    index % 2 ? "white" : "#DAA520",
                                }}
                                onPress={() => deleteItemFromCart(e.name)}
                              >
                                <Text
                                  style={{
                                    ...globalStyles.textStyle,
                                  fontSize: 18,
                                  color: index % 2 ? "#DAA520" : "white",
                                  }}
                                >
                                  Remove
                                </Text>
                              </TouchableOpacity>
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
                <PageUpAndDown page={page} setPage={setPage} equipment={cart} parent='cart' itemsLength={cart.length}/>
              )}
            </View>}
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
