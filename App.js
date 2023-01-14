import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, Text, Alert, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirstLogin } from "./src/screens/firstLogin";
import { NavigationContainer } from "@react-navigation/native";
import { SettingsScreen } from "./src/screens/settingsScreen";
import { Index } from "./src/screens";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/AntDesign";
import { Heroes } from "./src/screens/heroes";
import { navigationRef } from "./src/navigations/RootNavigation";
import { CharacterInfo } from "./src/screens/characterInfo";
import { Provider as PaperProvider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ChooseHero } from "./src/screens/chooseHero";
import { useFonts } from "expo-font";
import { useNetInfo } from "@react-native-community/netinfo";
import { MyGear } from "./src/screens/myGear";
import { BuyGear } from "./src/screens/buyGear";
import { Audio } from "expo-av";
import { Map } from "./src/screens/map";
import { getSoundEffectsMode } from "./src/utils/constants";

const Drawer = createDrawerNavigator();

export default function App() {
  const [loaded, error] = useFonts({
    BlackCastle: require("./assets/fonts/Blackcastle.ttf"),
  });
  const netInfo = useNetInfo();
  const [heroId, setHeroId] = useState(0);
  const [sound, setSound] = useState();
  const [soundEffects, setSoundEffects] = useState(false)
  useEffect( () => {
    fetchId();
    (async () => {
      const mode = await getSoundMode();
      const soundEffectsMode = await getSoundEffectsMode();
      if(soundEffectsMode === 'on'){
        setSoundEffects(true)
      }
      else{
        setSoundEffects(false)
      }
      if (mode === "play") {
        playSound();
      }})();
    
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  
  const getSoundMode = async () => {
    try {
      const mode = await AsyncStorage.getItem("sound");
      return mode;
    } catch (ex) {
      console.log(ex);
    }
  };
  
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./src/assets/sounds/backgroundSound.mp3"),
      {
        shouldPlay: true,
        isLooping: true,
      }
    );
    setSound(sound);
    await AsyncStorage.setItem("sound", "play");
    await sound.playAsync();
  };
  const fetchId = async () => {
    const id = await AsyncStorage.getItem("heroId");
    setHeroId(id);
  };
  const handleMusic = async () => {
    if (sound) {
      setSound();
      await sound.unloadAsync();
      await AsyncStorage.setItem("sound", "stop");
      setSound();
    } else {
      await playSound();
    }
  };
  const handleSoundEffects = async () =>{
    if(await getSoundEffectsMode() === 'on'){
      await AsyncStorage.setItem("sound-effects", 'off');
      setSoundEffects(false)
    }
    else {
      await AsyncStorage.setItem("sound-effects", 'on');
      setSoundEffects(true)
    }
  }
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
    },
    imageIcon: {
      backgroundColor: "transparent",
    },
    drawerTextStyle: {
      fontFamily: "BlackCastle",
      fontSize: 22,
      color: "white",
    },
    sound: {
      bottom: 10,
      paddingRight: 10,
      paddingLeft: 10,
      position: "absolute",
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
    },
    soundEffect: {
      bottom: 10,
      left: 10,
      position: "absolute",

    },
  });

  if (!loaded) return <Text>Loading...</Text>;
  if (!netInfo.isConnected) {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("./src/assets/images/background2.jpg")}
        resizeMode="cover"
      >
        {Alert.alert("Check your connection", "Renia seems unreachable")}
      </ImageBackground>
    );
  }
 

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("./src/assets/images/background2.jpg")}
      resizeMode="cover"
    >
      <PaperProvider>
        <NavigationContainer
          ref={navigationRef}
          theme={{ colors: { background: "transparent" } }}
        >
          {heroId == "" ? (
            <FirstLogin fetchHero={fetchId}></FirstLogin>
          ) : (
            <>
              <Drawer.Navigator
                screenOptions={{
                  drawerStyle: {
                    backgroundColor: "black",
                  },
                  drawerLabelStyle: styles.drawerTextStyle,
                  drawerActiveTintColor: "#7cc",
                }}
              >
                <Drawer.Screen
                  name="Home"
                  component={Index}
                  options={{
                    title: "Home",
                    headerShown: false,
                    drawerIcon: ({ focused, size }) => (
                      <Icon
                        name="home"
                        size={20}
                        color={focused ? "#7cc" : "#ccc"}
                      />
                    ),
                  }}
                />

                <Drawer.Screen
                  name="Heroes"
                  options={{
                    title: "Heroes",
                    headerShown: false,
                    drawerIcon: ({ focused, size }) => (
                      <Icon
                        name="team"
                        size={20}
                        color={focused ? "#7cc" : "#ccc"}
                      />
                    ),
                  }}
                  component={Heroes}
                />
                <Drawer.Screen
                  name="ChooseHero"
                  options={{
                    title: "Choose Hero",
                    headerShown: false,
                    drawerIcon: ({ focused, size }) => (
                      <MaterialCommunityIcons
                        name="sword"
                        size={20}
                        color={focused ? "#7cc" : "#ccc"}
                      />
                    ),
                  }}
                  component={ChooseHero}
                />
                <Drawer.Screen
                  name="BuyGear"
                  options={{
                    title: "Shop",
                    headerShown: false,
                    drawerIcon: ({ focused, size }) => (
                      <MaterialCommunityIcons
                        name="gold"
                        size={20}
                        color={focused ? "#7cc" : "#ccc"}
                      />
                    ),
                  }}
                  component={BuyGear}
                  initialParams={{ heroId: heroId }}
                />
                <Drawer.Screen
                  name="Map"
                  options={{
                    title: "World Map",
                    headerShown: false,
                    drawerIcon: ({ focused, size }) => (
                      <MaterialCommunityIcons
                        name="map"
                        size={20}
                        color={focused ? "#7cc" : "#ccc"}
                      />
                    ),
                  }}
                  component={Map}
                />
                <Drawer.Screen
                  name="Settings"
                  options={{
                    title: "Settings",
                    headerShown: false,
                    drawerIcon: ({ focused, size }) => (
                      <Icon
                        name="setting"
                        size={20}
                        color={focused ? "#7cc" : "#ccc"}
                      />
                    ),
                  }}
                  component={SettingsScreen}
                />
                <Drawer.Screen
                  name="CharacterInfo"
                  component={CharacterInfo}
                  options={{
                    title: "",
                    headerShown: false,
                    drawerItemStyle: { height: 0 },
                  }}
                />
                <Drawer.Screen
                  name="MyGear"
                  component={MyGear}
                  options={{
                    title: "",
                    headerShown: false,
                    drawerItemStyle: { height: 0 },
                  }}
                  initialParams={{ heroId: heroId }}
                />
              </Drawer.Navigator>
            </>
          )}
        </NavigationContainer>
      </PaperProvider>
      <View style={styles.sound}>
          <MaterialCommunityIcons
            name={!sound ? "music-note-off" : "music-note"}
            size={20}
            onPress={handleMusic}
          />
          <MaterialCommunityIcons
            name= { soundEffects ? "volume-high" : "volume-off"}
            size={20}
            onPress={handleSoundEffects}
          />
        
      </View>
    </ImageBackground>
  );
}
