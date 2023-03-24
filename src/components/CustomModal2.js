import { useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Modal } from "react-native"
import { globalStyles } from "../utils/styles";

export const CustomModal2 = ({modalVisible, onConfrim, onClose, closeModal, title, Children, confirmTitle, closeTitle}) =>{
    useEffect(()=>{

    }, [modalVisible])
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        modalView: {
            height: "50%",
            width: '90%',
            justifyContent: 'space-around',
            backgroundColor: "#DAA520",
            padding: 20,
            borderRadius: 15
        },
        input:{
            ...globalStyles.textStyle, 
            fontSize: 30,
            textAlign: 'center'
        },
        buttons: {
            flexDirection: "row",
            justifyContent: "space-around",
          },
        })
    return(
        <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
        >   
         <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.input}>{title}</Text>
            {Children}
            <View style={styles.buttons}>
        <TouchableOpacity
                  style={globalStyles.button}
                  onPress={onClose}
                >
            <Text style={{...globalStyles.textStyle, fontSize: 30}}>{closeTitle}</Text>
        </TouchableOpacity>
        <TouchableOpacity
                  style={globalStyles.button}
                  onPress={onConfrim}
                >
            <Text style={{...globalStyles.textStyle, fontSize: 30}}>{confirmTitle}</Text>
        </TouchableOpacity>
        </View>
            </View>
        </View>
        </Modal>
    )
};
