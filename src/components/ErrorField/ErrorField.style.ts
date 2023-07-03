import { StyleProp, TextStyle } from "react-native";
import { theme } from "../../theme/theme";

type ErrorFieldStyles = {
    errorText: StyleProp<TextStyle>;
}

export const errorFieldStyles: ErrorFieldStyles = {
    errorText:{
        fontFamily: theme.fontFamily.blackCastle,
        color: theme.color.primary.error,
        fontSize: theme.fontSize.tiny,
        textAlign: 'center',
    },
}