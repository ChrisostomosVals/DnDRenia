import { StyleProp, TextStyle } from "react-native"
import { theme } from "../../theme/theme";

type ExpandableTextStyles = {
    greek: StyleProp<TextStyle>;
    english: StyleProp<TextStyle>;
}

export const expandableTextStyles: ExpandableTextStyles = {
    greek:{
        fontFamily: theme.fontFamily.luminari,
        color: theme.color.primary.white
    },
    english:{
        fontFamily: theme.fontFamily.blackCastle,
        color: theme.color.primary.white,
        fontSize: theme.fontSize.small
    }
}