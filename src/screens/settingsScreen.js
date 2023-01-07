import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "@rneui/base";
import { useEffect, useState } from "react";
import { TextInput, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Banner } from "../components/banner";
import { globalStyles } from "../utils/styles";

export const SettingsScreen = ({navigation}) => {
  const [ip, setIp] = useState('');
  const [saved, setSaved] = useState(false)
  const [visible, setVisible] = useState(false)
  useEffect(() =>{
    getItem();
  },[])
  useEffect(() =>{
    getItem();
  },[saved])
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
    }
  }
  const hideDialog = () => {
    setVisible(false)
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    form:{
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  return (
    <View style={styles.container}>
    <Card containerStyle={{...globalStyles.card, alignItems: 'center'}}>
    <Card.Title h4>
    <Text style={globalStyles.textStyle}>Set IP Address</Text>
    </Card.Title>
    <View style={styles.form}>
      <TextInput placeholder="Insert IP Address" value={ip} style={{...globalStyles.input,  width: '40%'}} onChangeText={handleIp}></TextInput>
      </View>
      {ip != '' &&
    <View style={styles.form}>
    <TouchableOpacity style={{...globalStyles.buttonStyle, width: '30%'}} onPress={saveIp}>
        <Text style={{...globalStyles.textStyle, fontSize: 20}}>Save</Text>
      </TouchableOpacity>
      </View>
    }
    </Card>
    <Banner hideDialog={hideDialog} visible={visible} text={{title: 'Changes Saved', paragraph:'The IP Address has been Updated!'}}/>
    </View>
  );
};

