import { useEffect, useState, useCallback } from "react"
import { CharacterGearApi } from "../utils/api.service";
import { View, StyleSheet, Text, ScrollView, RefreshControl } from "react-native";
import { globalStyles } from "../utils/styles";
import { wait } from "../utils/constants";


export const MyGear = ({route}) => {
    const { heroId } = route.params;
    const [gear, setGear] = useState();
    const [refreshing, setRefreshing] = useState(false);
    
    useEffect(() =>{
        fetchGear();
}, [heroId])
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
        backgroundColor: 'rgba(16,36,69,0.95)',
        borderRadius: 15
      },
  });
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchGear();
    wait(2000).then(() => setRefreshing(false));
  }, []);
const fetchGear = async () =>{
    const getGear = await CharacterGearApi.Get(heroId);
}
return(
    <ScrollView contentContainerStyle={styles.body} refreshControl={
        <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
        }>
        <View style={styles.container}>
            <Text style={{...styles.welcomeStyle, ...globalStyles.textStyle}}>Hi {heroId}</Text>
        </View>
    </ScrollView>
)
}