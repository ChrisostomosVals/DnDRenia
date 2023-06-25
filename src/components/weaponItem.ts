import { Col, Row, Grid } from "react-native-easy-grid";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../utils/styles";



export const WeaponItem = ({
  e,
  index,
  removeItemFromCart,
  addItemToCart,
  cart
}: any) =>{

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
        // @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'Grid'.
        return (
          // @ts-expect-error TS(2304): Cannot find name 'style'.
          <Grid style={styles.grid}>
            // @ts-expect-error TS(7027): Unreachable code detected.
            <Row style={styles.row}>
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              <Col style={{paddingright: '1%', paddingleft: '1%'}}>
                <Text
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  style={{
                    // @ts-expect-error TS(2304): Cannot find name 'styles'.
                    ...styles.textStyle,
                    // @ts-expect-error TS(2304): Cannot find name 'color'.
                    color: index % 2 ? "white" : "#DAA520",
                  }}
                // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                >
                  // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                  {e.name}
                </Text>
              </Col>
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              <Col style={{paddingRight: '1%', paddingLeft: '1%'}}>
                <Text
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  style={{
                    // @ts-expect-error TS(2304): Cannot find name 'styles'.
                    ...styles.textStyle,
                    // @ts-expect-error TS(2304): Cannot find name 'color'.
                    color: index % 2 ? "white" : "#DAA520",
                  }}
                // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                >
                  // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                  {e.cost}
                </Text>
              </Col>
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              <Col style={{paddingright: '1%', paddingleft: '1%'}}>
                <Text
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  style={{
                    // @ts-expect-error TS(2304): Cannot find name 'styles'.
                    ...styles.textStyle,
                    // @ts-expect-error TS(2304): Cannot find name 'color'.
                    color: index % 2 ? "white" : "#DAA520",
                  }}
                // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                >
                  // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                  {e.dmgS}
                </Text>
              </Col>
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              <Col style={{paddingright: '1%', paddingleft: '1%'}}>
                <Text
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  style={{
                    // @ts-expect-error TS(2304): Cannot find name 'styles'.
                    ...styles.textStyle,
                    // @ts-expect-error TS(2304): Cannot find name 'color'.
                    color: index % 2 ? "white" : "#DAA520",
                  }}
                // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                >
                  // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                  {e.dmgM}
                </Text>
              </Col>
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              <Col style={{paddingright: '1%', paddingleft: '1%'}}>
                <Text
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  style={{
                    // @ts-expect-error TS(2304): Cannot find name 'styles'.
                    ...styles.textStyle,
                    // @ts-expect-error TS(2304): Cannot find name 'color'.
                    color: index % 2 ? "white" : "#DAA520",
                  }}
                // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                >
                  // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                  {e.critical}
                </Text>
              </Col>
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              <Col style={{paddingright: '1%', paddingleft: '1%'}}>
                <Text
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  style={{
                    // @ts-expect-error TS(2304): Cannot find name 'styles'.
                    ...styles.textStyle,
                    // @ts-expect-error TS(2304): Cannot find name 'color'.
                    color: index % 2 ? "white" : "#DAA520",
                  }}
                // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                >
                  // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                  {e.rangeIncrement}
                </Text>
              </Col>
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              <Col style={{paddingright: '1%', paddingleft: '1%'}}>
                <Text
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  style={{
                    // @ts-expect-error TS(2304): Cannot find name 'styles'.
                    ...styles.textStyle,
                    // @ts-expect-error TS(2304): Cannot find name 'color'.
                    color: index % 2 ? "white" : "#DAA520",
                  }}
                // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                >
                  // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                  {e.weight}
                </Text>
              </Col>
              <Col>
                <Text
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  style={{
                    // @ts-expect-error TS(2304): Cannot find name 'styles'.
                    ...styles.textStyle,
                    // @ts-expect-error TS(2304): Cannot find name 'color'.
                    color: index % 2 ? "white" : "#DAA520",
                  }}
                // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                >
                  // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                  {e.type}
                </Text>
              </Col>
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              <Col style={styles.buttons}>
                <TouchableOpacity
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  style={{
                    // @ts-expect-error TS(2304): Cannot find name 'styles'.
                    ...styles.button,
                    // @ts-expect-error TS(2304): Cannot find name 'backgroundColor'.
                    backgroundColor: index % 2 ? "white" : "#DAA520",
                  }}
                  // @ts-expect-error TS(2304): Cannot find name 'onPress'.
                  onPress={() => addItemToCart(e.name, e.cost, e.weight)}
                >
                  <Text
                    // @ts-expect-error TS(2304): Cannot find name 'style'.
                    style={{
                      // @ts-expect-error TS(2304): Cannot find name 'styles'.
                      ...styles.buttonText,
                      // @ts-expect-error TS(2304): Cannot find name 'color'.
                      color: index % 2 ? "#DAA520" : "white",
                    }}
                  // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                  >
                    +
                  </Text>
                </TouchableOpacity>
                // @ts-expect-error TS(2304): Cannot find name 'cart'.
                {cart.find((item: any) => item.name === e.name) && (
                  <TouchableOpacity
                    // @ts-expect-error TS(2304): Cannot find name 'style'.
                    style={{
                      // @ts-expect-error TS(2304): Cannot find name 'styles'.
                      ...styles.button,
                      // @ts-expect-error TS(2304): Cannot find name 'backgroundColor'.
                      backgroundColor: index % 2 ? "white" : "#DAA520",
                    }}
                    // @ts-expect-error TS(2304): Cannot find name 'onPress'.
                    onPress={() => removeItemFromCart(e.name)}
                  >
                    <Text
                      // @ts-expect-error TS(2304): Cannot find name 'style'.
                      style={{
                        // @ts-expect-error TS(2304): Cannot find name 'styles'.
                        ...styles.buttonText,
                        // @ts-expect-error TS(2304): Cannot find name 'color'.
                        color: index % 2 ? "#DAA520" : "white",
                      }}
                    // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                    >
                      -
                    </Text>
                  </TouchableOpacity>
                )}
              // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
              </Col>
            </Row>
            <View
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              style={{
                // @ts-expect-error TS(2695): Left side of comma operator is unused and has no s... Remove this comment to see the full error message
                borderBottomColor: "white",
                // @ts-expect-error TS(2304): Cannot find name 'borderBottomWidth'.
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </Grid>
        );
}