import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type locationStyles = {
    container: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
    textEvents: StyleProp<TextStyle>;
}

export const locationStyles: locationStyles ={
    container: {
        width: '80%',
        backgroundColor: theme.color.primary.darkBlueGray,
        borderWidth: 5,
        borderRadius: 25,
        padding: 10,
        margin: 10,
        alignSelf: 'center',
        borderColor: theme.color.primary.lightGray,
    },
    text:{
        fontFamily: theme.fontFamily.blackCastle,
        fontSize: theme.fontSize.small,
        color: theme.color.primary.white,
        textAlign: 'center',
    },
    textEvents:{
        fontFamily: theme.fontFamily.luminari,
        fontSize: theme.fontSize.small,
        color: theme.color.primary.white,
        textAlign: 'center',
    }
}