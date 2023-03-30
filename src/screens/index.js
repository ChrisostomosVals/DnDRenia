import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, RefreshControl, Image, Switch } from "react-native";
import { MainStats } from "../components/mainStats";
import CharacterApi from "../dist/api/CharacterApi";
import { globalStyles } from "../utils/styles";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { wait } from "../utils/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ip } from "../utils/constants";
import { Skills } from "../components/skills";
import { ScrollView } from "react-native-gesture-handler";


export const Index = (props) => {
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
  const navigateToPage = (page, id) =>{
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
            <Text style={{...styles.welcomeStyle, ...globalStyles.textStyle}}>{hero.name}</Text>
            <View style={styles.equipment}>
            <View style={globalStyles.card}>
              <TouchableOpacity onPress={() => navigateToPage('MyGear', hero.id)}>
            <Image source={require('../assets/images/Rucksack_80px.png')} />
            </TouchableOpacity>
             </View>
             <View style={globalStyles.card}>
             <TouchableOpacity onPress={() => navigateToPage('MyProperties', hero.id)}>
             <MaterialCommunityIcons
                name="account"
                size={80}
                color='white'
            />
            </TouchableOpacity>
             </View>
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
              <MainStats hero={{id: hero.id, stats: hero.stats}} />
            }
            {visibleData === 'skills' &&
              <Skills hero={{id: hero.id}}/>
            }
          </View>
        </>
      )}
      </ScrollView>
      </>
  );
};
