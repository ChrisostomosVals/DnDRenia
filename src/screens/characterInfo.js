import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../utils/styles";
import { Card } from "@rneui/base";
import { useState, useEffect } from "react";
import { CharacterApi, CharacterMainStatsApi, ClassApi, RaceApi } from "../utils/api.service";
import { MaterialCommunityIcons } from '@expo/vector-icons'

export const CharacterInfo = ({ route }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState({});
  useEffect(() => {
    fetchCharacter();
  }, [route]);
  const fetchCharacter = async () => {
    const getCharacter = await CharacterApi.GetById(characterId);
    const characterMainStats = await CharacterMainStatsApi.GetById(characterId);
    const characterClass = await ClassApi.GetById(getCharacter.classId);
    const characterRace = await RaceApi.GetById(getCharacter.raceId);
    setCharacter({
      id: getCharacter.id,
      className: characterClass.name,
      name: getCharacter.name,
      type: getCharacter.type,
      raceName: characterRace.name,
      gender: getCharacter.gender,
      level: characterMainStats.level
    });
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    info: {
      justifyContent: 'space-around',
      alignSelf: 'center',
      width: '80%'
    },
    rowContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10
    },
    textStyle:() =>{
      let color

      switch(character.raceName){
        case 'Half-Orcs':
          color='#6B8E23'
          break;
        case 'Humans':
          color='#DAA520'
          break;
        default:
          color='white'
          break;
      }
      return(
        {
          alignItems: 'flex-end',
          fontSize: 20,
          color: color}
      )
    },
    
  });
  return (
    <View style={styles.container}>
      <Card containerStyle={{ width: "80%", ...globalStyles.card }}>
        {character.raceName && (
          <>
            <Card.Title h4><Text  style={globalStyles.textStyle}>{character.type}</Text></Card.Title>
            <View style={styles.info}>
              <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Name:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.name}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Class:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.className}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Race:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.raceName.slice(0, -1)}</Text>
              </View>
              {
                character.gender &&
              <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Gender:</Text>
                <MaterialCommunityIcons name={`gender-${character.gender}`} size={20} color={styles.textStyle().color} />
                
              </View>
              }
              {
                character.type == 'HERO' &&
              <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Level:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.level}</Text>
              </View>
              }
              
            </View>
          </>
        )}
      </Card>
    </View>
  );
};


