import { useEffect, useState } from "react"
import { Text, TextInput, StyleSheet, View, TouchableOpacity } from "react-native"
import { globalStyles } from "../utils/styles"
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChapterApi from "../dist/api/ChapterApi";
import { ip } from "../utils/constants";

export const CreateChapterModal = ({modalVisible, setModalVisible, setBannerText, setBannerVisible}) =>{

  const [name, setName] = useState('')
  const [date, setDate] = useState(new Date())
  const [inputDate, setInputDate] = useState('')
  const [story, setStory] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  useEffect(()=>{
    setName('')
    setInputDate('')
    setDate(new Date())
    setStory('')
    setShowDatePicker(false)
  },[modalVisible])
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
          inputStory:{
            fontFamily: "Luminari",
            flex: 8,
            backgroundColor: "rgba(0,0,0, 0.7)",
            borderRadius: 10,
            textAlign: 'center',
            fontSize: 18,
            color: 'white',
            margin: 10
          },
          buttons: {
            flexDirection: "row",
            justifyContent: "space-around",
          },
    })
    const handleSave = async () =>{
      const token = await AsyncStorage.getItem('token')
      const newChapter = {
          name: name,
          story: story,
          date: Moment(date).utcOffset(0).set({hour:12,minute:0,second:0,millisecond:0}).format()
      }
      const saveChapter = await ChapterApi.CreateAsync(token, ip, newChapter)
      if(saveChapter.isError){
          console.log(saveChapter.error)
          setModalVisible(false)
          setBannerText({title: 'Error', paragraph:'The Chapter could not been Saved'})
          setBannerVisible(true)
          return
        }
        setModalVisible(false)
        setBannerVisible(true)
        setBannerText({title: 'Chapter Created!', paragraph:'The Chapter has been Created'})
    }
    const openDatePicker = () =>{
      setShowDatePicker(true)
    }
    const handleDate = (event, selectedDate) =>{
      setShowDatePicker(false)
        if(event.type === 'set'){
          setDate(Moment(selectedDate).utcOffset(0).set({hour:12,minute:0,second:0,millisecond:0}).toDate())
          setInputDate(Moment(selectedDate).utcOffset(0).set({hour:12,minute:0,second:0,millisecond:0}).format('D MMM YYYY'))
        }
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
            <TextInput placeholderTextColor={"rgba(255,255,255, 0.3)"} style={styles.input} value={name} onChangeText={setName} placeholder="Chapter Name"></TextInput>
            <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
              {showDatePicker && 
              <DateTimePicker mode="date" style={globalStyles.textStyle} value={date} onTouchCancel={() => setShowDatePicker(false)} onChange={handleDate}></DateTimePicker>
              }
              
            <TextInput onPressIn={openDatePicker} showSoftInputOnFocus={false} placeholderTextColor={"rgba(255,255,255, 0.3)"} value={inputDate} style={styles.input} placeholder="Date"></TextInput>
            <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            <TextInput placeholderTextColor={"rgba(255,255,255, 0.3)"} value={story} onChangeText={setStory} style={styles.inputStory} multiline placeholder="Story"></TextInput>
        <View style={styles.buttons}>
        <TouchableOpacity
                  style={globalStyles.button}
                  onPress={() => setModalVisible(false)}
                >
            <Text style={{...globalStyles.textStyle, fontSize: 30}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
                  style={{...globalStyles.button, opacity: story === '' || date === '' || name === '' ? 0.5 : 1}}
                  onPress={handleSave}
                  disabled={story === '' || date === '' || name === ''}
                >
            <Text style={{...globalStyles.textStyle, fontSize: 30}}>Save</Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
        </Modal>
    )
}