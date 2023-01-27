import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, Text, Alert, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { SettingsScreen } from "./src/screens/settingsScreen";
import { Index } from "./src/screens";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/AntDesign";
import { Characters } from "./src/screens/characters";
import { navigationRef } from "./src/navigations/RootNavigation";
import { CharacterInfo } from "./src/screens/characterInfo";
import { Provider as PaperProvider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useNetInfo } from "@react-native-community/netinfo";
import { MyGear } from "./src/screens/myGear";
import { BuyGear } from "./src/screens/buyGear";
import { Audio } from "expo-av";
import { Map } from "./src/screens/map";
import { getSoundEffectsMode } from "./src/utils/constants";
import { Login } from "./src/screens/login";
import { LogOut } from "./src/components/logout";
import UserApi from "./src/dist/api/UserApi";

const Drawer = createDrawerNavigator();

export default function App() {
  const [loaded, error] = useFonts({
    BlackCastle: require("./assets/fonts/Blackcastle.ttf"),
  });
  const netInfo = useNetInfo();
  const [heroId, setHeroId] = useState(0);
  const [sound, setSound] = useState();
  const [soundEffects, setSoundEffects] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [userRole, setUserRole] = useState();
  useEffect(() => {
    userLoggedIn();
    fetchId();
    (async () => {
      const mode = await getSoundMode();
      const soundEffectsMode = await getSoundEffectsMode();
      if (soundEffectsMode === "on") {
        setSoundEffects(true);
      } else {
        setSoundEffects(false);
      }
      if (mode === "play") {
        playSound();
      }
    })();
  }, [render]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const userLoggedIn = async () => {
    let token = await AsyncStorage.getItem("token");
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  };
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

  const handleRender = () =>{
    setRender(!render)
  }
  const fetchId = async () => {
    const token = await AsyncStorage.getItem('token')
    const ip = await AsyncStorage.getItem('ip')
    const user = await UserApi.GetProfileAsync(token, ip);
    if (user.isError) {
      console.log(user.error)
      setUserRole()
    }
    else{
      setUserRole(user.data.role);
    }
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
  const handleSoundEffects = async () => {
    if ((await getSoundEffectsMode()) === "on") {
      await AsyncStorage.setItem("sound-effects", "off");
      setSoundEffects(false);
    } else {
      await AsyncStorage.setItem("sound-effects", "on");
      setSoundEffects(true);
    }
  };
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
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    soundEffect: {
      bottom: 10,
      left: 10,
      position: "absolute",
    },
  });
  const Settings = (props) => <SettingsScreen {...props} handleRender={handleRender} />;
  const LoginScreen = (props) => <Login {...props} handleRender={handleRender} />;
  const BuyGearScreen = (props) => <BuyGear {...props} heroId = {heroId}  />;
  const MyGearScreen = (props) => <MyGear {...props} heroId = {heroId}  />;
  const renderAppPerRole = () => {
    if (userRole === "PLAYER") {
      return (
        <NavigationContainer
          ref={navigationRef}
          theme={{ colors: { background: "transparent" } }}
        >
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
              initialParams={{setLogoutModalVisible: setLogoutModalVisible}}
            />

            <Drawer.Screen
              name="Characters"
              options={{
                title: "Characters",
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <Icon
                    name="team"
                    size={20}
                    color={focused ? "#7cc" : "#ccc"}
                  />
                ),
              }}
              component={Characters}
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
              component={BuyGearScreen}
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
              component={Settings}
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
              component={MyGearScreen}
              options={{
                title: "",
                headerShown: false,
                drawerItemStyle: { height: 0 },
              }}
            />
          </Drawer.Navigator>
         
        </NavigationContainer>
      );
    }
    else if(userRole === "GAME MASTER"){
      return(
        <NavigationContainer
          ref={navigationRef}
          theme={{ colors: { background: "transparent" } }}
        >
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
        initialParams={{setLogoutModalVisible: setLogoutModalVisible}}
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
              component={Settings}
            />
      </Drawer.Navigator>
      </NavigationContainer>
      )
    }
    else{
    return  <NavigationContainer
      ref={navigationRef}
      theme={{ colors: { background: "transparent" } }}
    >
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
              component={Settings}
            />
         </Drawer.Navigator>
      </NavigationContainer>
    }
  };

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
        {!isLoggedIn ? (
          
           <NavigationContainer
           ref={navigationRef}
           theme={{ colors: { background: "transparent" } }}
         >

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
               name="Login"
               options={{
                 title: "Login",
                 headerShown: false,
                 drawerIcon: ({ focused, size }) => (
                   <MaterialCommunityIcons
                     name="login"
                     size={20}
                     color={focused ? "#7cc" : "#ccc"}
                   />
                 ),
               }}
               component={LoginScreen}
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
               component={Settings}
               />
       </Drawer.Navigator>
       </NavigationContainer>
        ) : (
          renderAppPerRole()
        )}
      </PaperProvider>
      <View style={styles.sound}>
        <MaterialCommunityIcons
          name={!sound ? "music-note-off" : "music-note"}
          size={20}
          onPress={handleMusic}
        />
        <MaterialCommunityIcons
          name={soundEffects ? "volume-high" : "volume-off"}
          size={20}
          onPress={handleSoundEffects}
        />
      </View>

      <LogOut
        setModalVisible={setLogoutModalVisible}
        modalVisible={logoutModalVisible}
        handleRender={handleRender}
      />
    </ImageBackground>
  );
}
