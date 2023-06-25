import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../utils/styles";




export const LogOut = ({
  modalVisible,
  setModalVisible,
  handleRender
}: any) =>{

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
        handleRender();
    }

    // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'Modal'.
    return (
        <Modal
          // @ts-expect-error TS(2304): Cannot find name 'animationType'.
          animationType="fade"
          // @ts-expect-error TS(7027): Unreachable code detected.
          transparent={true}
          // @ts-expect-error TS(2304): Cannot find name 'visible'.
          visible={modalVisible}
          // @ts-expect-error TS(2304): Cannot find name 'onRequestClose'.
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          // @ts-expect-error TS(2304): Cannot find name 'style'.
          <View style={styles.centeredView}>
            // @ts-expect-error TS(2304): Cannot find name 'style'.
            <View style={styles.modalView}>
                // @ts-expect-error TS(2304): Cannot find name 'style'.
                <Text style={styles.welcomeStyle}>
                  // @ts-expect-error TS(2552): Cannot find name 'Log'. Did you mean '_log'?
                  Log Out?
                </Text>
                // @ts-expect-error TS(2304): Cannot find name 'style'.
                <Text style={styles.welcomeStyle}>
                  // @ts-expect-error TS(2304): Cannot find name 'Are'.
                  Are you sure you want to log out?
                </Text>
              // @ts-expect-error TS(2304): Cannot find name 'style'.
              <View style={styles.buttons}>
              <TouchableOpacity
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  style={globalStyles.button}
                  // @ts-expect-error TS(2304): Cannot find name 'onPress'.
                  onPress={() => logout()}
                >
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                    // @ts-expect-error TS(2304): Cannot find name 'Confirm'.
                    Confirm
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  style={globalStyles.button}
                  // @ts-expect-error TS(2304): Cannot find name 'onPress'.
                  onPress={() => setModalVisible(false)}
                >
                  // @ts-expect-error TS(2304): Cannot find name 'style'.
                  <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                    // @ts-expect-error TS(2304): Cannot find name 'Cancel'.
                    Cancel
                  </Text>
                </TouchableOpacity>
                </View>
            </View>
          </View>
    
        </Modal>
      );
}