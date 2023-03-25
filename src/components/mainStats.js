import { Card } from "@rneui/base";
import { View, StyleSheet, Text, Image, TextInput } from "react-native";
import { globalStyles } from "../utils/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import { useEffect, useState } from "react";
import { ControlledTooltip } from "../utils/controllerToolTip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CharacterApi from "../dist/api/CharacterApi";
import { Banner } from "./banner";
import IonIcon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import { ip } from "../utils/constants";

export const MainStats = ({ hero }) => {
  const [heroStats, setHeroStats] = useState();
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(null);
  const [paragraph, setParagraph] = useState(null);
  const xpArray = [
    0, 3000, 7500, 14000, 23000, 35000, 53000, 77000, 115000, 160000, 235000, 330000, 475000, 665000, 955000, 1350000, 1900000, 2700000, 3850000, 5350000
  ];
  const [propsShown, setPropsShown] = useState({
    strength: 0,
    maxHp: 0,
    currentHp: 0,
    dexterity: 0,
    constitution: 0,
    wisdom: 0,
    charisma: 0,
    intelligence: 0,
    level: 0,
    armorClass: 0,
    speed: 0,
    baseAttackBonus: 0,
    experience: 0
  })
  useEffect(() => {
    fetchStats();
    setEdit(false);
  }, [hero]);
  const renderedStats = [
    "Strength",
    "Max HP",
    "Current HP",
    "Dexterity",
    "Constitution",
    "Wisdom",
    "Charisma",
    "Intelligence",
    "Level",
    "Armor Class",
    "Speed",
    "Base Attack Bonus",
    "Experience"
  ];
  const fetchStats = async () => {
    setHeroStats(hero);
    for(let item of hero.stats){
      if((isNaN(item.value) || item.value === "-") && renderedStats.includes(item.name)) item.value = 0;
    }
    setPropsShown({
      strength: hero.stats.find(s => s.name === "Strength").value,
      maxHp: hero.stats.find(s => s.name === "Max HP").value,
      currentHp: hero.stats.find(s => s.name === "Current HP").value,
      dexterity: hero.stats.find(s => s.name === "Dexterity").value,
      constitution: hero.stats.find(s => s.name === "Constitution").value,
      wisdom: hero.stats.find(s => s.name === "Wisdom").value,
      charisma: hero.stats.find(s => s.name === "Charisma").value,
      intelligence: hero.stats.find(s => s.name === "Intelligence").value,
      level: hero.stats.find(s => s.name === "Level").value,
      armorClass: hero.stats.find(s => s.name === "Armor Class").value,
      speed: hero.stats.find(s => s.name === "Speed").value,
      baseAttackBonus: hero.stats.find(s => s.name === "Base Attack Bonus").value,
      experience: hero.stats.find(s => s.name === "Experience").value
    })
  };
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
      alignItems: "center",
      paddingBottom: 20,
      height: '95%'
    },
    container: {},
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

  const handleEdit = async () => {
    setEdit(!edit);
    const token = await AsyncStorage.getItem("token");
    const playerStats = await CharacterApi.GetStatsAsync(token, ip, heroStats.id);
    if(playerStats.isError){
      console.log(playerStats.error)
      return;
    }
    for(let item of playerStats.data){
      if((isNaN(item.value) || item.value === "-") && renderedStats.includes(item.name)) item.value = 0;
    }
    setHeroStats({id: heroStats.id, stats: playerStats.data});
    setPropsShown({
      strength: playerStats.data.find(s => s.name === "Strength").value,
      maxHp: playerStats.data.find(s => s.name === "Max HP").value,
      currentHp: playerStats.data.find(s => s.name === "Current HP").value,
      dexterity: playerStats.data.find(s => s.name === "Dexterity").value,
      constitution: playerStats.data.find(s => s.name === "Constitution").value,
      wisdom: playerStats.data.find(s => s.name === "Wisdom").value,
      charisma: playerStats.data.find(s => s.name === "Charisma").value,
      intelligence: playerStats.data.find(s => s.name === "Intelligence").value,
      level: playerStats.data.find(s => s.name === "Level").value,
      armorClass: playerStats.data.find(s => s.name === "Armor Class").value,
      speed: playerStats.data.find(s => s.name === "Speed").value,
      baseAttackBonus: playerStats.data.find(s => s.name === "Base Attack Bonus").value,
      experience: playerStats.data.find(s => s.name === "Experience").value
    })
  };
  const hideDialog = () => setVisible(false);
  const handleSave = async () => {
    const token = await AsyncStorage.getItem("token");
    setHeroStats(s => {
      s.stats.forEach(c => {
        Object.keys(propsShown).forEach(p => {
          if(p.toUpperCase() == c.name.toUpperCase().replace(/\s/g,'')){
            c.value = propsShown[p].toString();
          }
        })
          
      })
      return s;
    });
    const update = {
      id: heroStats.id,
      updateDefinition: heroStats.stats
    }
    const updateStats = await CharacterApi.UpdateStatsAsync(token, ip, update);
    if (updateStats.isError) {
      console.log(updateStats.error, "mainStats.updateStats")
      setTitle("Error Occurred");
      setParagraph("Your Stats could not been Saved!");
      setVisible(true);
    } else {
      setTitle("Stats Updated");
      setParagraph("Your Stats have been Saved!");
      setVisible(true);
    }
  };

  if(!heroStats) return(<View><Text style={globalStyles.textStyle}>Loading...</Text></View>);
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
                color="white"
              />
              <MaterialCommunityIcons
                name="content-save"
                color="white"
                onPress={handleSave}
                size={30}
              />
            </>
          ) : (
            <MaterialCommunityIcons
              onPress={handleEdit}
              name="lock"
              color="#DAA520"
              size={30}
            />
          )}
        </View>

        <Card.Title h4>
          <Text style={globalStyles.textStyle}>Your Stats</Text>
        </Card.Title>
        <ScrollView>
        <View style={styles.rowContainer}>
        <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Strength</Text>}
          >
            <Image source={require("../assets/images/strength_20px.png")} />
          </ControlledTooltip>
          <Text style={globalStyles.textStyle}>{propsShown.strength}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${propsShown.strength * 2 * 2.55},${
              255 / propsShown.strength
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${propsShown.strength * 2 * 2.55},${
                255 / (propsShown.strength + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setPropsShown({ ...propsShown, strength: parseInt(e[0]) })
            }
            value={propsShown.strength}
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
          <Text style={globalStyles.textStyle}>{propsShown.maxHp}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${propsShown.maxHp * 2 * 2.55},${
              255 / propsShown.maxHp
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${propsShown.maxHp * 2 * 2.55},${
                255 / (propsShown.maxHp + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setPropsShown({ ...propsShown, maxHp: parseInt(e[0]) })
            }
            value={propsShown.maxHp}
            disabled={!edit}
          />
        </View>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Current HP</Text>}
          >
            <IonIcon name="heart-dislike" size={20} color="gray" />
          </ControlledTooltip>
          <Text style={globalStyles.textStyle}>{propsShown.currentHp}</Text>
          <Slider
            animateTransitions
            maximumValue={propsShown.maxHp}
            minimumValue={-propsShown.maxHp}
            minimumTrackTintColor={`rgb(${propsShown.currentHp/propsShown.maxHp * 100 * 2.55},${
              255 / propsShown.maxHp/propsShown.currentHp
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${propsShown.currentHp/propsShown.maxHp * 100 * 2.55},${
                255 / (propsShown.currentHp + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setPropsShown({ ...propsShown, currentHp: parseInt(e[0]) })
            }
            value={propsShown.currentHp}
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
          <Text style={globalStyles.textStyle}>{propsShown.dexterity}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${propsShown.dexterity * 2 * 2.55},${
              255 / propsShown.dexterity
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${propsShown.dexterity * 2 * 2.55},${
                255 / (propsShown.dexterity + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setPropsShown({ ...propsShown, dexterity: parseInt(e[0]) })
            }
            value={propsShown.dexterity}
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
          <Text style={globalStyles.textStyle}>{propsShown.constitution}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${propsShown.constitution * 2 * 2.55},${
              255 / propsShown.constitution
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${propsShown.constitution * 2 * 2.55},${
                255 / (propsShown.constitution + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setPropsShown({ ...propsShown, constitution: parseInt(e[0]) })
            }
            value={propsShown.constitution}
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
          <Text style={globalStyles.textStyle}>{propsShown.wisdom}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${propsShown.wisdom * 2 * 2.55},${
              255 / propsShown.wisdom
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${propsShown.wisdom * 2 * 2.55},${
                255 / (propsShown.wisdom + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setPropsShown({ ...propsShown, wisdom: parseInt(e[0]) })
            }
            value={propsShown.wisdom}
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
          <Text style={globalStyles.textStyle}>{propsShown.charisma}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${propsShown.charisma * 2 * 2.55},${
              255 / propsShown.charisma
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${propsShown.charisma * 2 * 2.55},${
                255 / (propsShown.charisma + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setPropsShown({ ...propsShown, charisma: parseInt(e[0]) })
            }
            value={propsShown.charisma}
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
          <Text style={globalStyles.textStyle}>{propsShown.intelligence}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${propsShown.intelligence * 2 * 2.55},${
              255 / propsShown.intelligence
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${propsShown.intelligence * 2 * 2.55},${
                255 / (propsShown.intelligence + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setPropsShown({ ...propsShown, intelligence: parseInt(e[0]) })
            }
            value={propsShown.intelligence}
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
          <Text style={globalStyles.textStyle}>{propsShown.level}</Text>
          <Slider
            animateTransitions
            maximumValue={20}
            minimumTrackTintColor={`rgb(${propsShown.level * 5 * 2.55},${
              255 / propsShown.level
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${propsShown.level * 5 * 2.55},${
                255 / (propsShown.level + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setPropsShown({ ...propsShown, level: parseInt(e[0]), experience: 0 })
            }
            value={propsShown.level}
            disabled={!edit}
          />
        </View>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Armor Class</Text>}
          >
             <IonIcon name="shield" size={20} color="#e8e7e9" />
          </ControlledTooltip>
          <Text style={globalStyles.textStyle}>{propsShown.armorClass}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${propsShown.armorClass * 5 * 2.55},${
              255 / propsShown.armorClass
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${propsShown.armorClass * 5 * 2.55},${
                255 / (propsShown.armorClass + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setPropsShown({ ...propsShown, armorClass: parseInt(e[0]) })
            }
            value={propsShown.armorClass}
            disabled={!edit}
          />
        </View>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Speed</Text>}
          >
             <MaterialCommunityIcons name="run-fast" size={20} color="#d77e56"/>
          </ControlledTooltip>
          <Text style={globalStyles.textStyle}>{propsShown.speed}</Text>
          <Slider
            animateTransitions
            maximumValue={100}
            minimumTrackTintColor={`rgb(${propsShown.speed * 2.55},${
              255 / propsShown.speed
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${propsShown.speed * 2.55},${
                255 / (propsShown.speed + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setPropsShown({ ...propsShown, speed: parseInt(e[0]) })
            }
            value={propsShown.speed}
            disabled={!edit}
          />
        </View>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Base Attack Bonus</Text>}
          >
             <Image source={require("../assets/images/attack_20px.png")} />
          </ControlledTooltip>
          <Text style={globalStyles.textStyle}>{propsShown.baseAttackBonus}</Text>
          <Slider
            animateTransitions
            maximumValue={20}
            minimumTrackTintColor={`rgb(${propsShown.baseAttackBonus * 5 * 2.55},${
              255 / propsShown.baseAttackBonus
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${propsShown.baseAttackBonus * 5 * 2.55},${
                255 / (propsShown.baseAttackBonus + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setPropsShown({ ...propsShown, baseAttackBonus: parseInt(e[0]) })
            }
            value={propsShown.baseAttackBonus}
            disabled={!edit}
          />
        </View>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Experience {propsShown.experience}</Text>}
          >
             <Image source={require("../assets/images/experience_skill_20px.png")} />
          </ControlledTooltip>
          <Slider
            animateTransitions
            maximumValue={xpArray[propsShown.level]}
            minimumTrackTintColor={`rgb(${propsShown.experience * (255/xpArray[propsShown.level])},${
              255 / propsShown.experience
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${propsShown.experience * (255/xpArray[propsShown.level])},${
                255 / (propsShown.experience + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setPropsShown({ ...propsShown, experience: parseInt(e[0]) })
            }
            value={propsShown.experience}
            disabled={!edit}
          />

        </View>
        <View style={styles.rowContainer}>
          <TextInput keyboardType="numeric" editable={edit} value={propsShown.experience} onChangeText={(e) =>
              setPropsShown({ ...propsShown, experience: parseInt(e) })
            } style={globalStyles.textStyle}></TextInput>
          </View>
        </ScrollView>
      </Card>
      {title != null && paragraph != null && (
        <Banner
          hideDialog={hideDialog}
          visible={visible}
          text={{ title: title, paragraph: paragraph }}
        />
      )}
    </View>
  );
};
