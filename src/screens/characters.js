import React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { CharacterApi } from "../utils/api.service";
import { List } from "react-native-paper";
import { Card } from "@rneui/base";
import { globalStyles } from "../utils/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";

export const Characters = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [characters, setCharacters] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(1);
  const [title, setTitle] = useState("HEROES");
  const categories = [
    { label: "HEROES", value: 1 },
    { label: "NPCS", value: 2 },
    { label: "MONSTERS", value: 3 },
    { label: "BOSSES", value: 4 },
  ];
  useEffect(() => {
    CharacterApi.GetHeroes().then((res) => {
      if (res) {
        return setCharacters(res);
      }
      return setCharacters([]);
    });
    setTitle("HEROES")
    setCategory(1)
  }, [isFocused, navigation]);

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      height: '100%'
    },
    dropDownStyle: {
      backgroundColor: "#102445",
    },
    pageText: {
      fontSize: 30,
      textAlign: "center",
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
      ...globalStyles.textStyle,
    },
    dropDownContainer:{
      marginTop: '40%'
    },
    body:{
      justifyContent: 'space-around'
    },
    scroll:{
      flexGrow: 0.85,
    },
    scrollItems:{
    }
  });
  const fetchCharacters = async (e) => {
    switch (e.value) {
      default:
      case 1:
        const fetchHeroes = await CharacterApi.GetHeroes();
        setTitle(e.label)
        setCharacters(fetchHeroes);
        break;
      case 2:
        const fetchNpcs = await CharacterApi.GetNpcs();
        setTitle(e.label)
        setCharacters(fetchNpcs);
        break;
      case 3:
        const fetchMonsters = await CharacterApi.GetMonsters();
        setTitle(e.label)
        setCharacters(fetchMonsters);
        break;
      case 4:
        const fetchBosses = await CharacterApi.GetBosses();
        setTitle(e.label)
        setCharacters(fetchBosses);
        break;
    }
  };
  const navigateToInfo = (id) => {
    navigation.navigate("CharacterInfo", { characterId: id });
  };

  return (
    <View style={styles.body}>
    <View style={styles.dropDownContainer}>
    <DropDownPicker
        placeholder="Select Class Category"
        onSelectItem={fetchCharacters}
        open={open}
        textStyle={styles.pageText}
        arrowIconStyle={{ backgroundColor: "#DAA520", borderRadius: 25 }}
        selectedItemContainerStyle={{ backgroundColor: "#DAA520" }}
        value={category}
        setValue={(e) =>setCategory(e)}
        setOpen={(thisOpen) => setOpen(thisOpen)}
        items={categories}
        style={styles.dropDownStyle}
        closeOnBackPressed
        itemSeparator={true}
        zIndex={7}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
      />
      </View>
    <View style={styles.container}>
      
      <Card containerStyle={{ width: "80%", maxHeight: '70%', ...globalStyles.card }}>
        <List.Section style={styles.list}>
            <List.Subheader style={{ ...globalStyles.textStyle, fontSize: 25, textAlign: 'center' }}>
              {title}
            </List.Subheader>
          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollItems} centerContent={true}>
            {characters.length > 0 &&
              characters.map((h) => (
                <List.Item
                  titleStyle={globalStyles.textStyle}
                  descriptionStyle={{
                    ...globalStyles.textStyle,
                    color: "gray",
                  }}
                  title={h.name}
                  description={h.type}
                  key={h.id}
                  right={(props) => (
                    <MaterialCommunityIcons
                      name="information-outline"
                      size={20}
                      color="orange"
                    />
                  )}
                  onPress={() => navigateToInfo(h.id)}
                />
              ))}
          </ScrollView>
        </List.Section>
      </Card>
    </View>
    </View>
  );
};
