import { StyleProp, TextStyle } from "react-native"
import { theme } from "../../theme/theme";

type IndexStyles = {
    icon: {
        container: StyleProp<TextStyle>;
        color: string;
    }
}

export const indexStyles: IndexStyles = {
    icon: {
        color: theme.color.primary.lightGray!,
        container: {
            position: "absolute", 
            right: '3%', 
            top: '7.5%', 
            zIndex: 100
        }
    }
}