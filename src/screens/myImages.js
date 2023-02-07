import { memo, useCallback, useEffect, useState } from "react";
import Carousel from 'react-native-reanimated-carousel';
import IonIcon from "react-native-vector-icons/Ionicons";
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Dimensions, Text, BackHandler } from "react-native";
import { globalStyles } from "../utils/styles";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CharacterApi from "../dist/api/CharacterApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Banner } from "../components/banner";



export const MyImages = memo(function MyImages({route}){
    const {images, heroId, navigation} = route.params
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [descriptions, setDescriptions] = useState([])
    const [initDesc, setInitDesc] = useState([])
    const [bannerVisible, setBannerVisible] = useState(false);
    const [bannerText, setBannerText] = useState({
      title: "",
      paragraph: "",
    });
    useEffect(() =>{
        setDescriptions([])
        setInitDesc([])
        for(let item of images){
             setDescriptions(desc => [...desc, item.description])
             setInitDesc(desc => [...desc, item.description])
            }
    }, [route])
    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            navigation.navigate("MyProperties", {heroId: heroId});
            return true
          };
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
          return () =>
            BackHandler.removeEventListener('hardwareBackPress');
        }, [])
      );
      const handleDescription = (e, index) =>{
          setDescriptions(desc => desc.map((d, indx) => {
            if(indx === index) d = e
            return d;
          }));
      }
      const handleSave = async () =>{
        const token = await AsyncStorage.getItem("token");
        const ip = await AsyncStorage.getItem("ip");
        const props = await CharacterApi.GetPropertiesAsync(token, ip, heroId);
        if(props.isError){
            console.log(props.error, 'props')
            setBannerText({
                title: "Error",
                paragraph: "There was an error updating image descriptions",
              });
            setBannerVisible(true);
            return;
        }
        for(let prop of props.data){
            let item = images.find(i => i.value === prop.value)
            if(item){
                prop.description = descriptions[images.indexOf(item)]
            }
        }
        const updateProps = {
            id: heroId,
            updateDefinition: props.data
        }
        const update = await CharacterApi.UpdatePropertiesAsync(token, ip, updateProps)
        if(update.isError){
            console.log(update.error, 'update')
            setBannerText({
                title: "Error",
                paragraph: "There was an error updating image descriptions",
              });
            setBannerVisible(true);
            return;
        }
        setBannerText({
            title: "Success",
            paragraph: "Descriptions Updated",
          });
        setBannerVisible(true);
      }
      const hideDialog = () => {
        setBannerVisible(false);
      };
      const styles = StyleSheet.create({
        inputStyle: {
          borderRadius: 5,
          fontSize: 30,
          textAlign: "center",
          backgroundColor: 'rgba(16,36,69,0.95)',
          ...globalStyles.textStyle
        },
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
        buttonText:{
            ...globalStyles.textStyle,
            fontSize: 30
        },
        button:{
            ...globalStyles.button,
            marginTop: '5%',
            opacity: JSON.stringify(initDesc) === JSON.stringify(descriptions) ? 0.5 : 1
        }
    })
    return(
        <View style={styles.container}>
            <IonIcon
              name="arrow-back-circle"
              color="#DAA520"
              size={30}
              style={{ left: 30, top: 50, position: 'absolute' }}
              onPress={() => navigation.navigate("MyProperties", {heroId: heroId})}
            />
            <Carousel
              loop={false}
              width={width}
              height={width}
              data={images}
              scrollAnimationDuration={100}
              renderItem={({ index }) => (
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TextInput style={styles.inputStyle} value={descriptions[index]} onChangeText={(e) => handleDescription(e, index)}></TextInput>
                  <MaterialCommunityIcons
                     name="circle-edit-outline"
                    color="#DAA520"
                    size={20}
                     style={{ right: 10, top: 10, position: 'absolute' }}
                     />
                    <Image source={{ uri: images[index].image }} style={{ width: width, height: height / 2 }} />
                </View>
              )}
            />
                    <TouchableOpacity style={styles.button} disabled={JSON.stringify(initDesc) === JSON.stringify(descriptions)}>
                        <Text style={styles.buttonText} onPress={handleSave}>
                            Save
                        </Text>
                    </TouchableOpacity>
                    <Banner
        hideDialog={hideDialog}
        visible={bannerVisible}
        text={bannerText}
      />
        </View>
    )
});
