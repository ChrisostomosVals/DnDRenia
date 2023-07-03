import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type IndexStyles = {
    icon: {
        top(num: number): StyleProp<TextStyle>;
        bottom(num: number): StyleProp<TextStyle>;
        right(num: number): StyleProp<TextStyle>;
        color?: string;
    }
    activityIndicator: StyleProp<ViewStyle>;
}

export const indexStyles: IndexStyles = {
    icon: {
        color: theme.color.primary.white,
        top: (num: number) => ({
            position: "absolute",
            right: '3%',
            top: num,
            zIndex: 100,
        }),
        bottom: (num: number) => ({
            position: "absolute",
            right: '3%',
            bottom: num,
            zIndex: 100,
        }),
        right: (num: number) => ({
            position: "absolute",
            right: '13%',
            bottom: num,
            zIndex: 100,
        })
    },
    activityIndicator: { 
        flex: 1, 
        backgroundColor: theme.color.primary.backgroundColor
    }
}