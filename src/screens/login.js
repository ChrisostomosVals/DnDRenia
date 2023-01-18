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
import { UserApi } from "../utils/api.service";

export const Login = ({render, setRender}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [message, setMessage] = useState({});

  const hideDialog = () => {
    setVisible(false);
    setRender(!render);
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
    const details = {
      username: email,
      password: password,
      grant_type: "password",
      client_id: "renia:4ae25ed28196396194f9fd9b3af0a1ae",
      client_secret: "!R3n!@S3cr3t",
    };
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    let url = await AsyncStorage.getItem("ip");
    let token = await fetch(`${url}gateway/connect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    });
    let response = await token.json();
    if (response.error) {
      setMessage({
        title: "Login Failed",
        paragraph: response.error_description,
      });
      setVisible(true);
    } else {
      await AsyncStorage.setItem("token", response.access_token);
      await AsyncStorage.setItem("refreshToken", response.refresh_token);
      await AsyncStorage.setItem("scope", response.scope);
      await AsyncStorage.setItem("tokenType", response.token_type);
      await AsyncStorage.setItem(
        "tokenExpiration",
        response.expires_in.toString()
      );
      let user = await UserApi.GetProfile();
      if(user.characterId){
        await AsyncStorage.setItem('heroId', user.characterId);
      }
      let name = user.name ? user.name : user.email;
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
        {email != "" && password != "" && (
          <View style={styles.form}>
            <TouchableOpacity
              style={{ ...globalStyles.buttonStyle, width: "50%" }}
              onPress={login}
            >
              <Text style={{ ...globalStyles.textStyle, fontSize: 30 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Card>
      <Banner hideDialog={hideDialog} visible={visible} text={message} />
    </View>
  );
};
