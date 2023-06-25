import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { theme } from "../../../theme/theme";

export type MainStatCircleStyles = {
    top: StyleProp<ViewStyle>;
    bottom: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
}

export const mainStatCircleStyle: MainStatCircleStyles = {
    top: {
        width: '80%',
        height: '40%',
        top:'-15%',
        justifyContent: 'center',
        backgroundColor: theme.color.primary.darkBlue,
        borderRadius: 360,
        borderWidth: 5,
        borderColor: theme.color.primary.lightGray,
        shadowColor: theme.color.primary.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        alignItems: 'center'
    },
    bottom: {
        width: '80%',
        height: '40%',
        bottom: '-15%',
        justifyContent: 'center',
        backgroundColor: theme.color.primary.darkBlue,
        borderRadius: 360,
        borderWidth: 5,
        borderColor: theme.color.primary.lightGray,
        shadowColor: theme.color.primary.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        alignItems: 'center',
    },
    text:{
        fontFamily: theme.fontFamily.blackCastle,
        color: theme.color.primary.white,
        fontSize: theme.fontSize.small
    }
}