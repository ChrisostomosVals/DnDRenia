import { useEffect, useState, useCallback, Fragment } from "react";
import { CharacterGearApi } from "../utils/api.service";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList
} from "react-native";
import { globalStyles } from "../utils/styles";
import { wait } from "../utils/constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Col, Row, Grid } from "react-native-easy-grid";

export const MyGear = ({ route }) => {
  const { heroId } = route.params;
  const [gear, setGear] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [money, setMoney] = useState({});
  const [weight, setWeight] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    fetchGear();
  }, [heroId]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flex: 0.1,
      marginTop: "20%",
    },
    welcomeStyle: {
      fontSize: 30,
      textAlign: "center",
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
      justifyContent: "center",
    },
    moneyWeight: {
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
      flex: 0.2,
    },
    row: {
      alignItems: "center",
    },
    grid: {
      justifyContent: "center",
    },
    gear:{
      flex: 1,
      alignContent: 'center',
      justifyContent: 'space-around'
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
  });
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchGear();
    setSelectedId(null)
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const fetchGear = async () => {
    const getGear = await CharacterGearApi.Get(heroId);
    setWeight(0);
    const gear = getGear.filter(g => g.name !== 'MONEY')
    setGear(gear);
    getGear.forEach((g) => {
      setWeight((w) => w + g.weight * g.quantity);
      if (g.name === "MONEY") {
        let moneyArr = g.quantity.toFixed(2);
        const gold = moneyArr.split(".")[0];
        const silver = moneyArr.split(".")[1][0];
        const copper = moneyArr.split(".")[1][1];
        setMoney({
          id: g.id,
          gold: gold,
          silver: silver,
          copper: copper,
        });
      }
    });
  };
  const Item = ({ item, onPress, backgroundColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={{...globalStyles.textStyle, textAlign:'center'}}>{item.name}{item.weight > 0 && <> {item.weight} lb</>} </Text>
      <Text style={{...globalStyles.textStyle, textAlign:'center'}}> x {item.quantity}</Text>
    </TouchableOpacity>
  );

  const renderItem = (item) => {
    const backgroundColor = item.id === selectedId ? "#DAA520" : "rgb(16,36,69)";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor='white'
        key={item.id}
      />
    );
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={{ ...styles.welcomeStyle, ...globalStyles.textStyle }}>
          Your Gear
        </Text>
      </View>
      {gear && money && gear.length > 0 && (
        <View style={styles.gear}>
          <Grid style={{ ...styles.moneyWeight, ...styles.grid }}>
            <Row style={styles.row}>
              <Col style={{ alignItems: "center" }}>
                <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                  Money:
                </Text>
              </Col>
              <Col style={{ alignItems: "center" }}>
                <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                  Total Weight:
                </Text>
              </Col>
            </Row>
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Row style={styles.row}>
              <Col style={{ alignItems: "center" }}>
                <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                  {money.gold} <FontAwesome5 name="coins" color="gold" />{" "}
                  {money.silver} <FontAwesome5 name="coins" color="silver" />{" "}
                  {money.copper} <FontAwesome5 name="coins" color="#b87333" />
                </Text>
              </Col>
              <Col style={{ alignItems: "center" }}>
                <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                  {weight} lb
                </Text>
              </Col>
            </Row>
          </Grid>
          <View style={{flex: 0.6,...styles.welcomeStyle}}>
            <Text style={{ ...globalStyles.textStyle, textAlign:'center', fontSize: 30 }}>Items in your Inventory</Text>
            <ScrollView persistentScrollbar={true}>
            {gear.length > 0 &&
              gear.map(g => renderItem(g))
            }
            </ScrollView>
          </View>
        </View>
      )}
    </ScrollView>
  );
};
