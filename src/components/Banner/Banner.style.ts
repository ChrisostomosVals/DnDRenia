import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { theme } from "../../theme/theme";
export type BannerStyles = {
    primary: { 
        text: StyleProp<TextStyle>;
        dialog : StyleProp<ViewStyle>;
    };
    secondary: { 
        text: StyleProp<TextStyle>;
        dialog : StyleProp<ViewStyle>;
    };
}

export const bannerStyles: BannerStyles = {
    primary: {
        text: {
            color: theme.color.primary.white,
            fontSize: theme.fontSize.small,
            fontFamily: theme.fontFamily.blackCastle,
        },
        dialog:{
            borderRadius: 15,
            backgroundColor: theme.color.primary.darkBlue,
        }
    },
    secondary: {
        text: {
            color: theme.color.primary.white,
            fontSize: theme.fontSize.small,
            fontFamily: theme.fontFamily.blackCastle,
        },
        dialog:{
            borderRadius: 15,
            backgroundColor: theme.color.primary.darkBlue,
        }
    },
};