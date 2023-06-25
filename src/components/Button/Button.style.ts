import { StyleProp, ViewStyle, TextStyle } from "react-native";
import { theme } from "../../theme/theme";

export type ButtonStyles = {
    primary: {
        container: StyleProp<ViewStyle>;
        text: StyleProp<TextStyle>;
    };
    secondary: {
        container: StyleProp<ViewStyle>;
        text: StyleProp<TextStyle>;
    };
};

export const buttonStyles: ButtonStyles = {
    primary: {
        container: {
            backgroundColor: theme.color.primary.darkBlue,
            elevation: 2,
            borderRadius: 5,
            alignItems: "center",
            padding: "2%",
            width: '30%'
        },
        text:{
            fontFamily: theme.fontFamily.blackCastle,
            color: theme.color.primary.white
        }
    },
    secondary: {
        container: {
            backgroundColor: theme.color.primary.white,
            elevation: 2,
            borderRadius: 5,
            alignItems: "center",
            padding: "2%",
            width: '30%'
        },
        text:{
            fontFamily: theme.fontFamily.blackCastle,
            color: theme.color.primary.black
        }
    },
};