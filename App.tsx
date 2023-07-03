import { Dimensions, Text } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { PaperProvider } from "react-native-paper";
import { Banner } from "./src/components/Banner/Banner";
import { Index } from "./src/screens/Index/Index";
import { useCallback, useEffect, useState } from "react";
import { Audio } from "expo-av";
import { getSoundEffectsMode } from "./src/utils/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { indexStyles } from "./src/screens/Index/Index.style";

export default function App() {
  const [loaded, error] = useFonts({
    BlackCastle: require("./assets/fonts/Blackcastle.ttf"),
    Luminari: require("./assets/fonts/Luminari-Regular.ttf"),
  });
  const [sound, setSound] = useState<Audio.Sound>();
  const [soundEffects, setSoundEffects] = useState<boolean>(false);
  const { height } = Dimensions.get("window");
  useEffect(()=>{
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
  },[]);
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  const handleMusic = async (): Promise<void> => {
    if (sound) {
      await sound?.unloadAsync();
      await AsyncStorage.setItem("sound", "stop");
      setSound(undefined);
    } else {
      await playSound();
    }
  };
  const getSoundMode = async (): Promise<string | null> => {
    try {
      const mode: string | null = await AsyncStorage.getItem("sound");
      return mode;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  };
  const handleSoundEffects = useCallback(async (): Promise<void> => {
    if ((await getSoundEffectsMode()) === "on") {
      await AsyncStorage.setItem("sound-effects", "off");
      setSoundEffects(false);
    } else {
      await AsyncStorage.setItem("sound-effects", "on");
      setSoundEffects(true);
    }
  }, []);
  const playSound = async (): Promise<void> => {
    try {
      const { sound: soundObject } = await Audio.Sound.createAsync(
        require("./src/assets/sounds/backgroundSound.mp3"),
        {
          shouldPlay: true,
          isLooping: true,
        }
      );
      await AsyncStorage.setItem("sound", "play");
      await soundObject.playAsync();
      setSound(soundObject);
    } catch (error) {
      console.log(error);
    }
  };
 
  if (!loaded) return <Text>Loading...</Text>;
  return (
    <Provider store={store}>
      <PaperProvider>
        <Index />
        <MaterialCommunityIcons
            name={!sound ? "music-note-off" : "music-note"}
            size={30}
            onPress={handleMusic}
            style={indexStyles.icon.right(height - 45)}
            color={indexStyles.icon.color}
          />
        <Banner />
      </PaperProvider>
    </Provider>
  );
}
