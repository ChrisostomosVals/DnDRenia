import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, BackHandler } from "react-native";
import { globalStyles } from "../utils/styles";
import { Card } from "@rneui/base";
import { useState, useEffect, useCallback } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ScrollView } from "react-native-gesture-handler";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import CharacterApi from "../dist/api/CharacterApi";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import ClassApi from "../dist/api/ClassApi";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import RaceApi from "../dist/api/RaceApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import { MediaApi } from "../dist/api/MediaApi";
import Carousel from 'react-native-reanimated-carousel';
import IonIcon from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { ip } from "../utils/constants";

export const CharacterInfo = ({
  route,
  navigation
}: any) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState({});
  const [token, setToken] = useState();
  const [images, setImages] = useState([])
  const [profileImage, setProfileImage] = useState()
  const [enabled, setEnabled] = useState(false)
  const [showImage, setShowImage] = useState({
    uri: '',
    show: false
  })
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  useEffect(() => {
    fetchCharacter();
  }, [route]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Characters", {navigation: navigation});
        return true
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        BackHandler.removeEventListener('hardwareBackPress');
    }, [])
  );
  const fetchCharacter = async () => {
    setEnabled(false)
    const token = await AsyncStorage.getItem("token");
    setImages([])
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    setProfileImage()
    // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
    setToken(token);
    const getCharacter = await CharacterApi.GetByIdAsync(token, ip, characterId);
    if (getCharacter.isError) {
      console.log(getCharacter.error)
      return;
    }
    const characterClass = await ClassApi.GetByIdAsync(token, ip, getCharacter.data.classId);
    if (characterClass.isError) {
      console.log(characterClass.error)
      return;
    }
    const characterRace = await RaceApi.GetByIdAsync(token, ip, getCharacter.data.raceId);
    if (characterRace.isError) {
      console.log(characterRace.error)
      return;
    }
    setCharacter({ ...getCharacter.data, raceName: characterRace.data.name, className: characterClass.data.name });

    for (let prop of getCharacter.data.properties) {
      if (prop.type === "Profile Image") {

        const downloadFile = await MediaApi.DownloadAsync(token, ip, encodeURIComponent(prop.value))
        if (downloadFile.isError) {
          console.log(downloadFile.error)
          return;
        }
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(downloadFile.data);
        fileReaderInstance.onload = () => {
          let base64data = fileReaderInstance.result;
          // @ts-expect-error TS(2345): Argument of type 'string | ArrayBuffer' is not ass... Remove this comment to see the full error message
          setProfileImage(base64data);
          // @ts-expect-error TS(2345): Argument of type '(img: never[]) => { image: strin... Remove this comment to see the full error message
          setImages(img => [...img, {image: base64data, description: prop.description}]);
        }
      }
      else if (prop.type === "Image") {
        const downloadFile = await MediaApi.DownloadAsync(token, ip, encodeURIComponent(prop.value))
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(downloadFile.data);
        fileReaderInstance.onload = () => {
          let base64data = fileReaderInstance.result;
          // @ts-expect-error TS(2345): Argument of type '(img: never[]) => { image: strin... Remove this comment to see the full error message
          setImages(img => [...img, {image: base64data, description: prop.description}]);
        }
      }
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    info: {
      justifyContent: 'space-around',
      alignSelf: 'center',
      width: '80%'
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10
    },
    welcomeStyle: {
      borderRadius: 5,
      fontSize: 30,
      color: 'white',
      textAlign: "center",
      backgroundColor: 'rgba(16,36,69,0.95)',
    },
    // @ts-expect-error TS(2322): Type '() => { alignItems: string; fontSize: number... Remove this comment to see the full error message
    textStyle: () => {
      let color

      // @ts-expect-error TS(2339): Property 'raceName' does not exist on type '{}'.
      switch (character.raceName) {
        case 'Half-Orcs':
          color = '#6B8E23'
          break;
        case 'Humans':
          color = '#DAA520'
          break;
        default:
          color = 'white'
          break;
      }
      return (
        {
          alignItems: 'flex-end',
          fontSize: 20,
          color: color
        }
      )
    },

  });

  const ImageView = (uri: any) => {
    navigation.navigate("ImageView", {uri: uri, characterId: characterId})
  }

  return (
    <View style={styles.container}>
      {enabled ?
        <>
          <IonIcon
            name="arrow-back-circle"
            color="#DAA520"
            size={30}
            style={{ left: 30, top: 50, position: 'absolute' }}
            onPress={() => setEnabled(false)}
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
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                <Text style={{...globalStyles.textStyle, ...styles.welcomeStyle}}>{images[index].description}</Text>
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                <TouchableOpacity onPress={() => ImageView(images[index].image)} activeOpacity={1}>
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  <Image source={{ uri: images[index].image }} style={{ width: width, height: height / 2 }} />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
        :

        <>
          {profileImage ?
            <TouchableOpacity onPress={() => setEnabled(!enabled)}>
              <Image source={{ uri: profileImage }} style={{ width: 80, height: 80, borderRadius: 80 / 2 }} />
            </TouchableOpacity>
            : <View style={{ width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: 'black' }}></View>}
          <Card containerStyle={{ width: "80%", height: '50%', ...globalStyles.card }}>
            // @ts-expect-error TS(2339): Property 'raceName' does not exist on type '{}'.
            {character.raceName && (
              <>
                // @ts-expect-error TS(2339): Property 'type' does not exist on type '{}'.
                <Card.Title h4><Text style={globalStyles.textStyle}>{character.type}</Text></Card.Title>
                <ScrollView style={{ flexGrow: 0.85 }}>
                  <View style={styles.info}>
                    <View style={styles.rowContainer}>
                      <Text style={{ ...globalStyles.textStyle, color: '#CD853F', fontSize: 20 }}>Name:</Text>
                      // @ts-expect-error TS(2349): This expression is not callable.
                      <Text style={{ ...globalStyles.textStyle, ...styles.textStyle() }}>{character.name}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={{ ...globalStyles.textStyle, color: '#CD853F', fontSize: 20 }}>Class:</Text>
                      // @ts-expect-error TS(2349): This expression is not callable.
                      <Text style={{ ...globalStyles.textStyle, ...styles.textStyle() }}>{character.className}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={{ ...globalStyles.textStyle, color: '#CD853F', fontSize: 20 }}>Race:</Text>
                      // @ts-expect-error TS(2349): This expression is not callable.
                      <Text style={{ ...globalStyles.textStyle, ...styles.textStyle() }}>{character.raceName.slice(0, -1)}</Text>
                    </View>
                    {
                      // @ts-expect-error TS(2339): Property 'stats' does not exist on type '{}'.
                      character.stats.length > 0 &&
                      // @ts-expect-error TS(2339): Property 'stats' does not exist on type '{}'.
                      character.stats.map((c: any) => <View key={c.name} style={styles.rowContainer}>
                        <Text style={{ ...globalStyles.textStyle, color: '#CD853F', fontSize: 20 }}>{c.name}:</Text>
                        // @ts-expect-error TS(2322): Type '`gender-${any}`' is not assignable to type '... Remove this comment to see the full error message
                        {c.name === "Gender" && c.value !== "-" ?  <MaterialCommunityIcons name={`gender-${c.value.toLowerCase()}`} size={20} color={styles.textStyle().color} />
                          :
                          // @ts-expect-error TS(2349): This expression is not callable.
                          <Text style={{ ...globalStyles.textStyle, ...styles.textStyle() }}>{c.value}</Text>
                        }

                      </View>)

                    }

                  </View>
                </ScrollView>
              </>
            )}
          </Card>
        </>}
    </View>
  );
};


