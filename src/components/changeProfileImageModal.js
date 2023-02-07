import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import CharacterApi from "../dist/api/CharacterApi";
import { globalStyles } from "../utils/styles";
import * as MediaLibrary from "expo-media-library";
import { MediaApi } from "../dist/api/MediaApi";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

export const ChangeProfileImageModal = ({
  modalVisible,
  setModalVisible,
  image,
  setBannerText,
  setBannerVisible,
  heroId,
}) => {

    const [description, setDescription] = useState('')
    useEffect(() =>{
        setDescription('')
    },[modalVisible])
  const handleSave = async () => {
    const token = await AsyncStorage.getItem("token");
    const ip = await AsyncStorage.getItem("ip");
    if (image.type === "update") {
      if (image.item.type === "Profile Image") {
        setBannerText({
          title: "Profile Image",
          paragraph: "This is already your profile image",
        });
        setModalVisible(false);
        setBannerVisible(true);
        return;
      }
      const characterProps = await CharacterApi.GetPropertiesAsync(
        token,
        ip,
        heroId
      );
      if (characterProps.isError) {
        console.log(characterProps.error);
        setBannerText({
            title: "Profile Image",
            paragraph: "There was an error updating your profile image",
          });
          setModalVisible(false);
          setBannerVisible(true);
          return;
      }
      for (let prop of characterProps.data) {
        if (prop.type === "Profile Image" || prop.type === "Image") {
            if(prop.value === image.item.value) prop.type = "Profile Image"
            else prop.type = "Image"
        }
      }
      const update = {
        id: heroId,
        updateDefinition: characterProps.data
      }
      console.log(update)
    const updateProps = await CharacterApi.UpdatePropertiesAsync(token, ip, update)
    if(updateProps.isError){
        console.log(updateProps.error)
        setBannerText({
            title: "Profile Image",
            paragraph: "There was an error updating your profile image",
          });
          setModalVisible(false);
          setBannerVisible(true);
          return;
    }
    setBannerText({
        title: "Profile Image",
        paragraph: "Your profile image has been updated",
      });
      setModalVisible(false);
      setBannerVisible(true);
    }
    else if(image.type === "create"){
        const files=[];
        const img = await MediaLibrary.getAssetInfoAsync(image.item.id)
        const character = await CharacterApi.GetByIdAsync(token, ip , heroId);
        if(character.isError){
            console.log(character.error);
            setBannerText({
                title: "Profile Image",
                paragraph: "There was an error uploading your profile image",
              });
              setModalVisible(false);
              setBannerVisible(true);
              return;
        }
        const response = await fetch(img.uri);
        const blob = await response.blob();
        const file = new File([img.filename], blob._data.name, {type: blob._data.type})
        files.push({
            name: file.name,
            type: file.type,
            uri: img.uri
        })
        const uploadImage = {
            type: 'character',
            name: character.data.name,
            files: files
        }
        const upload = await MediaApi.UploadAsync(token, ip, uploadImage)
        if(upload.isError){
            console.log(upload.error, 'upload')
            setBannerText({
                title: "Profile Image",
                paragraph: "There was an error uploading your profile image",
              });
              setModalVisible(false);
              setBannerVisible(true);
            return;
        }
        const characterProps = await CharacterApi.GetPropertiesAsync(
            token,
            ip,
            heroId
          );
          if (characterProps.isError) {
            console.log(characterProps.error);
            setBannerText({
                title: "Profile Image",
                paragraph: "There was an error updating your profile image",
              });
              setModalVisible(false);
              setBannerVisible(true);
              return await deleteImage(token, ip, upload.data[0]);
          }
          for (let prop of characterProps.data) {
            if (prop.type === "Profile Image") {
                if(prop.value === image.item.value) prop.type = "Image"
            }
          }
          characterProps.data.push({
            type: "Profile Image",
            value: upload.data[0],
            description: description
        })
        const updateProps ={
            id: heroId,
            updateDefinition: characterProps.data
        }
          const updatedProps = await CharacterApi.UpdatePropertiesAsync(token, ip, updateProps)
          if(updatedProps.isError){
            console.log(updatedProps.error, 'updatedProps')
            setBannerText({
                title: "Profile Image",
                paragraph: "There was an error updating your profile image",
              });
              setModalVisible(false);
              setBannerVisible(true);
              return await deleteImage(token, ip, upload.data[0]);
          }
          setBannerText({
            title: "Profile Image",
            paragraph: "Your Profile image has been uploaded",
          });
          setModalVisible(false);
          setBannerVisible(true);
    } 
  };
  const deleteImage = async(token, ip, data) =>{
    const deleteImage = await MediaApi.DeleteAsync(token, ip, encodeURIComponent(data))
    if(deleteImage.isError){
        console.log(deleteImage.error, 'deleteImage')
        setBannerText({
            title: "Profile Image",
            paragraph: "Please contact the developer",
          });
          setModalVisible(false);
          setBannerVisible(true);
          return;
    }
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.text}>
            Are you sure you want to change your profile Image?
          </Text>
          {image.type === 'create' && 
            <TextInput placeholderTextColor={"rgba(255,255,255, 0.3)"} placeholder="Description (optional)" value={description} onChangeText={setDescription} style={styles.textInput}></TextInput>
            }
          <View style={styles.buttons}>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.button} onPress={handleSave}>
              <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: "40%",
    width: "90%",
    backgroundColor: "#DAA520",
    padding: 20,
    borderRadius: 15,
    justifyContent: "space-around",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    ...globalStyles.textStyle,
    fontSize: 25,
    textAlign: "center",
  },
  textInput:{
    fontFamily: "Luminari",
    backgroundColor: "rgba(0,0,0, 0.7)",
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    margin: 10
  },
});
