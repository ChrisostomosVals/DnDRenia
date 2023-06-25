import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  TextInput
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import * as MediaLibrary from "expo-media-library";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { globalStyles } from "../utils/styles";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { TouchableImage } from "../components/TouchableImage";
import { Banner } from "../components/banner";
import { CustomModal } from "../components/CustomModal";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import CharacterApi from "../dist/api/CharacterApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import { MediaApi } from "../dist/api/MediaApi";
import { ip } from "../utils/constants";

export const ChooseProfileImage = ({
  route,
  navigation
}: any) => {
  const { images, heroId } = route.params;
  const { width } = Dimensions.get("window");
  const isFocused = useIsFocused();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [photos, setPhotos] = useState([]);
  const [characterImages, setCharacterImages] = useState([]);
  const [active, setActive] = useState(0);
  const [xTabOne, setXTabOne] = useState(0);
  const [xTabTwo, setXTabTwo] = useState(0);
  const [translateX, setTranslateX] = useState(new Animated.Value(0));
  const [translateXTabOne, setTranslateXTabOne] = useState(
    new Animated.Value(0)
  );
  const [translateXTabTwo, setTranslateXTabTwo] = useState(
    new Animated.Value(width)
  );
  const [translateY, setTranslateY] = useState(-1000);
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState();
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerText, setBannerText] = useState({
    title: "",
    paragraph: "",
  });
  const [description, setDescription] = useState('')

  useEffect(() => {
    setModalVisible(false);
    setActive(0);
    setXTabOne(0);
    setXTabTwo(0);
    setTranslateX(new Animated.Value(0));
    setTranslateXTabOne(new Animated.Value(0));
    setTranslateXTabTwo(new Animated.Value(width));
    setTranslateY(-1000);
    fetchPhonePhotos();
    fetchCharacterImages();
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    setItem();
    setDescription('');
  }, [isFocused]);
  useEffect(() => {
    if (active === 0) {
      handleSlide(xTabOne);
    } else {
      handleSlide(xTabTwo);
    }
  }, [active]);
  const fetchPhonePhotos = async () => {
    setPhotos([]);
    if (!isFocused) return;
    const res = await MediaLibrary.requestPermissionsAsync();
    if (!res.granted) {
      await requestPermission();
      return;
    }
    const albums = await MediaLibrary.getAlbumsAsync();
    for (let album of albums) {
      const getPhotos = await MediaLibrary.getAssetsAsync({
        mediaType: "photo",
        album: album,
        sortBy: "modificationTime",
      });
      getPhotos.assets.sort(function (a, b) {
        // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
        return new Date(b.modificationTime) - new Date(a.modificationTime);
      });
      for (let item of getPhotos.assets) {
        const media = await MediaLibrary.getAssetInfoAsync(item.id);
        const manipResult = await manipulateAsync(media.uri, [], {
          compress: 0.1,
          format: SaveFormat.JPEG,
        });
        const photo = { ...media, uri: manipResult.uri, type: "system" };
        // @ts-expect-error TS(2345): Argument of type '(ph: never[]) => { uri: string; ... Remove this comment to see the full error message
        setPhotos((ph) => [...ph, photo]);
      }
    }
  };
  const fetchCharacterImages = async () => {
    setCharacterImages([]);
    for (let item of images) {
      // @ts-expect-error TS(2345): Argument of type '(img: never[]) => { id: any; uri... Remove this comment to see the full error message
      setCharacterImages((img) => [
        ...img,
        {
          id: item.type,
          uri: item.image,
          description: item.description,
          type: item.type,
          value: item.value,
        },
      ]);
    }
  };
  const handleSlide = (type: any) => {
    Animated.spring(translateX, {
      toValue: type,
      // @ts-expect-error TS(2345): Argument of type '{ toValue: any; duration: number... Remove this comment to see the full error message
      duration: 100,
      useNativeDriver: true,
    }).start();
    if (active === 0) {
      Animated.parallel([
        // @ts-expect-error TS(2322): Type 'void' is not assignable to type 'CompositeAn... Remove this comment to see the full error message
        Animated.spring(translateXTabOne, {
          toValue: 0,
          // @ts-expect-error TS(2345): Argument of type '{ toValue: number; duration: num... Remove this comment to see the full error message
          duration: 100,
          useNativeDriver: true,
        }).start(),
        // @ts-expect-error TS(2322): Type 'void' is not assignable to type 'CompositeAn... Remove this comment to see the full error message
        Animated.spring(translateXTabTwo, {
          toValue: width,
          // @ts-expect-error TS(2345): Argument of type '{ toValue: number; duration: num... Remove this comment to see the full error message
          duration: 100,
          useNativeDriver: true,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        // @ts-expect-error TS(2322): Type 'void' is not assignable to type 'CompositeAn... Remove this comment to see the full error message
        Animated.spring(translateXTabOne, {
          toValue: -width,
          // @ts-expect-error TS(2345): Argument of type '{ toValue: number; duration: num... Remove this comment to see the full error message
          duration: 100,
          useNativeDriver: true,
        }).start(),
        // @ts-expect-error TS(2322): Type 'void' is not assignable to type 'CompositeAn... Remove this comment to see the full error message
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          // @ts-expect-error TS(2345): Argument of type '{ toValue: number; duration: num... Remove this comment to see the full error message
          duration: 100,
          useNativeDriver: true,
        }).start(),
      ]);
    }
  };
  const hideDialog = () => {
    setBannerVisible(false);
  };
  const styles = StyleSheet.create({
    imagesContainer: {
      alignItems: "center",
    },

    backgroundStyle: {
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    textStyle: {
      ...globalStyles.textStyle,
      fontSize: 30,
    },
    backButton: {
      position: "absolute",
      left: 5,
    },
    selection: {
      marginTop: "10%",
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
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
  const openModal = () => {
    setModalVisible(true);
  };
  const handleSave = async () => {
    const token = await AsyncStorage.getItem("token");
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    if (item.type === "update") {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (item.item.type === "Profile Image") {
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
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            if(prop.value === item.item.value) prop.type = "Profile Image"
            else prop.type = "Image"
        }
      }
      const update = {
        id: heroId,
        updateDefinition: characterProps.data
      }
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
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    else if(item.type === "create"){
        const files=[];
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        const img = await MediaLibrary.getAssetInfoAsync(item.item.id)
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
        // @ts-expect-error TS(2552): Cannot find name 'File'. Did you mean 'file'?
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
              prop.type = "Image"
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
  const deleteImage = async(token: any, ip: any, data: any) =>{
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
 
  const handleDescription = (e: any) => useCallback(() => {
    setDescription(e)
  }, []);
  return (
    <View style={{ marginTop: "10%" }}>
      <View style={styles.backgroundStyle}>
        <IonIcon
          style={styles.backButton}
          name="arrow-back-circle"
          color="#DAA520"
          size={30}
          onPress={() =>
            navigation.navigate("MyProperties", {
              heroId: heroId,
              navigation: navigation,
            })
          }
        />
        <Text style={styles.textStyle}>Choose Photo</Text>
      </View>
      <View style={styles.selection}>
        <TouchableOpacity onPress={() => setActive(0)}>
          <Text
            style={{
              ...styles.textStyle,
              color: active === 0 ? "#DAA520" : "white",
            }}
          >
            Camera Album
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActive(1)}>
          <Text
            style={{
              ...styles.textStyle,
              color: active === 1 ? "#DAA520" : "white",
            }}
          >
            Uploaded Photos
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: [
            {
              translateX: translateXTabOne,
            },
          ],
        }}
        onLayout={(event) => setTranslateY(event.nativeEvent.layout.height)}
      >
        {photos.length > 0 && (
          <FlatList
            contentContainerStyle={styles.imagesContainer}
            data={photos}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableImage
                // @ts-expect-error TS(2322): Type '{ item: never; type: string; setItem: Dispat... Remove this comment to see the full error message
                item={item}
                type={"create"}
                setItem={setItem}
                openModal={openModal}
              />
            )}
            // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={2} // Reduce initial render amount
            maxToRenderPerBatch={1} // Reduce number in each render batch
            updateCellsBatchingPeriod={100} // Increase time between renders
            windowSize={3} // Reduce the window size
          />
        )}
      </Animated.View>
      <Animated.View
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: [
            {
              translateX: translateXTabTwo,
            },
            {
              translateY: -translateY,
            },
          ],
        }}
      >
        <FlatList
          contentContainerStyle={styles.imagesContainer}
          data={characterImages}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableImage
              // @ts-expect-error TS(2322): Type '{ item: never; type: string; setItem: Dispat... Remove this comment to see the full error message
              item={item}
              type={"update"}
              setItem={setItem}
              openModal={openModal}
            />
          )}
          // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
          keyExtractor={(item) => item.id}
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={3} // Reduce the window size
        />
      </Animated.View>
      {
        item &&
        <CustomModal
        onConfrim={handleSave}
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={'Are you sure you want to change your profile Image?'}
        Children={
        <Children 
          description={description} 
          setDescription={setDescription}
          item={item}
          styles={styles}
        />}
        />
      }
     
      <Banner
        hideDialog={hideDialog}
        visible={bannerVisible}
        text={bannerText}
      />
    </View>
  );
};

const Children = ({
  description,
  setDescription,
  item,
  styles
}: any) => {
  useEffect(()=>{
    console.log('f')

  },[])
  if (item.type === "create")
    return (
      <TextInput
        placeholderTextColor={"rgba(255,255,255, 0.3)"}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        style={styles.textInput}
      ></TextInput>
    );
  else return <></>;
}