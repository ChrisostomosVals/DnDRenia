import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../utils/styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Col, Row, Grid } from "react-native-easy-grid";
import { ModalQuestion } from "../components/modalQuestion";
import { Banner } from "../components/banner";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import CharacterApi from "../dist/api/CharacterApi";
import { useIsFocused } from "@react-navigation/native";
import { ip } from "../utils/constants";

export const MyGear = ({
  heroId
}: any) => {
  const isFocused = useIsFocused();
  const [gear, setGear] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [money, setMoney] = useState({});
  const [weight, setWeight] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [bannerVisible, setBannerVisible] = useState(false)
  const [bannerText, setBannerText] = useState({title: '', paragraph:''})
  const [arsenal, setArsenal] = useState([])
  const [render, setRender] = useState(false)
 
  useEffect(() => {
    fetchGear();
    fetchArsenal();
    setSelectedItems([])
  }, [heroId, render, isFocused]);
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
    gear: {
      flex: 1,
      alignContent: "center",
      justifyContent: "space-around",
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      elevation: 2,
      ...globalStyles.card,
      alignItems: "center",
      padding: "2%",
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
  });
  const fetchArsenal = async()=>{
    const token = await AsyncStorage.getItem("token");
    const items = await CharacterApi.GetArsenalAsync(token, ip, heroId);
    if(items.isError){
      console.log(items.error, 'myGear.fetchArsenal()')
      setArsenal([])
      return
    }
    setArsenal(items.data)
  }
  const handleRender = () =>{
    setRender(!render)
  }
  const fetchGear = async () => {
    const token = await AsyncStorage.getItem("token");
    const getGear = await CharacterApi.GetGearAsync(token, ip, heroId);
    if(getGear.isError){
      console.log(getGear.error)
      return;
    }
    setWeight(0);
    const gear = getGear.data.filter((g: any) => g.name !== "Money");
    setGear(gear);
    getGear.data.forEach((g: any) => {
      if (g.name === "Money") {
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
      else{
        if(!g.weight || g.weight == '-'){
          return;
        }
        setWeight((w) => w + g.weight.split(' ')[0] * g.quantity);
      }
    });
  };
  const toggleItem = (item: any) => {
    // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    if (selectedItems.includes(item)) {
      setSelectedItems((i) => i.filter((it) => it !== item));
    } else {
      // @ts-expect-error TS(2345): Argument of type '(i: never[]) => any[]' is not as... Remove this comment to see the full error message
      setSelectedItems((i) => [...i, item]);
    }
  };
  const Item = ({
    item,
    onPress,
    backgroundColor
  }: any) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={{ ...globalStyles.textStyle, textAlign: "center" }}>
        {item.name}
        {item.weight > 0 && <> {item.weight} lb</>}{" "}
      </Text>
      <Text style={{ ...globalStyles.textStyle, textAlign: "center" }}>
        {" "}
        x {item.quantity}
      </Text>
    </TouchableOpacity>
  );

    const handleModal = (action: any) => {
      if(action === 'equip'){
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        setModalTitle(`Are you sure you want to equip ${selectedItems[0].name} to your Arsenal?`)
        setModalVisible(true);
      }
    }

  const renderItem = (item: any) => {
    // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    const backgroundColor = selectedItems.includes(item)
      ? "#DAA520"
      // @ts-expect-error TS(2339): Property 'gearId' does not exist on type 'never'.
      : (arsenal.find(ars =>  ars.gearId === item.id) ?
      '#004e00' : "rgb(16,36,69)")
    return (
      <Item
        item={item}
        onPress={() => toggleItem(item)}
        backgroundColor={{ backgroundColor }}
        textColor="white"
        key={item.id}
      />
    );
  };

  const hideDialog = () => {
    setBannerVisible(false)
  };
  return (
    <View style={styles.container}>
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
                  // @ts-expect-error TS(2339): Property 'gold' does not exist on type '{}'.
                  {money.gold} <FontAwesome5 name="coins" color="gold" />{" "}
                  // @ts-expect-error TS(2339): Property 'silver' does not exist on type '{}'.
                  {money.silver} <FontAwesome5 name="coins" color="silver" />{" "}
                  // @ts-expect-error TS(2339): Property 'copper' does not exist on type '{}'.
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
          <View style={{ flex: 0.6, ...styles.welcomeStyle }}>
            <Text
              style={{
                ...globalStyles.textStyle,
                textAlign: "center",
                fontSize: 30,
              }}
            >
              Items in your Inventory
            </Text>
            <ScrollView persistentScrollbar={true}>
              {gear.length > 0 && gear.map((g) => renderItem(g))}
            </ScrollView>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              disabled={selectedItems.length !== 1}
              style={{
                opacity: selectedItems.length === 1 ? 1 : 0.3,
                ...globalStyles.button,
              }}
              onPress={() => handleModal('equip')}
            >
              <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                Equip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={selectedItems.length > 0}
              style={{
                opacity: selectedItems.length > 0 ? 1 : 0.3,
                ...globalStyles.button,
              }}
            >
              <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                Sell
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <ModalQuestion 
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      title={modalTitle}
      selectedItems={selectedItems}
      action={'Equip Gear!'}
      setBannerVisible={setBannerVisible}
      setBannerText={setBannerText}
      heroId={heroId}
      handleRender={handleRender}/>
      <Banner hideDialog={hideDialog} visible={bannerVisible} text={bannerText}/>

      </View>
  );
};