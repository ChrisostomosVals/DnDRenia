import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "@rneui/base";
import { useEffect, useState } from "react";
import { TextInput, Text, StyleSheet, TouchableOpacity, View, Keyboard } from "react-native";
import { Banner } from "../components/banner";
import { globalStyles } from "../utils/styles";
import { useIsFocused } from "@react-navigation/native";

export const SettingsScreen = (props) => {
  const isFocused = useIsFocused();
  const [ip, setIp] = useState('');
  const [saved, setSaved] = useState(false)
  const [visible, setVisible] = useState(false)
  useEffect(() =>{
    getItem();
  },[saved, isFocused, props])
  const getItem = async () =>{
    setIp(await AsyncStorage.getItem('ip'))
  }
  const handleIp = (e) => {
    setIp(e)
  }
  const saveIp = async () => {
    setSaved(!saved)
    if(ip != ''){
      await AsyncStorage.setItem('ip', ip)
      setVisible(true);
      Keyboard.dismiss();
    }
  }
  const hideDialog = () => {
    setVisible(false)
    props.handleRender()
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    form:{
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      width: '80%'
    }
  });
  return (
    <View style={styles.container}>
    <Card containerStyle={globalStyles.card}>
    <Card.Title h4>
    <Text style={globalStyles.textStyle}>Set IP Address</Text>
    </Card.Title>
    <View style={styles.form}>
      <TextInput placeholder="Insert IP Address" value={ip} style={{...globalStyles.input, maxWidth: "100%", width: "100%"}} onChangeText={handleIp}></TextInput>
      <TouchableOpacity style={{...globalStyles.buttonStyle,  opacity: ip === "" ? 0.4 : 1,  width: "50%" }} disabled={ip === ""} onPress={saveIp}>
        <Text style={{...globalStyles.textStyle, fontSize: 30}}>Save</Text>
      </TouchableOpacity>
      </View>
    </Card>
    <Banner hideDialog={hideDialog} visible={visible} text={{title: 'Changes Saved', paragraph:'The IP Address has been Updated!'}}/>
    </View>
  );
};

