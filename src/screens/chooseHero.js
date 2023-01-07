import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { CharacterApi, ClassApi, RaceApi } from "../utils/api.service";
import { List } from "react-native-paper";
import { Card } from "@rneui/base";
import { globalStyles } from "../utils/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Banner } from "../components/banner";

export const ChooseHero = ({ navigation }) => {
  const [heroes, setHeroes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [equippedHero, setEquippedHero] = useState("");
  useEffect(() => {
    fetchHeroes();
  }, []);

  const fetchHeroes = async () => {
    const getHeroes = await CharacterApi.GetHeroes();
    const classes = await ClassApi.Get();
    const races = await RaceApi.Get();
    let heroesState = [];
    for (let hero of getHeroes) {
      classes.map((c) => {
        if (c.id === hero.classId) {
          return (hero.className = c.name);
        }
      });
      races.map((c) => {
        if (c.id === hero.raceId) {
          return (hero.raceName = c.name.slice(0, -1));
        }
      });
      heroesState.push(hero);
    }
    setHeroes(heroesState);
  };
  const equipHero = async (id, name) => {
    await AsyncStorage.setItem("heroId", id);
    setEquippedHero(name);
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);
  return (
    <View style={styles.container}>
      <Card containerStyle={{ width: "80%", ...globalStyles.card }}>
        <List.Section style={styles.list}>
          <View style={styles.header}>
            <List.Subheader style={{...globalStyles.textStyle, fontSize: 20}}>Equip Your Hero</List.Subheader>
          </View>
          <View style={styles.items}>
            {heroes.length > 0 &&
              heroes.map((h) => (
                <List.Item
                titleStyle={globalStyles.textStyle} 
                descriptionStyle={{...globalStyles.textStyle, color: 'gray'}}
                  title={h.name}
                  description={`${h.raceName} | ${h.className}`}
                  key={h.id}
                  right={(props) => (
                    <MaterialCommunityIcons
                      name="sword"
                      size={20}
                      color="orange"
                    />
                  )}
                  onPress={() => equipHero(h.id, h.name)}
                />
              ))}
          </View>
        </List.Section>
      </Card>
      {equippedHero != "" && (
        <Banner visible={visible} text={{title: 'Hero Equipped', paragraph:`Welcome ${equippedHero}!`}} hideDialog={hideDialog}/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
