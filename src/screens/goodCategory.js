import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { globalStyles } from "../utils/styles";
import { Col, Row, Grid } from "react-native-easy-grid";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
export const GoodCategory = ({ route }) => {
  const [category, setCategory] = useState();
  const [heroId, setHeroId] = useState();
  const [equipment, setEquipment] = useState();
  const [cart, setCart] = useState();
  const [page, setPage] = useState(0);

  useEffect(() => {
    setHeroId(route.params.heroId);
    setEquipment(route.params.equipment);
    setCart(route.params.cart);
    setCategory(route.params.category);
  }, [route]);

  const removeItemFromCart = (name) => {
    route.params.removeItemFromCart(name);
    const doesItemExist = cart.find((item) => item.name === name);
    if (doesItemExist) {
      if (doesItemExist.quantity < 2) {
        return setCart((cartItems) =>
          cartItems.filter((item) => item.name !== name)
        );
      }
      return setCart((itemCart) => {
        const newCart = itemCart.map((item) => {
          if (item.name === name) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
        return newCart;
      });
    }
  };
  const addItemToCart = (name, cost, weight) => {
    route.params.addItemToCart(name, cost, weight);
    if (cart.length === 0) {
      return setCart((prevCart) => [
        ...prevCart,
        { name: name, cost: cost, weight: weight, quantity: 1 },
      ]);
    }
    const doesItemExist = cart.find((item) => item.name === name);
    if (doesItemExist) {
      return setCart((itemCart) => {
        const newCart = itemCart.map((item) => {
          if (item.name === name) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        return newCart;
      });
    } else {
      return setCart((prevCart) => [
        ...prevCart,
        { name: name, cost: cost, weight: weight, quantity: 1 },
      ]);
    }
  };
  const handlePage = (action) => {
    if (action === "up" && (page + 1) * 8 < equipment.length) {
      setPage((page) => ++page);
    } else if (action === "down" && page > 0) {
      setPage((page) => --page);
    }
  };
  const styles = StyleSheet.create({
    container: {
      marginTop: "20%",
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
  });

  return (
    <ScrollView >
      <View style={styles.container}>
        <Text style={styles.welcomeStyle}>{category}</Text>
        {route.params.cartAndMoney}
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
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </Grid>
          {equipment &&
            equipment.length > 0 &&
            equipment.map((e, index) => {
              if (index >= page * 8 && index < 8 * (page + 1)) {
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
                          {e.weight}
                        </Text>
                      </Col>
                      <Col style={styles.buttons}>
                        <TouchableOpacity
                          style={{
                            ...styles.button,
                            backgroundColor: index % 2 ? "white" : "#DAA520",
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
                        {cart.find((item) => item.name === e.name) && (
                          <TouchableOpacity
                            style={{
                              ...styles.button,
                              backgroundColor: index % 2 ? "white" : "#DAA520",
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
                        )}
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
        </View>
      </View>

      <Grid>
        <Row style={styles.row}>
          <Col>
            <TouchableOpacity
              style={styles.pageButton}
              onPress={() => handlePage("down")}
            >
              <Text style={styles.textStyle}>{"<"}</Text>
            </TouchableOpacity>
          </Col>
          <Col>
            <Text style={styles.welcomeStyle}>Page {page + 1}</Text>
          </Col>
          <Col>
            <TouchableOpacity
              style={styles.pageButton}
              onPress={() => handlePage("up")}
            >
              <Text style={styles.textStyle}>{">"}</Text>
            </TouchableOpacity>
          </Col>
          <Col></Col>
        </Row>
      </Grid>
    </ScrollView>
  );
};
