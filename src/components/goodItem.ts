import { Col, Row, Grid } from "react-native-easy-grid";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../utils/styles";
// @ts-expect-error TS(7030): Not all code paths return a value.
export const GoodItem = ({
  e,
  index,
  category,
  page,
  removeItemFromCart,
  addItemToCart,
  cart
}: any) => {
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
  if (category === "Food Drink And Lodging") {
    return (
      // @ts-expect-error TS(7027): Unreachable code detected.
      <Grid key={Object.keys(e)[0]} style={styles.grid}>
        <Row>
          // @ts-expect-error TS(2304): Cannot find name 'style'.
          <Col style={styles.rowCategory}>
            <Text
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              style={{
                // @ts-expect-error TS(2304): Cannot find name 'styles'.
                ...styles.textStyle,
                // @ts-expect-error TS(2304): Cannot find name 'color'.
                color: index % 2 ? "white" : "#DAA520",
                // @ts-expect-error TS(2304): Cannot find name 'fontSize'.
                fontSize: 20
              }}
            // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
            >
              // @ts-expect-error TS(2304): Cannot find name 'e'.
              {Object.keys(e)[0].toUpperCase()}
            </Text>
          </Col>
        </Row>
        

        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        {Object.values(e)[0].map((g: any, index: any) => (
          // @ts-expect-error TS(2304): Cannot find name 'key'.
          <Grid key={g.name + index} style={styles.grid}>
            // @ts-expect-error TS(2304): Cannot find name 'style'.
            <Row style={styles.row}>
              <Col>
                <Text
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  style={{
                    // @ts-expect-error TS(2304): Cannot find name 'styles'.
                    ...styles.textStyle,
                    // @ts-expect-error TS(2304): Cannot find name 'index'.
                    color: index % 2 ? "white" : "#DAA520",
                  }}
                // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                >
                  // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                  {g.name}
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
                  {g.cost}
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
                  {g.weight}
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
                  onPress={() => addItemToCart(Object.keys(e)[0].toUpperCase() + ' ' + g.name, g.cost, g.weight)}
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
                {cart.find((item: any) => item.name === (Object.keys(e)[0].toUpperCase() + ' ' + g.name)) && (
                  <TouchableOpacity
                    // @ts-expect-error TS(2304): Cannot find name 'style'.
                    style={{
                      // @ts-expect-error TS(2304): Cannot find name 'styles'.
                      ...styles.button,
                      // @ts-expect-error TS(2304): Cannot find name 'backgroundColor'.
                      backgroundColor: index % 2 ? "white" : "#DAA520",
                    }}
                    // @ts-expect-error TS(2304): Cannot find name 'onPress'.
                    onPress={() => removeItemFromCart(Object.keys(e)[0].toUpperCase() + ' ' + g.name)}
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
        ))}
      </Grid>
    );
  } else {
    // @ts-expect-error TS(2304): Cannot find name 'index'.
    if (index >= page * 8 && index < 8 * (page + 1)) {
      return (
        <Grid style={styles.grid}>
          // @ts-expect-error TS(7027): Unreachable code detected.
          <Row style={styles.row}>
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
                {e.name}
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
                {e.cost}
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
                {e.weight}
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
  }
};
