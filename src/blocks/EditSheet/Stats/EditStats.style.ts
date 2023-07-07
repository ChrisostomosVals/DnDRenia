import { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../../theme/theme";

type EditStatsStyles = {
    container: StyleProp<ViewStyle>;
    text(size: number): StyleProp<TextStyle>;
    textInput: {
        text: StyleProp<TextStyle>;
        placeholderColor: ColorValue;
    },
    row: StyleProp<ViewStyle>;
    button: StyleProp<ViewStyle>;
}

export const editStatsStyles: EditStatsStyles = {
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        alignItems: 'center'
    },
    container: {

    },
    text: (size: number) => ({
        fontFamily: theme.fontFamily.blackCastle,
        fontSize: size,
        color: theme.color.primary.white,
        textAlign: 'center'
    }),
    textInput: {
        text: {
            width: '40%',
            fontFamily: theme.fontFamily.blackCastle,
            color: theme.color.primary.white,
            borderRadius: 360,
            borderWidth: 7,
            textAlign: 'center',
            borderColor: theme.color.primary.lightGray,
            backgroundColor: theme.color.primary.darkPurple,
            fontSize: theme.fontSize.small
        },
        placeholderColor: theme.color.primary.white ?? 'white'
    },
    button: {
        alignItems: 'center',
    }
}