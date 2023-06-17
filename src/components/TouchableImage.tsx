import { memo, useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

export const TouchableImage = memo(function TouchableImage({ item, type, setItem, openModal }) {
  useEffect(()=>{
    setOpacity(false)
  },[item])
  const [opacity, setOpacity] = useState(false)
  const handleImage = () =>{
    if(type === "new"){
      setItem(items => {
        if(items.includes(item)){
            return items.filter(i => i !== item)
        }
        else
          return [...items, item]
      })
      setOpacity(!opacity)
    }
    else{
      setItem({item: item, type: type})
      openModal();
    }
      
  }
  return (
    <TouchableOpacity onPress={handleImage}>
      <Image
        PlaceholderContent={<ActivityIndicator />}
        source={{ uri: item.uri }}
        style={styles.image}
        resizeMode='cover'
        opacity={opacity ? 0.8 : 1}
      />
      {
        opacity &&
        <IonIcon
        style={styles.backButton}
        name="checkmark-circle"
        color="#DAA520"
        size={30}
      />
      }
     
    </TouchableOpacity>
  );
});
const width = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  image: {
    height: 150,
    width: width / 3.2,
    margin: 2,
  },
  backButton: {
    position: "absolute",
    right: 5,
    bottom: 5
  },
});
