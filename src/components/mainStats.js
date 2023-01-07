import { Card } from "@rneui/base";
import { View, StyleSheet, Text, Image } from "react-native";
import { globalStyles } from "../utils/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import { useEffect, useState } from "react";
import { ControlledTooltip } from "../utils/controllerToolTip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CharacterMainStatsApi } from "../utils/api.service";
import { Banner } from "./banner";

export const MainStats = ({ stats }) => {
  const [heroStats, setStats] = useState({
    characterId: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    wisdom: 0,
    charisma: 0,
    intelligence: 0,
    level: 0,
    healthPoints: 0,
  });
  const [visible, setVisible] = useState(false)
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(null);
  const [paragraph, setParagraph] = useState(null);

  useEffect(() => {
    setStats(stats);
  }, [stats]);

  const styles = StyleSheet.create({
    thumb: {
      borderRadius: 15,
    },
    track: {
      borderRadius: 5,
      height: 10,
      backgroundColor: "#d0d0d0",
    },
    card: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      marginTop: 0,
      paddingBottom: 20,
    },
    container: {
    },
    rowContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      
    },
  });

  const handleEdit = async() => {
    setEdit(!edit);
    const playerStats = await CharacterMainStatsApi.GetById(heroStats.characterId);
    setStats(playerStats);
  };
  const hideDialog = () => setVisible(false);
  const handleSave = async () =>{
    let characterId = await AsyncStorage.getItem('heroId');
    setStats({ ...heroStats, characterId: characterId });
    const playerStats = await CharacterMainStatsApi.GetById(heroStats.characterId);
    if(!playerStats){
      const createStats = await CharacterMainStatsApi.Create(heroStats)
      if(!createStats){
        setTitle('Stats Created')
        setParagraph('Your Stats have been Saved!')
        setVisible(true);
      }
      else{
        setTitle('Error Occurred')
        setParagraph('Your Stats could not been Saved!')
        setVisible(true);
      }
    }
    else{
      const updateStats = await CharacterMainStatsApi.Update(heroStats)
      if(!updateStats){
        setTitle('Stats Updated')
        setParagraph('Your Stats have been Saved!')
        setVisible(true);
      }
      else{
        setTitle('Error Occurred')
        setParagraph('Your Stats could not been Saved!')
        setVisible(true);
    }
    }
  }
  return (
    <View style={styles.container}>
      <Card containerStyle={{ ...globalStyles.card, ...styles.card }}>
      <View style={styles.header}>
        {edit ? (
          <>
            <MaterialCommunityIcons
              onPress={handleEdit}
              name="lock-open"
              size={30}
              color='white'
            />
            <MaterialCommunityIcons name="content-save" color='white' onPress={handleSave} size={30} />
            </>) : (
              <MaterialCommunityIcons onPress={handleEdit} name="lock" color='#DAA520' size={30} />
              )}
              </View>

        <Card.Title h4>
          <Text style={globalStyles.textStyle}>Your Stats</Text>
        </Card.Title>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Strength</Text>}
          >
            <Image source={require("../assets/images/muscle_20px.png")} />
          </ControlledTooltip>
          <Text>{heroStats.strength}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${heroStats.strength * 2 * 2.55},${
              255 / heroStats.strength
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.strength * 2 * 2.55},${
                255 / (heroStats.strength + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setStats({ ...heroStats, strength: parseInt(e[0]) })
            }
            value={heroStats.strength}
            disabled={!edit}
          />
        </View>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Max HP</Text>}
          >
            <MaterialCommunityIcons name="heart" size={20} color="red" />
          </ControlledTooltip>
          <Text>{heroStats.healthPoints}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${heroStats.healthPoints * 2 * 2.55},${
              255 / heroStats.healthPoints
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.healthPoints * 2 * 2.55},${
                255 / (heroStats.healthPoints + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setStats({ ...heroStats, healthPoints: parseInt(e[0]) })
            }
            value={heroStats.healthPoints}
            disabled={!edit}
          />
        </View>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Dexterity</Text>}
          >
            <Image source={require("../assets/images/Acrobatics_20px.png")} />
          </ControlledTooltip>
          <Text>{heroStats.dexterity}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${heroStats.dexterity * 2 * 2.55},${
              255 / heroStats.dexterity
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.dexterity * 2 * 2.55},${
                255 / (heroStats.dexterity + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setStats({ ...heroStats, dexterity: parseInt(e[0]) })
            }
            value={heroStats.dexterity}
            disabled={!edit}
          />
        </View>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Constitution</Text>}
          >
            <Image source={require("../assets/images/heart_plus_20px.png")} />
          </ControlledTooltip>
          <Text>{heroStats.constitution}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${heroStats.constitution * 2 * 2.55},${
              255 / heroStats.constitution
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.constitution * 2 * 2.55},${
                255 / (heroStats.constitution + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setStats({ ...heroStats, constitution: parseInt(e[0]) })
            }
            value={heroStats.constitution}
            disabled={!edit}
          />
        </View>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Wisdom</Text>}
          >
            <Image source={require("../assets/images/owl_20px.png")} />
          </ControlledTooltip>
          <Text>{heroStats.wisdom}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${heroStats.wisdom * 2 * 2.55},${
              255 / heroStats.wisdom
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.wisdom * 2 * 2.55},${
                255 / (heroStats.wisdom + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setStats({ ...heroStats, wisdom: parseInt(e[0]) })
            }
            value={heroStats.wisdom}
            disabled={!edit}
          />
        </View>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Charisma</Text>}
          >
            <Image source={require("../assets/images/theatre_mask_20px.png")} />
          </ControlledTooltip>
          <Text>{heroStats.charisma}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${heroStats.charisma * 2 * 2.55},${
              255 / heroStats.charisma
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.charisma * 2 * 2.55},${
                255 / (heroStats.charisma + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setStats({ ...heroStats, charisma: parseInt(e[0]) })
            }
            value={heroStats.charisma}
            disabled={!edit}
          />
        </View>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Intelligence</Text>}
          >
            <Image source={require("../assets/images/intelligence_20px.png")} />
          </ControlledTooltip>
          <Text>{heroStats.intelligence}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${heroStats.intelligence * 2 * 2.55},${
              255 / heroStats.intelligence
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.intelligence * 2 * 2.55},${
                255 / (heroStats.intelligence + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setStats({ ...heroStats, intelligence: parseInt(e[0]) })
            }
            value={heroStats.intelligence}
            disabled={!edit}
          />
        </View>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Level</Text>}
          >
            <MaterialCommunityIcons
              name="account-star"
              size={20}
              color="#DAA520"
            />
          </ControlledTooltip>
          <Text>{heroStats.level}</Text>
          <Slider
            animateTransitions
            maximumValue={20}
            minimumTrackTintColor={`rgb(${heroStats.level * 5 * 2.55},${
              255 / heroStats.level
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.level * 5 * 2.55},${
                255 / (heroStats.level + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setStats({ ...heroStats, level: parseInt(e[0]) })
            }
            value={heroStats.level}
            disabled={!edit}
          />
        </View>
      </Card>
      {
        title != null && paragraph != null &&
        <Banner hideDialog={hideDialog} visible={visible} text={{title: title, paragraph:paragraph}}/>

      }
      
    </View>
  );
};
