import { useIsFocused } from "@react-navigation/native";
import { Banner } from "../components/banner";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import CharacterApi from "../dist/api/CharacterApi";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../utils/styles";
import { StyleSheet } from "react-native";
import { ip } from "../utils/constants";

export const MyArsenal = ({
  heroId,
  navigation
}: any) => {
  const isFocused = useIsFocused();
  const [arsenal, setArsenal] = useState([]);
  useEffect(() => {
    fetchArsenal();
  }, [heroId, isFocused]);
  const fetchArsenal = async () => {
    const token = await AsyncStorage.getItem("token");
    const getArsenal = await CharacterApi.GetArsenalAsync(token, ip, heroId);
    if (getArsenal.isError) {
      console.log(getArsenal.error, "myGear.fetchArsenal()");
      return;
    }

    for (let item of getArsenal.data) {
      const getGear = await CharacterApi.GetGearItemAsync(
        token,
        ip,
        heroId,
        item.gearId
      );
      if (getGear.isError) {
        console.log(getGear.error, "myGear.fetchArsenal()");
        break;
      }
      if (item.gearId === getGear.data.id) {
        item.name = getGear.data.name;
      }
    }
    setArsenal(getArsenal.data);
  };

  return (
    <View style={styles.body}>
      <View style={{flex: 0.2}}></View>

      {arsenal.length > 0 &&
        arsenal.map((item, index) => (
          // @ts-expect-error TS(2339): Property 'gearId' does not exist on type 'never'.
          <View style={styles.item} key={item.gearId + index}>
            // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
            <Text style={{...styles.text, fontSize: 30}}>{item.name}</Text>
            <View style={styles.row}>
                <Text style={styles.text}>Attack Bonus:</Text>
                // @ts-expect-error TS(2339): Property 'attackBonus' does not exist on type 'nev... Remove this comment to see the full error message
                <Text style={styles.text}>{item.attackBonus}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Damage:</Text>
                // @ts-expect-error TS(2339): Property 'damage' does not exist on type 'never'.
                <Text style={styles.text}>{item.damage}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Critical:</Text>
                // @ts-expect-error TS(2339): Property 'critical' does not exist on type 'never'... Remove this comment to see the full error message
                <Text style={styles.text}>{item.critical}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Range:</Text>
                // @ts-expect-error TS(2339): Property 'range' does not exist on type 'never'.
                <Text style={styles.text}>{item.range}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Type:</Text>
                // @ts-expect-error TS(2339): Property 'type' does not exist on type 'never'.
                <Text style={styles.text}>{item.type}</Text>
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  item: {
    ...globalStyles.card,
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    padding: 10
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text:{
    ...globalStyles.textStyle,
    textAlign: "center",
    fontSize: 20
  }
});
