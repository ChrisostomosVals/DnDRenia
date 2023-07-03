import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { theme } from "../../theme/theme";

type GearStyles = {
    row: StyleProp<ViewStyle>;
    container: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
    lineBreak: StyleProp<ViewStyle>;
}

export const gearStyles: GearStyles = {
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },
    container:{
        alignSelf: 'center',
        borderRadius: 5,
        width: '30%'
    },
    text: {
        fontFamily: theme.fontFamily.blackCastle,
        color: theme.color.primary.white,
        fontSize: theme.fontSize.medium,
        textAlign: 'center',
        alignSelf: 'center'
    },
    lineBreak:{
        borderBottomColor: theme.color.primary.lightGray,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
}