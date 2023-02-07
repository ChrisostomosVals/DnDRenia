import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { globalStyles } from "../utils/styles";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { TouchableImage } from "../components/TouchableImage";
import { ChangeProfileImageModal } from "../components/changeProfileImageModal";
import { Banner } from "../components/banner";

export const ChooseProfileImage = ({ route, navigation }) => {
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
  const fetchCharacterImages = async () => {
    setCharacterImages([]);
    for (let item of images) {
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
  const handleSlide = (type) => {
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: true,
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
          useNativeDriver: true,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
          useNativeDriver: true,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
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
  });
  const openModal = () => {
    setModalVisible(true);
  };
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
                item={item}
                type={"create"}
                setItem={setItem}
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
              item={item}
              type={"update"}
              setItem={setItem}
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
      </Animated.View>
      {
        item &&
         <ChangeProfileImageModal
        image={item}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setBannerText={setBannerText}
        setBannerVisible={setBannerVisible}
        heroId={heroId}
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
