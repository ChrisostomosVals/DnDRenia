import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type SkillsStyle = {
    container: StyleProp<ViewStyle>;
    lineBreak: StyleProp<ViewStyle>;
    header: {
        row: StyleProp<ViewStyle>;
        leftContainer: StyleProp<ViewStyle>;
        rightContainer: StyleProp<ViewStyle>;
    }
    text: StyleProp<TextStyle>;
}

export const skillsStyles: SkillsStyle = {
    container:{
        backgroundColor: theme.color.primary.backgroundColor,
        padding: 5
    },
    lineBreak:{
        borderBottomColor: theme.color.primary.lightGray,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    header:{
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        leftContainer: {
            flex: 1.05
        },
        rightContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 0.5,
            alignItems: 'center'
        },
    },
    text:{
        fontFamily: theme.fontFamily.blackCastle,
        color: theme.color.primary.white,
        fontSize: theme.fontSize.tiny,
        textAlign: 'center',
    },
}