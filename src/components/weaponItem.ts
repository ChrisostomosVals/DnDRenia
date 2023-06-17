import { Col, Row, Grid } from "react-native-easy-grid";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../utils/styles";



export const WeaponItem = ({
    e,
    index,
    removeItemFromCart,
    addItemToCart,
    cart,}) =>{

        const styles = StyleSheet.create({
            textStyle: {
              ...globalStyles.textStyle,
              fontSize: 20,
            },
            button: {
              ...globalStyles.card,
              width: "45%",
              alignItems: "center",
            },
            grid: {
              justifyContent: "center",
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
            rowCategory:{
              alignItems: 'center'
            }
          });
        return (
            <Grid style={styles.grid}>
              <Row style={styles.row}>
                <Col style={{paddingright: '1%', paddingleft: '1%'}}>
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: index % 2 ? "white" : "#DAA520",
                    }}
                  >
                    {e.name}
                  </Text>
                </Col>
                <Col style={{paddingRight: '1%', paddingLeft: '1%'}}>
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: index % 2 ? "white" : "#DAA520",
                    }}
                  >
                    {e.cost}
                  </Text>
                </Col>
                <Col style={{paddingright: '1%', paddingleft: '1%'}}>
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: index % 2 ? "white" : "#DAA520",
                    }}
                  >
                    {e.dmgS}
                  </Text>
                </Col>
                <Col style={{paddingright: '1%', paddingleft: '1%'}}>
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: index % 2 ? "white" : "#DAA520",
                    }}
                  >
                    {e.dmgM}
                  </Text>
                </Col>
                <Col style={{paddingright: '1%', paddingleft: '1%'}}>
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: index % 2 ? "white" : "#DAA520",
                    }}
                  >
                    {e.critical}
                  </Text>
                </Col>
                <Col style={{paddingright: '1%', paddingleft: '1%'}}>
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: index % 2 ? "white" : "#DAA520",
                    }}
                  >
                    {e.rangeIncrement}
                  </Text>
                </Col>
                <Col style={{paddingright: '1%', paddingleft: '1%'}}>
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: index % 2 ? "white" : "#DAA520",
                    }}
                  >
                    {e.weight}
                  </Text>
                </Col>
                <Col>
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: index % 2 ? "white" : "#DAA520",
                    }}
                  >
                    {e.type}
                  </Text>
                </Col>
                <Col style={styles.buttons}>
                  <TouchableOpacity
                    style={{
                      ...styles.button,
                      backgroundColor: index % 2 ? "white" : "#DAA520",
                    }}
                    onPress={() => addItemToCart(e.name, e.cost, e.weight)}
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
                  borderBottomColor: "white",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            </Grid>
          );
}