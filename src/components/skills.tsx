import { ScrollView } from "react-native-gesture-handler";
import { View, StyleSheet, Text } from "react-native";
import { Fragment, useEffect } from "react";
import { Card } from "@rneui/base";
import { globalStyles } from "../utils/styles";
import { CheckBox } from "@rneui/themed";
import IonIcon from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import CharacterApi from "../dist/api/CharacterApi";
import { ip } from "../utils/constants";
import { Banner } from "./banner";
import { skillsInit } from "../utils/constants";

export const Skills = ({
  hero
}: any) => {
  const [edit, setEdit] = useState(false);
  const [skills, setSkills] = useState(skillsInit);
  useEffect(() => {
    fetchSkills();
  }, [hero]);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerText, setBannerText] = useState({
    title: "",
    paragraph: "",
  });

  const fetchSkills = async () => {
    const token = await AsyncStorage.getItem("token");
    const getSkills = await CharacterApi.GetSkillsAsync(token, ip, hero.id);
    if (getSkills.isError) {
      console.log(getSkills.error, "skills.fetchSkills()");
      return;
    }
    setSkills(getSkills.data);
  };

  const hideDialog = () => setBannerVisible(false);
  const toggleTrain = (index: any) => {
    let arr = [...skills];
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    arr[index].trained = !arr[index].trained;
    setSkills(arr);
  };
  const changeRank = (index: any, action: any) => {
    let arr = [...skills];
    if (action === "down") {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (arr[index].ranks > 0) arr[index].ranks -= 1;
    } else if (action === "up") {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      arr[index].ranks += 1;
    }
    setSkills(arr);
  };
  const changeMisc = (index: any, action: any) => {
    let arr = [...skills];
    if (action === "down") {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (arr[index].miscMod > 0) arr[index].miscMod -= 1;
    } else if (action === "up") {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      arr[index].miscMod += 1;
    }
    setSkills(arr);
  };
  const changeAbility = (index: any, action: any) => {
    let arr = [...skills];
    if (action === "down") {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (arr[index].abilityMod > 0) arr[index].abilityMod -= 1;
    } else if (action === "up") {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      arr[index].abilityMod += 1;
    }
    setSkills(arr);
  };
  const handleEdit = async () => {
    setEdit(!edit);
  };
  const handleSave = async () => {
    const token = await AsyncStorage.getItem("token");
    const request = {
      id: hero.id,
      updateDefinition: skills,
    };
    const update = await CharacterApi.UpdateSkillsAsync(token, ip, request);
    if (update.isError) {
      console.log(update.error, "skills.handleSave()");
      setBannerText({
        title: "Failed",
        paragraph: "There was an error updating your skills",
      });
      setBannerVisible(true);
      return;
    }
    setBannerText({
      title: "Success",
      paragraph: "Your skills have been updated",
    });
    setBannerVisible(true);
  };
  return (
    <View>
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
        <ScrollView>
          // @ts-expect-error TS(2339): Property 'rowContainer' does not exist on type '{ ... Remove this comment to see the full error message
          <View style={styles.rowContainer}>
            {skills.length > 0 &&
              skills.map((skill, index) => (
                <Fragment key={index}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={globalStyles.textStyle}>Skill:</Text>
                      <Text style={styles.name}>{skill.name}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Text style={globalStyles.textStyle}>
                          Ability Modifier: {skill.abilityMod}
                        </Text>
                        {edit && (
                          <>
                            <IonIcon
                              style={styles.button}
                              name="caret-up-circle"
                              color="#DAA520"
                              size={15}
                              onPress={() => changeAbility(index, "up")}
                            />
                            <IonIcon
                              style={styles.button}
                              name="caret-down-circle"
                              color="#DAA520"
                              size={15}
                              onPress={() => changeAbility(index, "down")}
                            />
                          </>
                        )}
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Text style={globalStyles.textStyle}>
                          Ranks: {skill.ranks}
                        </Text>
                        {edit && (
                          <>
                            <IonIcon
                              style={styles.button}
                              name="caret-up-circle"
                              color="#DAA520"
                              size={15}
                              onPress={() => changeRank(index, "up")}
                            />
                            <IonIcon
                              style={styles.button}
                              name="caret-down-circle"
                              color="#DAA520"
                              size={15}
                              onPress={() => changeRank(index, "down")}
                            />
                          </>
                        )}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Text style={globalStyles.textStyle}>
                          Misc Modifier: {skill.miscMod}
                        </Text>
                        {edit && (
                          <>
                            <IonIcon
                              style={styles.button}
                              name="caret-up-circle"
                              color="#DAA520"
                              size={15}
                              onPress={() => changeMisc(index, "up")}
                            />
                            <IonIcon
                              style={styles.button}
                              name="caret-down-circle"
                              color="#DAA520"
                              size={15}
                              onPress={() => changeMisc(index, "down")}
                            />
                          </>
                        )}
                      </View>
                      <Text style={globalStyles.textStyle}>
                        Total: {skill.ranks + skill.miscMod + skill.abilityMod}
                      </Text>
                    </View>
                    <CheckBox
                      // @ts-expect-error TS(2322): Type '{ backgroundColor: null; justifyContent: "ce... Remove this comment to see the full error message
                      containerStyle={{
                        backgroundColor: null,
                        justifyContent: "center",
                      }}
                      checked={
                        skill.ranks + skill.miscMod + skill.abilityMod > 0
                      }
                      onPress={() => toggleTrain(index)}
                      iconType="material-community"
                      checkedIcon="checkbox-marked-circle"
                      uncheckedIcon="checkbox-blank-circle-outline"
                      checkedColor="#DAA520"
                      disabled={true}
                    />
                    {skill.trained && (
                      <MaterialCommunityIcons
                        name="multiplication"
                        color="#DAA520"
                        size={15}
                        style={styles.trained}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      borderColor: "white",
                      borderWidth: StyleSheet.hairlineWidth,
                    }}
                  />
                </Fragment>
              ))}
          </View>
        </ScrollView>
      </Card>
      <Banner
        hideDialog={hideDialog}
        visible={bannerVisible}
        text={bannerText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: "95%",
    paddingBottom: 20,
    alignItems: "center",
  },
  name: {
    ...globalStyles.textStyle,
    fontSize: 12,
  },
  button: {
    marginLeft: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trained: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
