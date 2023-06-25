import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, RefreshControl, Image, Switch } from "react-native";
import { MainStats } from "../components/mainStats";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import CharacterApi from "../dist/api/CharacterApi";
import { globalStyles } from "../utils/styles";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { wait } from "../utils/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ip } from "../utils/constants";
import { Skills } from "../components/skills";
import { ScrollView } from "react-native-gesture-handler";


export const Index = (props: any) => {
  const isFocused = useIsFocused();
  const [hero, setHero] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleData, setVisibleData] = useState('mainStats')
  useEffect(() => {
    fetchHero();
    setVisibleData('mainStats')
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
      // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
      borderRadius: 15
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
    const token = await AsyncStorage.getItem("token");
    const fetchHero = await CharacterApi.GetByIdAsync(token, ip, id);
    if (fetchHero.isError) {
      console.log(fetchHero.error)
      setHero(null)
    }
    else{
      setHero(fetchHero.data);
    }
  };
  const navigateToPage = (page: any, id: any) =>{
    props.navigation.navigate(page, {heroId: id})
  }
  const toggleSwitch = () => {
    visibleData === 'mainStats' ?
    setVisibleData('skills')
    : setVisibleData('mainStats');
  };
  return (
    <>
     <MaterialCommunityIcons
            name="logout"
            size={30}
            style={{ position: "absolute", right: 20, top: 40, zIndex: 100 }}
            onPress={() => props.navigation.dispatch(props.route.params.setLogoutModalVisible(true))}
          />
    <ScrollView scrollEnabled={true} contentContainerStyle={styles.body} refreshControl={
      <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
     
      {hero && (
        <>
          <View style={styles.hidden}></View>
          <View style={styles.header}>
            // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
            <Text style={{...styles.welcomeStyle, ...globalStyles.textStyle}}>{hero.name}</Text>
            <View style={styles.equipment}>
            <View style={globalStyles.card}>
              // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
              <TouchableOpacity onPress={() => navigateToPage('MyGear', hero.id)}>
            <Image source={require('../assets/images/Rucksack_80px.png')} />
            </TouchableOpacity>
             </View>
             <View style={globalStyles.card}>
             // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
             <TouchableOpacity onPress={() => navigateToPage('MyProperties', hero.id)}>
             <MaterialCommunityIcons
                name="account"
                size={80}
                color='white'
            />
            </TouchableOpacity>
             </View>
             // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
             <TouchableOpacity onPress={() => navigateToPage('MyArsenal', hero.id)}>

              <View style={globalStyles.card}>
              <Image source={require('../assets/images/arsenal.png')} />

              </View>
            </TouchableOpacity>
            </View>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={visibleData === 'mainStats' ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={visibleData === 'mainStats'}
            style={{ alignSelf: 'center' }}
          />
          <View style={styles.stats}>
            {visibleData === 'mainStats' &&
              // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
              <MainStats hero={{id: hero.id, stats: hero.stats}} />
            }
            {visibleData === 'skills' &&
              // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
              <Skills hero={{id: hero.id}}/>
            }
          </View>
        </>
      )}
      </ScrollView>
      </>
  );
};
