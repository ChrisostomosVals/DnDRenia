import { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";
import { theme } from "../../../theme/theme";

type EditGearStyles = {
    text(size: number): StyleProp<TextStyle>;
    row(opacity: number): StyleProp<ViewStyle>;
    buttons: StyleProp<ViewStyle>;
    icon: StyleProp<ViewStyle>;
    textInput: {
        text: StyleProp<TextStyle>;
        placeholderColor: ColorValue;
    },
    header:{
        row: StyleProp<ViewStyle>;
        textContainer: StyleProp<ViewStyle>;
    }
}

export const editGearStyles: EditGearStyles = {
    header:{
        row:{
            flexDirection: 'row',
            justifyContent: 'space-around',
            margin: 10,
        },
        textContainer:{
        }
    },
    row:(opacity: number) => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        alignItems: 'center',
        opacity: opacity
    }),
    text: (size: number) => ({
        fontFamily: theme.fontFamily.blackCastle,
        fontSize: size,
        color: theme.color.primary.white,
        textAlign: 'center',
    }),
    textInput: {
        text: {
            width: '30%',
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
    buttons: {
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 20
    },
    icon:{
        alignItems: 'center',
        margin: 20
    }
}