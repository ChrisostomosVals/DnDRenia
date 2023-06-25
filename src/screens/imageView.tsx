import { useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, BackHandler } from "react-native";



export const ImageView = ({
  navigation,
  route
}: any) =>{
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
            // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
            BackHandler.removeEventListener('hardwareBackPress');
        }, [])
      );
    return(
        <Image source={{ uri: route.params.uri }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
    )
}