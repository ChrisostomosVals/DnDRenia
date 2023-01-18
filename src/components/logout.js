import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../utils/styles";




export const LogOut = ({
    modalVisible,
    setModalVisible,
    render,
    setRender
}) =>{

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

    const logout = async () =>{
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('heroId')
        await AsyncStorage.removeItem('refreshToken')
        await AsyncStorage.removeItem('scope')
        await AsyncStorage.removeItem('tokenType')
        await AsyncStorage.removeItem('tokenExpiration')
        setModalVisible(false)
        setRender(!render)
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
                  Logout?
                </Text>
                <Text style={styles.welcomeStyle}>
                  Are you sure you want to log out?
                </Text>
              <View style={styles.buttons}>
              <TouchableOpacity
                  style={globalStyles.button}
                  onPress={() => logout()}
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
}