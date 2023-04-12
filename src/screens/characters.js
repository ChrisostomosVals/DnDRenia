import React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CharacterApi from "../dist/api/CharacterApi";
import { List } from "react-native-paper";
import { Card } from "@rneui/base";
import { globalStyles } from "../utils/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "../utils/constants";

export const Characters = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [characters, setCharacters] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(1);
  const [title, setTitle] = useState("HEROES");
  const categories = [
    { label: "HEROES", value: 1, type: "hero" },
    { label: "NPCS", value: 2, type: "npc" },
    { label: "MONSTERS", value: 3, type: "hostile" },
    { label: "BOSSES", value: 4, type: "boss" },
  ];
  useEffect(() => {
    fetchHeroes();
    setTitle("HEROES");
    setCategory(1);
  }, [isFocused, navigation]);

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      height: "80%",
    },
    dropDownStyle: {
      backgroundColor: "#102445",
    },
    emptyListText:{
      textAlign: "center",
      ...globalStyles.textStyle,
    },
    pageText: {
      fontSize: 30,
      textAlign: "center",
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
      ...globalStyles.textStyle,
    },
    dropDownContainer: {
      marginTop: "40%",
      zIndex: 7
    },
    body: {
      justifyContent: "space-around",
    },
    scroll: {
      flexGrow: 0.85,
    },
    scrollItems: {},
  });
  const fetchHeroes = async () => {
    const token = await AsyncStorage.getItem("token");
    const heroes = await CharacterApi.GetAsync(token, ip, "hero");
    if (heroes.isError) {
      console.log(heroes.error);
      setCharacters([]);
      return;
    }
    setCharacters(heroes.data);
  };
  const fetchCharacters = async (e) => {
    const token = await AsyncStorage.getItem("token");
    const fetchHeroes = await CharacterApi.GetAsync(token, ip, e.type);
    if(fetchHeroes.isError){
      console.log(fetchHeroes.error);
      setCharacters([]);
      return;
    }
    setTitle(e.label);
    setCharacters(fetchHeroes.data);
  };
  const navigateToInfo = (id) => {
    navigation.navigate("CharacterInfo", { characterId: id, navigation: navigation });
  };

  return (
    <View style={styles.body}>
      <View style={styles.dropDownContainer}>
        <DropDownPicker
          placeholder="Select Category"
          onSelectItem={fetchCharacters}
          open={open}
          textStyle={styles.pageText}
          arrowIconStyle={{ backgroundColor: "#DAA520", borderRadius: 25 }}
          selectedItemContainerStyle={{ backgroundColor: "#DAA520" }}
          value={category}
          setValue={(e) => setCategory(e)}
          setOpen={(thisOpen) => setOpen(thisOpen)}
          items={categories}
          style={styles.dropDownStyle}
          closeOnBackPressed
          itemSeparator={true}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
        />
      </View>
      <View style={styles.container}>
        <Card
          containerStyle={{
            width: "80%",
            maxHeight: "70%",
            minHeight: '40%',
            ...globalStyles.card
          }}
        >
          <List.Section style={styles.list}>
            <List.Subheader
              style={{
                ...globalStyles.textStyle,
                fontSize: 25,
                textAlign: "center",
              }}
            >
              {title}
            </List.Subheader>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollItems}
              centerContent={true}
            >
              {characters.length > 0 ?
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
                )):
                (<Text style={styles.emptyListText}>There are no {title} yet!</Text>)}
            </ScrollView>
          </List.Section>
        </Card>
      </View>
    </View>
  );
};
