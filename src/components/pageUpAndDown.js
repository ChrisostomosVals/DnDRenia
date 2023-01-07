import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { globalStyles } from "../utils/styles";
export const PageUpAndDown = ({ page, setPage, equipment, parent }) => {
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    pageText: {
      fontSize: 30,
      textAlign: "center",
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
      ...globalStyles.textStyle,
    },
    row: {
      alignItems: "center",
    },
    grid: {
      justifyContent: "center",
    },
    textStyle: {
      ...globalStyles.textStyle,
      fontSize: 20,
    },
    pageButton: {
      ...globalStyles.card,
    backgroundColor: parent === 'cart' ? '#DAA520' : 'rgba(16,36,69,0.95)',
      alignItems: "center",
    },
  });
  const handlePage = (action) => {
    if (action === "up" && (page + 1) * 8 < equipment.length) {
      setPage((page) => ++page);
    } else if (action === "down" && page > 0) {
      setPage((page) => --page);
    }
  };
  return (
    <Grid style={styles.grid}>
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
          <Text style={styles.pageText}>Page {page + 1}</Text>
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
  );
};
