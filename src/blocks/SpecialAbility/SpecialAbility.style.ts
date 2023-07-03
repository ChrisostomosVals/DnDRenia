import { StyleProp, TextStyle } from "react-native"
import { theme } from "../../theme/theme";

type SpecialAbilityStyles = {
    text: StyleProp<TextStyle>;
}

export const specialAbilityStyles: SpecialAbilityStyles = {
    text:{
        fontFamily: theme.fontFamily.blackCastle,
        fontSize: theme.fontSize.medium,
        color: theme.color.primary.white,
        textAlign: 'center'
    }
}