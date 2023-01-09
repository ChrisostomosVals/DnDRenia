import { useEffect, useState, useCallback } from "react";
import { CharacterGearApi } from "../utils/api.service";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { globalStyles } from "../utils/styles";
import { wait } from "../utils/constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export const MyGear = ({ route }) => {
  const { heroId } = route.params;
  const [gear, setGear] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [money, setMoney] = useState({});
  useEffect(() => {
    fetchGear();
  }, [heroId]);
  const styles = StyleSheet.create({
    body: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    welcomeStyle: {
      borderRadius: 5,
      fontSize: 30,
      textAlign: "center",
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
    },
    money:{
        backgroundColor: "rgba(16,36,69,0.95)",
        borderRadius: 15,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "space-evenly",
    }
  });
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchGear();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const fetchGear = async () => {
    const getGear = await CharacterGearApi.Get(heroId);
    setGear(getGear);
    const heroMoney = getGear.filter(g => g.name === 'GOLD' || g.name === 'SILVER' || g.name === 'COPPER').map(g => {
        if(g.name === 'GOLD'){
            return {id: g.id, gold: g.quantity}
        }
        else if(g.name === 'SILVER'){
            return {id: g.id, silver: g.quantity}
        }
        else if(g.name === 'COPPER'){
            return {id: g.id, copper: g.quantity}
        }
    });
    setMoney(heroMoney)
    
  };
  return (
    <ScrollView
      contentContainerStyle={styles.body}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={{ ...styles.welcomeStyle, ...globalStyles.textStyle }}>
          Your Gear
        </Text>
        {gear && money.length > 0 && gear.length > 0 && (
          <View>
            <View style={styles.money}>
            <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                 Money:{money.map(m => {
                    if(m.gold){
                        return (<>{m.gold} <FontAwesome5 name="coins" color="gold" /></>)
                    }
                    else if(m.silver){
                        return (<>{m.silver} <FontAwesome5 name="coins" color="silver" /></>)
                    }
                    else if(m.copper){
                        return (<>{m.copper} <FontAwesome5 name="coins" color="copper" /></>)
                    }
                 })}
               
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
