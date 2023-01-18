import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../utils/styles";
import { Card } from "@rneui/base";
import { useState, useEffect } from "react";
import { CharacterApi, CharacterMainStatsApi, ClassApi, RaceApi } from "../utils/api.service";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ScrollView } from "react-native-gesture-handler";

export const CharacterInfo = ({ route }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState({});
  useEffect(() => {
    fetchCharacter();
  }, [route]);
  const fetchCharacter = async () => {
    const getCharacter = await CharacterApi.GetById(characterId);
    const characterClass = await ClassApi.GetById(getCharacter.classId);
    const characterRace = await RaceApi.GetById(getCharacter.raceId);
    setCharacter({...getCharacter, raceName: characterRace.name, className: characterClass.name});
    
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
      <Card containerStyle={{ width: "80%",height: '50%', ...globalStyles.card }}>
        {character.raceName && (
          <>
            <Card.Title h4><Text  style={globalStyles.textStyle}>{character.type}</Text></Card.Title>
          <ScrollView style={{flexGrow: 0.85}}>
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
                <MaterialCommunityIcons name={`gender-${character.gender.toLowerCase()}`} size={20} color={styles.textStyle().color} />
                
              </View>
              }
              
              {(!character.scheme || character.scheme.age) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Age:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.age}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.level) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Level:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.level}</Text>
              </View>
              }
               {(!character.scheme || character.scheme.strength) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Strength:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.strength}</Text>
              </View>
              }
               {(!character.scheme || character.scheme.dexterity) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Dexterity:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.dexterity}</Text>
              </View>
              }
               {(!character.scheme || character.scheme.intelligence) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Intelligence:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.intelligence}</Text>
              </View>
              }
               {(!character.scheme || character.scheme.constitution) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Constitution:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.constitution}</Text>
              </View>
              }
               {(!character.scheme || character.scheme.wisdom) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Wisdom:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.wisdom}</Text>
              </View>
              }
               {(!character.scheme || character.scheme.charisma) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Charisma:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.charisma}</Text>
              </View>
              }
               {(!character.scheme || character.scheme.armorClass) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Armor Class:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.armorClass}</Text>
              </View>
              }
               {(!character.scheme || character.scheme.fortitude) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Fortitude:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.fortitude}</Text>
              </View>
              }
               {(!character.scheme || character.scheme.reflex) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Reflex:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.reflex}</Text>
              </View>
              }
               {(!character.scheme || character.scheme.will) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Will:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.will}</Text>
              </View>
              }
               {(!character.scheme || character.scheme.baseAttackBonus) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Base Attack Bonus:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.baseAttackBonus}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.spellResistance) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Spell Resistance:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.spellResistance}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.maxHp) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Max HP:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.maxHp}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.currentHp) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Current HP:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.currentHp}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.speed) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Speed:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.speed}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.hair) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Hair:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.hair}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.eyes) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Eyes:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.eyes}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.fly) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Fly:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.fly}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.swim) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Swim:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.swim}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.climb) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Climb:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.climb}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.burrow) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Burrow:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.burrow}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.touch) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Touch:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.touch}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.flatFooted) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Flat Footed:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.flatFooted}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.homeland) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Homeland:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.homeland}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.deity) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Deity:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.deity}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.height) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Height:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.height}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.weight) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Weight:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.weight}</Text>
              </View>
              }
              {(!character.scheme || character.scheme.experience) && 
                <View style={styles.rowContainer}>
                <Text style={{...globalStyles.textStyle, color: '#CD853F', fontSize: 20}}>Experience:</Text>
                <Text style={{...globalStyles.textStyle, ...styles.textStyle()}}>{character.experience}</Text>
              </View>
              }
            </View>
          </ScrollView>
          </>
           )}
      </Card>
    </View>
  );
};


