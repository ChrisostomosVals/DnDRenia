import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard
} from "react-native";
import { Card } from "@rneui/base";
import { globalStyles } from "../utils/styles";
import { Banner } from "../components/banner";
import IonIcon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConnectApi from "../dist/api/ConnectApi"
import UserApi from "../dist/api/UserApi";
import { ip } from "../utils/constants";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [message, setMessage] = useState({});

  const hideDialog = () => {
    setVisible(false);
    props.handleRender();
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    form: {
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      width: "80%",
    },
    loginTitle: {
      ...globalStyles.textStyle,
      fontSize: 40,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      position: "absolute",
      right: 10,
    },
  });

  const login = async () => {
    const response = await ConnectApi.LoginAsync(email, password, ip)
    if (response.isError) {
      setMessage({
        title: "Login Failed",
        paragraph: response.error.message.error_description,
      });
      setVisible(true);
    } else {
      const data = response.data
      await AsyncStorage.setItem("token", data.access_token);
      await AsyncStorage.setItem("refreshToken", data.refresh_token);
      await AsyncStorage.setItem("scope", data.scope);
      await AsyncStorage.setItem("tokenType", data.token_type);
      await AsyncStorage.setItem(
        "tokenExpiration",
        data.expires_in.toString()
      );
      let user = await UserApi.GetProfileAsync(data.access_token, ip);
      if(user.isError){
        setMessage({
          title: "Fetching Profile Failed",
          paragraph: user.error,
        });
        return;
      }
      if(user.data.characterId){
        await AsyncStorage.setItem('heroId', user.data.characterId);
      }
      let name = user.data.name ? user.data.name : user.data.email;
      setMessage({
        title: "Login Successfull",
        paragraph: `Welcome ${name}`,
      });
      setVisible(true);
    }
    Keyboard.dismiss();
  };
  return (
    <View style={styles.container}>
      <Card containerStyle={{ ...globalStyles.card }}>
        <Card.Title h4>
          <Text style={styles.loginTitle}>Sign In</Text>
        </Card.Title>
        <View style={styles.form}>
          <TextInput
            placeholder="example@mail.com"
            value={email}
            style={{ ...globalStyles.input, maxWidth: "100%", width: "100%" }}
            onChangeText={setEmail}
          />
          <View style={styles.row}>
            <TextInput
              placeholder="********"
              value={password}
              secureTextEntry={passwordHidden}
              style={{ ...globalStyles.input, maxWidth: "100%", width: "100%" }}
              onChangeText={setPassword}
            />

            <IonIcon
              style={styles.icon}
              name={passwordHidden ? "eye-off" : "eye"}
              size={20}
              onPress={() => setPasswordHidden(!passwordHidden)}
            />
          </View>
        </View>
          <View style={styles.form}>
            <TouchableOpacity
              style={{ ...globalStyles.buttonStyle, width: "50%", opacity: email === "" || password === "" ? 0.4 : 1 }}
              onPress={login}
              disabled={email === "" || password === ""}
            >
              <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
      </Card>
      <Banner hideDialog={hideDialog} visible={visible} text={message} />
    </View>
  );
};
