import { Col, Row, Grid } from "react-native-easy-grid";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../utils/styles";
export const GoodItem = ({
  e,
  index,
  category,
  page,
  removeItemFromCart,
  addItemToCart,
  cart,
}) => {
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
      <Grid key={Object.keys(e)[0]} style={styles.grid}>
        <Row>
          <Col style={styles.rowCategory}>
            <Text
              style={{
                ...styles.textStyle,
                color: index % 2 ? "white" : "#DAA520",
                fontSize: 20
              }}
            >
              {Object.keys(e)[0].toUpperCase()}
            </Text>
          </Col>
        </Row>
        

        {Object.values(e)[0].map((g) => (
          <Grid key={g.name} style={styles.grid}>
            <Row style={styles.row}>
              <Col>
                <Text
                  style={{
                    ...styles.textStyle,
                    color: index % 2 ? "white" : "#DAA520",
                  }}
                >
                  {g.name}
                </Text>
              </Col>
              <Col>
                <Text
                  style={{
                    ...styles.textStyle,
                    color: index % 2 ? "white" : "#DAA520",
                  }}
                >
                  {g.cost}
                </Text>
              </Col>
              <Col>
                <Text
                  style={{
                    ...styles.textStyle,
                    color: index % 2 ? "white" : "#DAA520",
                  }}
                >
                  {g.weight}
                </Text>
              </Col>
              <Col style={styles.buttons}>
                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor: index % 2 ? "white" : "#DAA520",
                  }}
                  onPress={() => addItemToCart(Object.keys(e)[0].toUpperCase() + ' ' + g.name, g.cost, g.weight)}
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
                {cart.find((item) => item.name === (Object.keys(e)[0].toUpperCase() + ' ' + g.name)) && (
                  <TouchableOpacity
                    style={{
                      ...styles.button,
                      backgroundColor: index % 2 ? "white" : "#DAA520",
                    }}
                    onPress={() => removeItemFromCart(Object.keys(e)[0].toUpperCase() + ' ' + g.name)}
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
        ))}
      </Grid>
    );
  } else {
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
  }
};
