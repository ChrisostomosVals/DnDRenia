import {
  FlatList,
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  Text,
} from "react-native";
import { TouchableImage } from "../components/TouchableImage";
import { Banner } from "../components/banner";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { globalStyles } from "../utils/styles";
import * as MediaLibrary from "expo-media-library";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { CustomModal } from "../components/CustomModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CharacterApi from "../dist/api/CharacterApi";
import { MediaApi } from "../dist/api/MediaApi";
import { ip } from "../utils/constants";

export const AddImages = ({ route }) => {
  const { heroId, navigation } = route.params;
  const isFocused = useIsFocused();
  const [photos, setPhotos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerText, setBannerText] = useState({
    title: "",
    paragraph: "",
  });
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("MyProperties", {
          navigation: navigation,
          heroId: heroId,
        });
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => BackHandler.removeEventListener("hardwareBackPress");
    }, [])
  );
  useEffect(() => {
    fetchPhonePhotos();
    setModalVisible(false);
  }, [isFocused]);
  const hideDialog = () => {
    setBannerVisible(false);
  };
  const openModal = () => {
    setModalVisible(true);
  };
  const fetchPhonePhotos = async () => {
    setPhotos([]);
    setItems([]);
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
        return new Date(b.modificationTime) - new Date(a.modificationTime);
      });
      for (let item of getPhotos.assets) {
        const media = await MediaLibrary.getAssetInfoAsync(item.id);
        const manipResult = await manipulateAsync(media.uri, [], {
          compress: 0.1,
          format: SaveFormat.JPEG,
        });
        const photo = { ...media, uri: manipResult.uri, type: "system" };
        setPhotos((ph) => [...ph, photo]);
      }
    }
  };
  const upload = async () => {
    const token = await AsyncStorage.getItem("token");
    const files = [];
    for (let item of items) {
      const img = await MediaLibrary.getAssetInfoAsync(item.id);
      const response = await fetch(img.uri);
      const blob = await response.blob();
      const file = new File([img.filename], blob._data.name, {
        type: blob._data.type,
      });
      files.push({
        name: file.name,
        type: file.type,
        uri: img.uri,
      });
    }
    const character = await CharacterApi.GetByIdAsync(token, ip, heroId);
    if (character.isError) {
      console.log(character.error, "character");
      setBannerText({
        title: "Error",
        paragraph: "There was an error uploading images",
      });
      setModalVisible(false);
      setBannerVisible(true);
      return;
    }
    const uploadImages = {
      type: "character",
      name: character.data.name,
      files: files,
    };
    const upload = await MediaApi.UploadAsync(token, ip, uploadImages);

    if (upload.isError) {
      console.log(upload.error, "upload");
      setBannerText({
        title: "Error",
        paragraph: "There was an error uploading images",
      });
      setModalVisible(false);
      setBannerVisible(true);
      return;
    }
    const props = await CharacterApi.GetPropertiesAsync(token, ip, heroId);
    if (props.isError) {
      console.log(props.error);
      setModalVisible(false);
      setBannerText({
        title: "Error",
        paragraph: "There was an error uploading images",
      });
      setBannerVisible(true);
      return () => deleteImages(token, ip, upload.data);
    }
    for(let path of upload.data){
      props.data.push({
        type: "Image",
        value: path
      })
    }
    const update = {
      id: heroId,
      updateDefinition: props.data
    }
    const updatedProps = await CharacterApi.UpdatePropertiesAsync(token, ip, update);
    if(updatedProps.isError){
      console.log(updatedProps.error, 'updatedProps')
      setBannerText({
          title: "Error",
          paragraph: "There was an error uploading images",
        });
        setModalVisible(false);
        setBannerVisible(true);
        return await deleteImages(token, ip, upload.data);
    }
    setBannerText({
      title: "Upload successfull",
      paragraph: "Images have been uploaded",
    });
    setModalVisible(false);
    setBannerVisible(true);
  };
  const deleteImages = async (token, ip, data) => {
    for (let path of data) {
      const deleteImage = await MediaApi.DeleteAsync(
        token,
        ip,
        encodeURIComponent(path)
      );
      if (deleteImage.isError) {
        console.log(deleteImage.error, "deleteImage");
        setBannerText({
          title: "Profile Image",
          paragraph: "Please contact the developer",
        });
        setModalVisible(false);
        setBannerVisible(true);
        return;
      }
    }
  };
  return (
    <View style={{ marginTop: "10%" }}>
      <FlatList
        contentContainerStyle={styles.imagesContainer}
        data={photos}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableImage
            item={item}
            type={"new"}
            setItem={setItems}
            openModal={openModal}
          />
        )}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={2} // Reduce initial render amount
        maxToRenderPerBatch={1} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
        windowSize={3} // Reduce the window size
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ ...styles.uploadButton, opacity: items.length > 0 ? 1 : 0.5 }}
      >
        <Text style={styles.textStyle}>Upload</Text>
      </TouchableOpacity>
      <Banner
        hideDialog={hideDialog}
        visible={bannerVisible}
        text={bannerText}
      />
      <CustomModal
        onConfrim={upload}
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={`Are you sure you want to upload the selected  (${items.length}) items?`}
        children={<></>}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  imagesContainer: {
    alignItems: "center",
  },
  uploadButton: {
    ...globalStyles.button,
    position: "relative",
    bottom: 100,
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
});
