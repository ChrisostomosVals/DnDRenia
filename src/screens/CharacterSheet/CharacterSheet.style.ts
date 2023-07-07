import { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native"

type CharacterSheetStyles = {
    icons: StyleProp<ViewStyle>;
}

export const characterSheetStyles: CharacterSheetStyles = {
    icons:{
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 10
    }
}