import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type CustomCalloutStyles = {
    callout(width: number): StyleProp<ViewStyle>;
    container: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
}

export const customCalloutStyles: CustomCalloutStyles = {
    callout: (width: number) =>({
        width: width,
    }),
    container:{
        backgroundColor: theme.color.primary.darkBlueGray,
        borderWidth: 5,
        borderRadius: 25,
        borderColor: theme.color.primary.lightGray,
        height: 100,
        justifyContent: 'center',
    },
    text:{
        fontFamily: theme.fontFamily.blackCastle,
        textAlign: 'center',
        color: theme.color.primary.white,
    }
}