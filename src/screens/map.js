import { View, StyleSheet } from "react-native";

export const Map = () =>{

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        },
        map: {
          width: '90%',
          height: '90%',
          alignSelf: 'center'
        },
      });
    return(
        <View style={styles.container}>
        
      </View>
    )
}