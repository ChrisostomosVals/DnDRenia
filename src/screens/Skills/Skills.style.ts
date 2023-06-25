import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type SkillsStyle = {
    container: StyleProp<ViewStyle>;
    lineBreak: StyleProp<ViewStyle>;
}

export const skillsStyles: SkillsStyle = {
    container:{
        backgroundColor: theme.color.primary.backgroundColor
    },
    lineBreak:{
        borderBottomColor: theme.color.primary.lightGray,
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
}