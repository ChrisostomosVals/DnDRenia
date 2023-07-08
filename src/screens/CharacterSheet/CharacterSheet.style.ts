import { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native"

type CharacterSheetStyles = {
    icons: StyleProp<ViewStyle>;
}

export const characterSheetStyles: CharacterSheetStyles = {
    icons:{
        justifyContent: 'space-around',
        flexDirection: 'row',
        margin: 10
    }
}