import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { exoticWeapons, getSoundEffectsMode, martialWeapons, simpleWeapons } from "../utils/constants";
import { globalStyles } from "../utils/styles";
import { Audio } from "expo-av";
import { useState, useEffect } from "react";
import CharacterApi from "../dist/api/CharacterApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "../utils/constants";

export const ModalQuestion = ({
  modalVisible,
  setModalVisible,
  title,
  action,
  selectedItems,
  setBannerVisible,
  setBannerText,
  heroId,
  handleRender
}) => {
  const [soundEffect, setSoundEffect] = useState();
  useEffect(() => {
    return soundEffect
      ? () => {
          soundEffect.unloadAsync();
        }
      : undefined;
  }, [soundEffect]);

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    welcomeStyle: {
      fontSize: 25,
      ...globalStyles.textStyle,
      textAlign: 'center'
    },
    modalView: {
      width: "90%",
      backgroundColor: "#DAA520",
      borderRadius: 15,
      padding: 35,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      flex: 0.3,
      justifyContent: 'space-around'
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
  const equipGear = async () =>{
    if(action === 'Equip Gear!'){
      let findItem = simpleWeapons.unarmedAttacks.find(item => item.name === selectedItems[0].name)
      if(!findItem) findItem = simpleWeapons.lightMeleeWeapons.find(item => item.name === selectedItems[0].name)
      if(!findItem) findItem = simpleWeapons.oneHandedMeleeWeapons.find(item => item.name === selectedItems[0].name)
      if(!findItem) {
        findItem = simpleWeapons.twoHandedMeleeWeapons.find(item => item.name === selectedItems[0].name)
        if(findItem) findItem.doubleHanded = true
      }
      if(!findItem) findItem = simpleWeapons.rangedWeapons.find(item => item.name === selectedItems[0].name)
      if(!findItem) findItem = martialWeapons.lightMeleeWeapons.find(item => item.name === selectedItems[0].name)
      if(!findItem) findItem = martialWeapons.oneHandedMeleeWeapons.find(item => item.name === selectedItems[0].name)
      if(!findItem) {
        findItem = martialWeapons.twoHandedMeleeWeapons.find(item => item.name === selectedItems[0].name)
        if(findItem) findItem.doubleHanded = true
      }
      if(!findItem) findItem = martialWeapons.rangedWeapons.find(item => item.name === selectedItems[0].name)
      if(!findItem) findItem = exoticWeapons.lightMeleeWeapons.find(item => item.name === selectedItems[0].name)
      if(!findItem) findItem = exoticWeapons.oneHandedMeleeWeapons.find(item => item.name === selectedItems[0].name)
      if(!findItem) {
        findItem = exoticWeapons.twoHandedMeleeWeapons.find(item => item.name === selectedItems[0].name)
        if(findItem) findItem.doubleHanded = true
      }
      if(!findItem) findItem = exoticWeapons.rangedWeapons.find(item => item.name === selectedItems[0].name)
      if(!findItem){
        setBannerText({
          title: "Equipping item Failed",
          paragraph: `${selectedItems[0].name} cannot be equipped!`
        })
        setModalVisible(false)
        setBannerVisible(true)
        return;
      }
      else{
        const token = await AsyncStorage.getItem("token");
        const playerStats = await CharacterApi.GetStatsAsync(token, ip, heroId)
        if(playerStats.isError){
          console.log(playerStats.error)
          return;
        }
        let attackBonus=0;
        playerStats.data.forEach(s =>{
          if(s.name === "Strength"){
            attackBonus += parseInt((s.value - 10) / 2)
          }
          if(s.name === "Base Attack Bonus"){
            attackBonus += parseInt(s.value)
          }
        })
        if(findItem.doubleHanded === true){
          attackBonus += 1
        }
        const arsenalItem = {
          id: heroId,
          gearId: selectedItems[0].id,
          type: findItem.type,
          range: findItem.rangeIncrement,
          attackBonus: attackBonus.toString(),
          damage: findItem.dmgM,
          critical: findItem.critical
        }
        const insertArsenalItem = await CharacterApi.EquipItemAsync(token, ip, arsenalItem)
        if(insertArsenalItem.isError){
          console.log(insertArsenalItem.error)
          setBannerText({
            title: "Equipping item Failed",
            paragraph: `${selectedItems[0].name} has not been equipped! ${insertArsenalItem.error.message}`
          })
          setModalVisible(false)
          setBannerVisible(true)
          return;
        }
        setBannerText({
          title: "Equipped item Successfully!",
          paragraph: `${selectedItems[0].name} equipped!`
        })
        setModalVisible(false)
        setBannerVisible(true)
        handleRender();
      }
    }
    const soundEffectsMode = await getSoundEffectsMode();
    if(soundEffectsMode === 'on'){
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/equipGear.mp3"),
        {
          shouldPlay: true,
          isLooping: false,
        }
      );
      setSoundEffect(sound)
      await sound.playAsync()
    }
  }

  

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Text style={styles.welcomeStyle}>
              {action}
            </Text>
            <Text style={styles.welcomeStyle}>
              {title}
            </Text>
          <View style={styles.buttons}>
          <TouchableOpacity
              style={globalStyles.button}
              onPress={() => equipGear()}
            >
              <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                Confirm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                Cancel
              </Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>

    </Modal>
  );
};
