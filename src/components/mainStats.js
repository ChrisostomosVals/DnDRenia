import { Card } from "@rneui/base";
import { View, StyleSheet, Text, Image } from "react-native";
import { globalStyles } from "../utils/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import { useEffect, useState } from "react";
import { ControlledTooltip } from "../utils/controllerToolTip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CharacterApi } from "../utils/api.service";
import { Banner } from "./banner";
import IonIcon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

export const MainStats = ({ hero }) => {
  const [heroStats, setHeroStats] = useState();
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(null);
  const [paragraph, setParagraph] = useState(null);
  const xpArray = [
    0, 3000, 7500, 14000, 23000, 35000, 53000, 77000, 115000, 160000, 235000, 330000, 475000, 665000, 955000, 1350000, 1900000, 2700000, 3850000, 5350000
  ];
  useEffect(() => {
    fetchStats();
    setEdit(false);
  }, [hero]);

  const fetchStats = async () => {
    setHeroStats(hero);
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
      marginTop: 0,
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
    const playerStats = await CharacterApi.GetById(heroStats.id);
    setHeroStats(playerStats);
  };
  const hideDialog = () => setVisible(false);
  const handleSave = async () => {
    let id = await AsyncStorage.getItem("heroId");
    setHeroStats({ ...heroStats, id: id });

    const updateStats = await CharacterApi.Update(heroStats);
    if (!updateStats) {
      setTitle("Stats Updated");
      setParagraph("Your Stats have been Saved!");
      setVisible(true);
    } else {
      setTitle("Error Occurred");
      setParagraph("Your Stats could not been Saved!");
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
            <Image source={require("../assets/images/muscle_20px.png")} />
          </ControlledTooltip>
          <Text style={globalStyles.textStyle}>{heroStats.strength}</Text>
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
              setHeroStats({ ...heroStats, strength: parseInt(e[0]) })
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
          <Text style={globalStyles.textStyle}>{heroStats.maxHp}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${heroStats.maxHp * 2 * 2.55},${
              255 / heroStats.maxHp
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.maxHp * 2 * 2.55},${
                255 / (heroStats.maxHp + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setHeroStats({ ...heroStats, maxHp: parseInt(e[0]) })
            }
            value={heroStats.maxHp}
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
          <Text style={globalStyles.textStyle}>{heroStats.currentHp}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${heroStats.currentHp * 2 * 2.55},${
              255 / heroStats.currentHp
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.currentHp * 2 * 2.55},${
                255 / (heroStats.currentHp + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setHeroStats({ ...heroStats, currentHp: parseInt(e[0]) })
            }
            value={heroStats.currentHp}
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
          <Text style={globalStyles.textStyle}>{heroStats.dexterity}</Text>
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
              setHeroStats({ ...heroStats, dexterity: parseInt(e[0]) })
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
          <Text style={globalStyles.textStyle}>{heroStats.constitution}</Text>
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
              setHeroStats({ ...heroStats, constitution: parseInt(e[0]) })
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
          <Text style={globalStyles.textStyle}>{heroStats.wisdom}</Text>
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
              setHeroStats({ ...heroStats, wisdom: parseInt(e[0]) })
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
          <Text style={globalStyles.textStyle}>{heroStats.charisma}</Text>
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
              setHeroStats({ ...heroStats, charisma: parseInt(e[0]) })
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
          <Text style={globalStyles.textStyle}>{heroStats.intelligence}</Text>
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
              setHeroStats({ ...heroStats, intelligence: parseInt(e[0]) })
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
          <Text style={globalStyles.textStyle}>{heroStats.level}</Text>
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
              setHeroStats({ ...heroStats, level: parseInt(e[0]), experience: 0 })
            }
            value={heroStats.level}
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
          <Text style={globalStyles.textStyle}>{heroStats.armorClass}</Text>
          <Slider
            animateTransitions
            maximumValue={50}
            minimumTrackTintColor={`rgb(${heroStats.armorClass * 5 * 2.55},${
              255 / heroStats.armorClass
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.armorClass * 5 * 2.55},${
                255 / (heroStats.armorClass + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setHeroStats({ ...heroStats, armorClass: parseInt(e[0]) })
            }
            value={heroStats.armorClass}
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
          <Text style={globalStyles.textStyle}>{heroStats.speed}</Text>
          <Slider
            animateTransitions
            maximumValue={100}
            minimumTrackTintColor={`rgb(${heroStats.speed * 2.55},${
              255 / heroStats.speed
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.speed * 2.55},${
                255 / (heroStats.speed + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setHeroStats({ ...heroStats, speed: parseInt(e[0]) })
            }
            value={heroStats.speed}
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
          <Text style={globalStyles.textStyle}>{heroStats.baseAttackBonus}</Text>
          <Slider
            animateTransitions
            maximumValue={20}
            minimumTrackTintColor={`rgb(${heroStats.baseAttackBonus * 5 * 2.55},${
              255 / heroStats.baseAttackBonus
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.baseAttackBonus * 5 * 2.55},${
                255 / (heroStats.baseAttackBonus + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setHeroStats({ ...heroStats, baseAttackBonus: parseInt(e[0]) })
            }
            value={heroStats.baseAttackBonus}
            disabled={!edit}
          />
        </View>
        <View style={styles.rowContainer}>
          <ControlledTooltip
            style={globalStyles.card}
            popover={<Text style={globalStyles.textStyle}>Experience {heroStats.experience}</Text>}
          >
             <Image source={require("../assets/images/experience_skill_20px.png")} />
          </ControlledTooltip>
          <Slider
            animateTransitions
            maximumValue={xpArray[heroStats.level]}
            minimumTrackTintColor={`rgb(${heroStats.experience * (255/xpArray[heroStats.level])},${
              255 / heroStats.experience
            },0)`}
            containerStyle={{ width: "80%" }}
            thumbStyle={{
              ...styles.thumb,
              backgroundColor: `rgb(${heroStats.experience * (255/xpArray[heroStats.level])},${
                255 / (heroStats.experience + 1)
              },0)`,
            }}
            trackStyle={styles.track}
            onValueChange={(e) =>
              setHeroStats({ ...heroStats, experience: parseInt(e[0]) })
            }
            value={heroStats.experience}
            disabled={!edit}
          />

        </View>
        <View style={styles.rowContainer}>
          <Text style={globalStyles.textStyle}>{heroStats.experience}</Text>
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
