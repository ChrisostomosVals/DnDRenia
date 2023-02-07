import { Text, TextInput, StyleSheet, BackHandler, View, TouchableOpacity } from "react-native"
import { globalStyles } from "../utils/styles"
import { ScrollView } from "react-native-gesture-handler"
import { useCallback, useEffect, useState } from "react"
import { useFocusEffect } from "@react-navigation/native";
import ChapterApi from "../dist/api/ChapterApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from "moment";


export const ChapterModal = ({modalVisible, setModalVisible, chapter, setBannerText, setBannerVisible}) =>{
    const [storyValue, setStoryValue] = useState()
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [inputDate, setInputDate] = useState('')
    const [date, setDate] = useState(Moment().toNow())
    useEffect(() =>{
        if(chapter){
            setStoryValue(chapter.story)
            setDate(Moment.utc(chapter.date).toDate())
            setInputDate(Moment.utc(chapter.date).format("D MMM YYYY"))
        }
    },[modalVisible, chapter])
    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            setModalVisible(false)
            return true
          };
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
          return () =>
            BackHandler.removeEventListener('hardwareBackPress');
        }, [modalVisible])
      );
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        modalView: {
            height: '90%',
            width: '90%',
            backgroundColor: "#DAA520",
            padding: 20,
            borderRadius: 15  
        },
        chapterText:{
            fontFamily: "Luminari",
            fontSize: 18
        },
        buttons: {
            flexDirection: "row",
            justifyContent: "space-around",
          },
          input:{
            fontFamily: "Luminari",
            flex: 1,
            backgroundColor: "rgba(0,0,0, 0.7)",
            borderRadius: 10,
            textAlign: 'center',
            fontSize: 18,
            margin: 10,
            color: 'white'
          },
    })
    const openDatePicker = () =>{
        setShowDatePicker(true)
      }
    const handleSave = async() =>{
        const token = await AsyncStorage.getItem('token')
        const ip = await AsyncStorage.getItem('ip')
        const updateChapter = {
            id: chapter.id,
            name: chapter.name,
            story: storyValue,
            date: Moment(date).utcOffset(0).set({hour:12,minute:0,second:0,millisecond:0}).format()
        }
        const update = await ChapterApi.UpdateAsync(token, ip, updateChapter)
        if(update.isError){
        console.log(update.error)
        setModalVisible(false)
        setBannerText({title: 'Error', paragraph:'The Chapter could not been Saved'})
        setBannerVisible(true)
        return
        }
        setModalVisible(false)
        setBannerVisible(true)
        setBannerText({title: 'Changes Saved', paragraph:'The Chapter has been Saved'})
    }
    const handleDate = (event, selectedDate) =>{
        setShowDatePicker(false)
        if(event.type === 'set'){
          setDate(Moment(selectedDate).utcOffset(0).set({hour:12,minute:0,second:0,millisecond:0}).toDate())
          setInputDate(Moment(selectedDate).utcOffset(0).set({hour:12,minute:0,second:0,millisecond:0}).format('D MMM YYYY'))
        }
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
        <ScrollView  >
            <TextInput value={storyValue} onChangeText={setStoryValue} multiline={true} style={styles.chapterText} ></TextInput>
            {showDatePicker && 
              <DateTimePicker mode="date" style={globalStyles.textStyle} value={date} onTouchCancel={() => setShowDatePicker(false)} onChange={handleDate}></DateTimePicker>
              }
              
            <TextInput onPressIn={openDatePicker} showSoftInputOnFocus={false} placeholderTextColor={"rgba(255,255,255, 0.3)"} value={inputDate} style={styles.input} placeholder="Date"></TextInput>
        </ScrollView>
        <View style={styles.buttons}>
        <TouchableOpacity
                  style={globalStyles.button}
                  onPress={() => setModalVisible(false)}
                >
            <Text style={{...globalStyles.textStyle, fontSize: 30}}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
                  style={{...globalStyles.button, opacity: storyValue !== chapter.story || Moment.utc(date).toISOString() !== Moment.utc(chapter.date).toISOString() ? 1 : 0.5}}
                  onPress={handleSave}
                  disabled={storyValue === chapter.story && Moment.utc(date).toISOString() === Moment.utc(chapter.date).toISOString()}
                >
            <Text style={{...globalStyles.textStyle, fontSize: 30}}>Save</Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
    </Modal>
    )
}