import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { theme } from "../../theme/theme";
type JustifyContentType = | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
    
type SpecialAbilitiesStyles = {
    lineBreak: StyleProp<ViewStyle>;
    container(justifyContent: JustifyContentType): StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
}

export const specialAbilitiesStyles: SpecialAbilitiesStyles = {
    lineBreak: {
        borderBottomColor: theme.color.primary.lightGray,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    container: (justifyContent: JustifyContentType) => ({
        flexDirection: 'column',
        alignSelf: 'center',
        backgroundColor: theme.color.primary.darkBlueGray,
        borderWidth: 5,
        borderColor: theme.color.primary.lightGray,
        shadowColor: theme.color.primary.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        justifyContent: justifyContent,
        minHeight: '50%',
        borderRadius: 25,
        width: '80%',
        marginBottom: 'auto',
        marginTop: 'auto'
    }),
    text: {
        fontFamily: theme.fontFamily.blackCastle,
        fontSize: theme.fontSize.medium,
        color: theme.color.primary.white,
        textAlign: 'center',
        alignSelf: 'center'
    }
}