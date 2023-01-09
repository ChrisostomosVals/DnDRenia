import { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Col, Row, Grid } from "react-native-easy-grid";
import { globalStyles } from "../utils/styles";
export const PageUpAndDown = ({ page, setPage, equipment, parent, pageLength }) => {
  const [openPageSelection, setOpenPageSelection] = useState(false)
  const [numberPages, setNumberPages] = useState([])
  useEffect(() =>{
    setNumberPages([])
    for(let i = 0; i <= pageLength; i++){
      setNumberPages(pages => [...pages, {value: i, label: i+1}])
    }
  },[equipment])
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
      backgroundColor: parent === 'cart' ? '#DAA520' : 'rgba(16,36,69,0.95)',
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
    dropDownStyle: {
      backgroundColor: "#102445",
      marginBottom: 10,
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
        
      </Row>
      {
        parent !== 'cart' &&
        <DropDownPicker
        placeholder="Select Page"
        open={openPageSelection}
        setOpen={setOpenPageSelection}
        items={numberPages}
        value={page}
        setValue={(e) => setPage(e())}
        textStyle={styles.pageText}
        style={styles.dropDownStyle}
        zIndex={5}
        dropDownDirection='TOP'
        closeOnBackPressed
        itemSeparator={true}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        />
      }
    </Grid>
  );
};