import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { getSoundEffectsMode } from "../utils/constants";
import { globalStyles } from "../utils/styles";
import { Audio } from "expo-av";
import { useState, useEffect } from "react";

export const ModalQuestion = ({
  modalVisible,
  setModalVisible,
  title,
  action,
  selectedItems
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
