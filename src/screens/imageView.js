import { useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, BackHandler } from "react-native";



export const ImageView = ({navigation, route}) =>{
    useEffect(()=>{
    },[route])
    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            navigation.navigate("CharacterInfo", {navigation: navigation, characterId: route.params.characterId});
            return true
          };
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
          return () =>
            BackHandler.removeEventListener('hardwareBackPress');
        }, [])
      );
    return(
        <Image source={{ uri: route.params.uri }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
    )
}