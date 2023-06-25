import { memo, useCallback, useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import IonIcon from "react-native-vector-icons/Ionicons";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  BackHandler,
} from "react-native";
import { globalStyles } from "../utils/styles";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import CharacterApi from "../dist/api/CharacterApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Banner } from "../components/banner";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import { MediaApi } from "../dist/api/MediaApi";
import { CustomModal } from "../components/CustomModal";
import { ip } from "../utils/constants";

// @ts-expect-error TS(2339): Property 'route' does not exist on type '{}'.
export const MyImages = memo(function MyImages({ route }) {
  const { heroId, navigation } = route.params;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [descriptions, setDescriptions] = useState([]);
  const [initDesc, setInitDesc] = useState([]);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [bannerText, setBannerText] = useState({
    title: "",
    paragraph: "",
  });
  const [modalVisible, setModalVisible] = useState(false)
  const [deleteItem, setDeleteItem] = useState()
  const [render, setRender] = useState(false)
  useEffect(() => {
    setModalVisible(false);
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    setDeleteItem();
    fetchImages();
  }, [route, render]);
  const fetchImages = async () => {
    setDescriptions([]);
    setInitDesc([]);
    setImages([]);
    const token = await AsyncStorage.getItem("token");
    const props = await CharacterApi.GetPropertiesAsync(token, ip, heroId);
    if (props.isError) {
      console.log(props.error, "fetchImages");
      setBannerText({
        title: "Error",
        paragraph: "There was an error fetching images",
      });
      setBannerVisible(true);
      return;
    }
    for (let prop of props.data) {
      if(prop.type === "Image" || prop.type === "Profile Image"){
        const downloadFile = await MediaApi.DownloadAsync(
          token,
          ip,
          encodeURIComponent(prop.value)
        );
        if (downloadFile.isError) {
          console.log(downloadFile.error);
          return;
        }
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(downloadFile.data);
        fileReaderInstance.onload = () => {
          let base64data = fileReaderInstance.result;
          // @ts-expect-error TS(2345): Argument of type '(img: never[]) => { image: strin... Remove this comment to see the full error message
          setImages((img) => [
            ...img,
            {
              image: base64data,
              description: prop.description,
              value: prop.value,
              type: prop.type,
            },
          ]);
        };
        // @ts-expect-error TS(2345): Argument of type '(desc: never[]) => any[]' is not... Remove this comment to see the full error message
        setDescriptions((desc) => [...desc, prop.description]);
        // @ts-expect-error TS(2345): Argument of type '(desc: never[]) => any[]' is not... Remove this comment to see the full error message
        setInitDesc((desc) => [...desc, prop.description]);
      }
      }
      
  };
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("MyProperties", { heroId: heroId });
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
      return () => BackHandler.removeEventListener("hardwareBackPress");
    }, [])
  );
  const handleDescription = (e: any, index: any) => {
    setDescriptions((desc) =>
      desc.map((d, indx) => {
        // @ts-expect-error TS(2322): Type 'any' is not assignable to type 'never'.
        if (indx === index) d = e;
        return d;
      })
    );
  };
  const handleSave = async () => {
    const token = await AsyncStorage.getItem("token");
    const props = await CharacterApi.GetPropertiesAsync(token, ip, heroId);
    if (props.isError) {
      console.log(props.error, "props");
      setBannerText({
        title: "Error",
        paragraph: "There was an error updating image descriptions",
      });
      setBannerVisible(true);
      return;
    }
    for (let prop of props.data) {
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      let item = images.find((i) => i.value === prop.value);
      if (item) {
        prop.description = descriptions[images.indexOf(item)];
      }
    }
    const updateProps = {
      id: heroId,
      updateDefinition: props.data,
    };
    const update = await CharacterApi.UpdatePropertiesAsync(
      token,
      ip,
      updateProps
    );
    if (update.isError) {
      console.log(update.error, "update");
      setBannerText({
        title: "Error",
        paragraph: "There was an error updating image descriptions",
      });
      setBannerVisible(true);
      return;
    }
    setBannerText({
      title: "Success",
      paragraph: "Descriptions Updated",
    });
    setBannerVisible(true);
  };
  const hideDialog = () => {
    setBannerVisible(false);
  };
  const styles = StyleSheet.create({
    inputStyle: {
      borderRadius: 5,
      fontSize: 30,
      textAlign: "center",
      backgroundColor: "rgba(16,36,69,0.95)",
      ...globalStyles.textStyle,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      ...globalStyles.textStyle,
      fontSize: 30,
    },
    button: {
      ...globalStyles.button,
      marginTop: "5%",
      opacity:
        JSON.stringify(initDesc) === JSON.stringify(descriptions) ? 0.5 : 1,
    },
  });
  const handleDelete = async (item: any) => {
    setModalVisible(true)
    setDeleteItem(item)
  }
  const deleteImage = async() =>{
    const token = await AsyncStorage.getItem("token");
    const props = await CharacterApi.GetPropertiesAsync(token, ip, heroId);
    if (props.isError) {
      console.log(props.error, "props");
      setBannerText({
        title: "Error",
        paragraph: "There was an error updating image descriptions",
      });
      setBannerVisible(true);
      return;
    }
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    props.data = props.data.filter((d: any) => deleteItem.value !== d.value)
    const updateProps = {
      id: heroId,
      updateDefinition: props.data,
    };
    const update = await CharacterApi.UpdatePropertiesAsync(
      token,
      ip,
      updateProps
    );
    if (update.isError) {
      console.log(update.error, "update");
      setModalVisible(false);
      setBannerText({
        title: "Error",
        paragraph: "There was an error updating image descriptions",
      });
      setBannerVisible(true);
      return;
    }
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const deleteImage = await MediaApi.DeleteAsync(token, ip, encodeURIComponent(deleteItem.value))
    if(deleteImage.isError){
        console.log(deleteImage.error, 'deleteImage')
        setModalVisible(false);
        setBannerText({
            title: "Profile Image",
            paragraph: "Please contact the developer",
          });
          setBannerVisible(true);
          return;
    }
    // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
    const newItems = images.filter(img => img.value !== deleteItem.value);
    setImages(newItems)
    setBannerText({
      title: "Delete",
      paragraph: "Image deleted",
    });
    setModalVisible(false);
    setBannerVisible(true);
  }
  return (
    <View style={styles.container}>
      <IonIcon
        name="arrow-back-circle"
        color="#DAA520"
        size={30}
        style={{ left: 30, top: 50, position: "absolute" }}
        onPress={() => navigation.navigate("MyProperties", { heroId: heroId })}
      />
      <Carousel
        loop={false}
        width={width}
        height={width}
        data={images}
        scrollAnimationDuration={100}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
            }}
          >
            <TextInput
              style={styles.inputStyle}
              value={descriptions[index]}
              onChangeText={(e) => handleDescription(e, index)}
            ></TextInput>
            <MaterialCommunityIcons
              name="circle-edit-outline"
              color="#DAA520"
              size={20}
              style={{ right: 10, top: 10, position: "absolute" }}
            />
            <Image
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              source={{ uri: images[index].image }}
              style={{ width: width, height: height / 2 }}
            />
            <MaterialCommunityIcons
            onPress={()=>handleDelete(images[index])}
              name="delete"
              color="#DAA520"
              size={30}
              style={{ right: 10, bottom: 10, position: "absolute" }}
            />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        disabled={JSON.stringify(initDesc) === JSON.stringify(descriptions)}
      >
        <Text style={styles.buttonText} onPress={handleSave}>
          Save
        </Text>
      </TouchableOpacity>
      <Banner
        hideDialog={hideDialog}
        visible={bannerVisible}
        text={bannerText}
      />
      <CustomModal
        Children={<></>}
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfrim={deleteImage}
        title={'Do you want to delete this image?'}
        />
    </View>
  );
});
