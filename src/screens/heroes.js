import React from 'react';
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { CharacterApi } from "../utils/api.service";
import { List } from "react-native-paper";
import { Card } from "@rneui/base";
import { globalStyles } from "../utils/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

export const Heroes = ({navigation}) => {
  const isFocused = useIsFocused();
  const [heroes, setHeroes] = useState([]);
  useEffect(() => {
    CharacterApi.Get().then(res => {
      if(res){
       return setHeroes(res)
      }
      return setHeroes([])
    });
  }, [isFocused]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
  
  });
  const navigateToInfo = (id) =>{
    navigation.navigate('CharacterInfo', {characterId: id})
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={{ width: "80%", ...globalStyles.card}}>
        <List.Section style={styles.list}>
          <View style={styles.header}>
            <List.Subheader style={{...globalStyles.textStyle, fontSize: 25}}>Heroes</List.Subheader>
          </View>
          <View style={styles.items}>
            {heroes.length > 0 &&
              heroes.map((h) => (
                <List.Item 
                titleStyle={globalStyles.textStyle} 
                descriptionStyle={{...globalStyles.textStyle, color: 'gray'}}
                title={h.name} 
                description={h.type} 
                key={h.id} 
                right={props =><MaterialCommunityIcons
                  name="information-outline"
                  size={20}
                  color="orange"
                />}
                onPress={() => navigateToInfo(h.id)}/>
              ))}
          </View>
        </List.Section>
      </Card>
    </View>
  );
};


