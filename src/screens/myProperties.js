import { useEffect, useState, useRef } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import CharacterApi from "../dist/api/CharacterApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MediaApi } from "../dist/api/MediaApi";
import { globalStyles } from "../utils/styles";
import { ProfileSheet } from "../components/profileSheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {EasingNode, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { ip } from "../utils/constants";

export const MyProperties = ({ heroId, navigation }) => {
  const isFocused = useIsFocused();
  const [properties, setProperties] = useState([]);
  const [images, setImages] = useState([]);
  const [profileImage, setProfileImage] = useState();
  const [profileModal, setProfileModal] = useState(false);
  const [stats, setStats] = useState([]);
  const renderedStats = [
    "Gender",
    "Age",
    "Size",
    "Age",
    "Height",
    "Weight",
    "Hair",
    "Eyes",
    "Deity"
  ];
  const [edit, setEdit] = useState(false);
  const bottomSheetRef = useRef();
  // const spinnerValue = useSharedValue(new Animated.Value(0))
 
  // spinnerValue.value = withRepeat(
  //   withTiming(1, { duration: 1000, easing: EasingNode.linear }),
  //   -1,
  //   true
  // );
  // const spin = spinnerValue.value.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '360deg']
  // })
  // const style = useAnimatedStyle(() => ({ rotate: spin }), []);
useEffect(() => {
  fetchProperties();
  fetchStats();
    setProfileModal(false);
  }, [isFocused]);
  const fetchProperties = async () => {
    setImages([]);
    if (!isFocused) return;
    const token = await AsyncStorage.getItem("token");
    const props = await CharacterApi.GetPropertiesAsync(token, ip, heroId);
    if (props.isError) {
      console.log(props.error, "MyProperties.fetchProperties");
      return;
    }
    for (let prop of props.data) {
      if (prop.type === "Profile Image") {
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
          setProfileImage(base64data);
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
      } else if (prop.type === "Image") {
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
      }
    }
  };
  const fetchStats = async () => {
    setStats([]);

    if (!isFocused) return;
    const token = await AsyncStorage.getItem("token");
    const getStats = await CharacterApi.GetStatsAsync(token, ip, heroId);
    if (getStats.isError) {
      console.log(getStats.error, "MyProperties.fetchStats");
      return;
    }
    getStats.data.forEach((stat) => {
      setStats((st) => [...st, stat]);
    });
  };
  const styles = StyleSheet.create({
    body: {},
    profileSection: {
      marginTop: "25%",
    },
    backgroundStyle: {
      fontSize: 30,
      color: "white",
      textAlign: "center",
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
      ...globalStyles.textStyle,
    },
    profileImage: {
      alignSelf: "center",
      width: 80,
      height: 80,
      borderRadius: 80 / 2,
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 10,
    },
    info: {
      width: "40%",
      margin: "10%",
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingRight: 5,
      paddingLeft: 5,
      paddingTop: 5
    },
  });
  const handleStat = (e, index) =>{
    const newItems = [...stats]; // create a copy of the array
    newItems[index].value = e; // update the copy of the array
    setStats(newItems)
    
  }
  const startRotating = () =>{
    Animated.timing(
      spinValue,
      {
       toValue: 3,
       duration: 3000,
       easing: EasingNode.linear,
       useNativeDriver: true,
      },
    ).start();
  }
  const handleSheet = () => {
    if (profileModal) {
      setProfileModal(false);
      bottomSheetRef.current.snapToIndex(0);
    } else {
      setProfileModal(true);
      bottomSheetRef.current.close();
    }
  };
  const handleSave = async() =>{

  }
  
  return (
    <>
        {stats.length > 0 ?
              <View style={styles.body}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handleSheet}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
        <View style={styles.header}>
        {edit ? (
            <>
              <MaterialCommunityIcons
                onPress={() => setEdit(false)}
                name="lock-open"
                size={20}
                color="white"
              />
              <MaterialCommunityIcons
                name="content-save"
                color="white"
                onPress={handleSave}
                size={20}
              />
            </>
          ) : (
            <MaterialCommunityIcons
              onPress={() => setEdit(true)}
              name="lock"
              color="#DAA520"
              size={20}
            />
          )}
          </View>
          
            {stats.map((s, index) => {
              if (renderedStats.includes(s.name)) {
                return (
                  <View key={s.name} style={styles.rowContainer}>
                    <Text
                      style={{
                        ...globalStyles.textStyle,
                        color: "#CD853F",
                        fontSize: 20,
                      }}
                    >
                      {s.name}:
                    </Text>
                    <TextInput
                      style={{
                        ...globalStyles.textStyle,
                        color: "#CD853F",
                        fontSize: 20,
                        borderRadius: 3,
                        borderColor: edit ? "white" : null,
                        borderWidth: 1, 
                        paddingRight: 5,
                        paddingLeft: 5,
                        opacity: edit ? 1: 0.6
                      }}
                      editable={edit}
                      value={s.value}
                      onChangeText={(e) => handleStat(e, index)}
                    >
                    </TextInput>
                  </View>
                );
              }
            })}
            </View> 
            </View>:
            <Animated.Image
            // style={{transform: [{rotate: style}], alignSelf: 'center', marginTop: 100 }}
            style={{alignSelf: 'center', marginTop: 100 }}
            source={require("../assets/images/dnd-spinner.png")} />
          }
      <ProfileSheet
        refs={bottomSheetRef}
        images={images}
        navigation={navigation}
        heroId={heroId}
      />
    </>
  );
};
const spinValue = new Animated.Value(0);
// Next, interpolate beginning and end values (in this case 0 and 1)


