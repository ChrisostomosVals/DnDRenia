import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, RefreshControl, Image, ScrollView } from "react-native";
import { MainStats } from "../components/mainStats";
import { CharacterApi, CharacterMainStatsApi } from "../utils/api.service";
import { globalStyles } from "../utils/styles";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { wait } from "../utils/constants";

export const Index = (props) => {
  const isFocused = useIsFocused();
  const [hero, setHero] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchHero();
  }, [isFocused]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHero();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const styles = StyleSheet.create({
    body: {
      flex: 1,
    },
    hidden: {
      flex: 1,
    },
    header: {
      flex: 2,
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto",
      
    },
    stats: {
      flex: 5,
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    welcomeStyle: {
      borderRadius: 5,
      fontSize: 30,
      color: 'white',
      textAlign: "center",
      backgroundColor: 'rgba(16,36,69,0.95)',
      borderRadius: 15
    },
    scrollView: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
    equipment:{
      flex: 2,
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    equipmentIcons:{

    }
  });

  const fetchHero = async () => {
    const id = await AsyncStorage.getItem("heroId");
    const fetchHero = await CharacterApi.GetById(id);
    let mainStatsInit = {
      characterId: id,
      strength: 0,
      dexterity: 0,
      constitution: 0,
      wisdom: 0,
      charisma: 0,
      intelligence: 0,
      level: 0,
      healthPoints: 0
    } 
    const mainStats = await CharacterMainStatsApi.GetById(id);
    if(mainStats){
      mainStatsInit = mainStats;
    }
    if (fetchHero) {
      setHero({hero: fetchHero, mainStatsInit});
    }
  };
  const navigateToPage = (page, id) =>{
    props.navigation.navigate(page, {heroId: id})
  }
  return (
    <ScrollView contentContainerStyle={styles.body} refreshControl={
      <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
     
      {hero && (
        <>
          <View style={styles.hidden}></View>
          <View style={styles.header}>
            <Text style={{...styles.welcomeStyle, ...globalStyles.textStyle}}>{hero.hero.name}</Text>
            <View style={styles.equipment}>
            <View style={globalStyles.card}>
              <TouchableOpacity onPress={() => navigateToPage('MyGear', hero.hero.id)}>
            <Image source={require('../assets/images/Rucksack_80px.png')} />
            </TouchableOpacity>
             </View>
              <View style={globalStyles.card}>
              <Image source={require('../assets/images/arsenal.png')} />

              </View>
            </View>
          </View>
          <View style={styles.stats}>
            <MainStats stats={hero.mainStatsInit} />
          </View>
        </>
      )}
      </ScrollView>
  );
};