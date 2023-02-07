import { useEffect, useState } from "react"
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useIsFocused } from "@react-navigation/native";
import CharacterApi from "../dist/api/CharacterApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MediaApi } from "../dist/api/MediaApi";
import { globalStyles } from "../utils/styles";
import { ProfileSheet } from "../components/profileSheet";



export const MyProperties = ({heroId, navigation}) =>{
    const isFocused = useIsFocused();
    const [properties, setProperties] = useState([])
    const [images, setImages] = useState([])
    const [profileImage, setProfileImage] = useState()
    const [profileModal, setProfileModal] = useState(false)
    useEffect(() =>{
        fetchProperties();
        setProfileModal(false)
    },[isFocused])
    const fetchProperties = async () =>{
        setImages([])
        if(!isFocused) return;
        const token = await AsyncStorage.getItem('token')
        const ip = await AsyncStorage.getItem('ip')
        const props = await CharacterApi.GetPropertiesAsync(token, ip, heroId)
        if(props.isError){
            console.log(props.error)
            return
        }
        for(let prop of props.data){
            if(prop.type === "Profile Image"){
                const downloadFile = await MediaApi.DownloadAsync(token, ip, encodeURIComponent(prop.value))
                if (downloadFile.isError) {
                  console.log(downloadFile.error)
                  return;
                }
                const fileReaderInstance = new FileReader();
                fileReaderInstance.readAsDataURL(downloadFile.data);
                fileReaderInstance.onload = () => {
                  let base64data = fileReaderInstance.result;
                  setProfileImage(base64data);
                  setImages(img => [...img, {image: base64data, description: prop.description, value: prop.value, type: prop.type}]);
                }
            }
            else if(prop.type === "Image"){
                const downloadFile = await MediaApi.DownloadAsync(token, ip, encodeURIComponent(prop.value))
                if (downloadFile.isError) {
                  console.log(downloadFile.error)
                  return;
                }
                const fileReaderInstance = new FileReader();
                fileReaderInstance.readAsDataURL(downloadFile.data);
                fileReaderInstance.onload = () => {
                  let base64data = fileReaderInstance.result;
                  setImages(img => [...img, {image: base64data, description: prop.description, value: prop.value, type: prop.type}]);
                }
            }
        }
    }
    const styles = StyleSheet.create({
        body:{
        },
        profileSection:{
            marginTop: '25%',
        },  
        backgroundStyle: {
            borderRadius: 5,
            fontSize: 30,
            color: 'white',
            textAlign: "center",
            backgroundColor: 'rgba(16,36,69,0.95)',
            borderRadius: 15,
            ...globalStyles.textStyle
          },
          profileImage:{
            alignSelf: 'center',
            width: 80, 
            height: 80, 
            borderRadius: 80 / 2 
          }
    })
    return(
        <>
        <View style={styles.body}>
            <View style={styles.profileSection}>
                <TouchableOpacity onPress={() => setProfileModal(true)}>
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                </TouchableOpacity>
            </View>
            
        </View>
        {profileModal && 
            <ProfileSheet
                setModalVisible={setProfileModal}
                images={images}
                navigation={navigation}
                heroId={heroId}
        />
        }
        </>
    )
}