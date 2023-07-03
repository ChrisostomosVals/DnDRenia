import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type FeatStyles = {
    text: StyleProp<TextStyle>;
}

export const featStyles: FeatStyles = {
    text:{
        fontFamily: theme.fontFamily.blackCastle,
        fontSize: theme.fontSize.medium,
        color: theme.color.primary.white,
        textAlign: 'center'
    }
}