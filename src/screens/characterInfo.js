import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, BackHandler } from "react-native";
import { globalStyles } from "../utils/styles";
import { Card } from "@rneui/base";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ScrollView } from "react-native-gesture-handler";
import CharacterApi from "../dist/api/CharacterApi";
import ClassApi from "../dist/api/ClassApi";
import RaceApi from "../dist/api/RaceApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MediaApi } from "../dist/api/MediaApi";
import Carousel from 'react-native-reanimated-carousel';
import IonIcon from "react-native-vector-icons/Ionicons";


export const CharacterInfo = ({ route }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState({});
  const [ip, setIp] = useState();
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
    setShowImage({
      uri: '',
      show: false
    });
    const backAction = () => {
      setShowImage({
        uri: '',
        show: false
      });
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [route]);


  const fetchCharacter = async () => {
    setEnabled(false)
    const token = await AsyncStorage.getItem("token");
    const ip = await AsyncStorage.getItem("ip");
    setImages([])
    setProfileImage()
    setIp(ip);
    setToken(token);
    const getCharacter = await CharacterApi.GetByIdAsync(token, ip, characterId);
    if (getCharacter.isError) {
      console.log(getCharacter.error)
      return;
    }
    console.log(getCharacter.data.classId)
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

    for (var prop of getCharacter.data.properties) {
      if (prop.type === "Profile Image") {

        const downloadFile = await MediaApi.DownloadAsync(token, ip, encodeURIComponent(prop.value))
        if (downloadFile.isError) {
          console.log(downloadFile.error)
          return;
        }
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(downloadFile.data);
        fileReaderInstance.onload = () => {
          base64data = fileReaderInstance.result;
          setProfileImage(base64data);
          setImages(img => [...img, base64data]);
        }
      }
      else if (prop.type === "Image") {
        const downloadFile = await MediaApi.DownloadAsync(token, ip, encodeURIComponent(prop.value))
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(downloadFile.data);
        fileReaderInstance.onload = () => {
          base64data = fileReaderInstance.result;
          setImages(img => [...img, base64data]);
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
    textStyle: () => {
      let color

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
  return (
    !showImage.show ?
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
                  <TouchableOpacity onPress={() => setShowImage({ show: true, uri: images[index] })} activeOpacity={1}>
                    <Image source={{ uri: images[index] }} style={{ width: width, height: height / 2 }} />
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
              {character.raceName && (
                <>
                  <Card.Title h4><Text style={globalStyles.textStyle}>{character.type}</Text></Card.Title>
                  <ScrollView style={{ flexGrow: 0.85 }}>
                    <View style={styles.info}>
                      <View style={styles.rowContainer}>
                        <Text style={{ ...globalStyles.textStyle, color: '#CD853F', fontSize: 20 }}>Name:</Text>
                        <Text style={{ ...globalStyles.textStyle, ...styles.textStyle() }}>{character.name}</Text>
                      </View>
                      <View style={styles.rowContainer}>
                        <Text style={{ ...globalStyles.textStyle, color: '#CD853F', fontSize: 20 }}>Class:</Text>
                        <Text style={{ ...globalStyles.textStyle, ...styles.textStyle() }}>{character.className}</Text>
                      </View>
                      <View style={styles.rowContainer}>
                        <Text style={{ ...globalStyles.textStyle, color: '#CD853F', fontSize: 20 }}>Race:</Text>
                        <Text style={{ ...globalStyles.textStyle, ...styles.textStyle() }}>{character.raceName.slice(0, -1)}</Text>
                      </View>
                      {
                        character.stats.length > 0 &&
                        character.stats.map(c => (
                          <View key={c.name} style={styles.rowContainer}>
                            <Text style={{ ...globalStyles.textStyle, color: '#CD853F', fontSize: 20 }}>{c.name}:</Text>
                            {c.name === "Gender" ? <MaterialCommunityIcons name={`gender-${c.value.toLowerCase()}`} size={20} color={styles.textStyle().color} />
                              :
                              <Text style={{ ...globalStyles.textStyle, ...styles.textStyle() }}>{c.value}</Text>
                            }

                          </View>
                        ))

                      }

                    </View>
                  </ScrollView>
                </>
              )}
            </Card>
          </>}
      </View>
      :
      <Image source={{ uri: showImage.uri }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
  );
};


