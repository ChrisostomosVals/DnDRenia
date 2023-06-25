import { Text } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { PaperProvider } from "react-native-paper";
import { Banner } from "./src/components/Banner/Banner";
import { Index } from "./src/screens/Index/Index";
import { CustomModal } from "./src/components/Modal/Modal";

export default function App() {
  const [loaded, error] = useFonts({
    BlackCastle: require("./assets/fonts/Blackcastle.ttf"),
    Luminari: require("./assets/fonts/Luminari-Regular.ttf"),
  });

  if (!loaded) return <Text>Loading...</Text>;
  return (
    <Provider store={store}>
      <PaperProvider>
        <Index />
        <Banner />
      </PaperProvider>
    </Provider>
  );
}
