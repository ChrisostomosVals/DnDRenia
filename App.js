import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, Text, Alert, Image } from "react-native";
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
import {useNetInfo} from "@react-native-community/netinfo";
import { MyGear } from "./src/screens/myGear";
import { BuyGear } from "./src/screens/buyGear";
import { GoodCategory } from "./src/screens/goodCategory";


const Drawer = createDrawerNavigator();

export default function App() {
  const [loaded, error] = useFonts({
    BlackCastle: require("./assets/fonts/Blackcastle.ttf"),
  });
  const netInfo = useNetInfo();
  const [reload, setReload] = useState(false);
  const [heroId, setHeroId] = useState(0);
  useEffect(() => {
    fetchId();
  }, []);
  
  const fetchId = async () => {
    const id = await AsyncStorage.getItem("heroId");
    setHeroId(id);
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
      color: 'white'
    },
  });

  if (!loaded) return <Text>Loading...</Text>;
  if(!netInfo.isConnected){
    return <ImageBackground
    style={styles.backgroundImage}
    source={require("./src/assets/images/renia.png")}
    resizeMode="cover"
  >{ Alert.alert(
      
      "Check your connection",
      "Renia seems unreachable"
    )}
    </ImageBackground>
  }
  const ChangeHero = props  => {
    return <ChooseHero reload={() => setReload(!reload)} {...props}/>
  }

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("./src/assets/images/renia.png")}
      resizeMode="cover"
    >
      <PaperProvider>
        <NavigationContainer
          ref={navigationRef}
          theme={{ colors: { background: "transparent" }}}
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
                  component={ChangeHero}
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
                      initialParams={{heroId: heroId}}
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
                  initialParams={{heroId: heroId}}
                />
                <Drawer.Screen
                  name="GoodCategory"
                  component={GoodCategory}
                  options={{
                    title: "",
                    headerShown: false,
                    drawerItemStyle: { height: 0 },
                  }}
                />
              </Drawer.Navigator>
            </>
          )}
        </NavigationContainer>
      </PaperProvider>
    </ImageBackground>
  );
}
