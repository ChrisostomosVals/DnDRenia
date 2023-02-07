import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChapterApi from "../dist/api/ChapterApi";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native"
import { globalStyles } from "../utils/styles";


export const DeleteChapterModal = ({chapter, modalVisible, setModalVisible, setBannerText, setBannerVisible}) =>{

    
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        modalView: {
            height: "50%",
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
        const handleConfirm = async () =>{
            const token = await AsyncStorage.getItem('token')
            const ip = await AsyncStorage.getItem('ip')
            const deleteChapter = await ChapterApi.DeleteAsync(token, ip, chapter.id)
            if(deleteChapter.isError){
                console.log(deleteChapter.error)
                setModalVisible(false)
                setBannerText({title: 'Error', paragraph:`${chapter.name} could not be Deleted`})
                setBannerVisible(true)
                return
            }
        setModalVisible(false)
        setBannerVisible(true)
        setBannerText({title: 'Deleted', paragraph:`${chapter.name} has been Deleted`})
        }
        if(!chapter){
            return(
                <Text style={globalStyles.textStyle}>Loading...</Text>
            )
        }
    return(
        <Modal
        animationIn='fadeIn'
        animationOut='fadeOut'
        isVisible={modalVisible}
        avoidKeyboard={true}
        onBackButtonPress={() => setModalVisible(false)}
    >   
         <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.input}>Are you sure you want to <Text style={{color: '#800909'}}>Delete</Text> {chapter.name}</Text>
            <View style={styles.buttons}>
        <TouchableOpacity
                  style={globalStyles.button}
                  onPress={() => setModalVisible(false)}
                >
            <Text style={{...globalStyles.textStyle, fontSize: 30}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
                  style={globalStyles.button}
                  onPress={handleConfirm}
                >
            <Text style={{...globalStyles.textStyle, fontSize: 30}}>Confirm</Text>
        </TouchableOpacity>
        </View>
            </View>
        </View>
        </Modal>
    )
}
