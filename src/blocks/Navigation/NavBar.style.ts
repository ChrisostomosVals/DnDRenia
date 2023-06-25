import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type NavBarStyles = {
    navigator: {
        drawerStyle: StyleProp<ViewStyle>;
        drawerLabelStyle: StyleProp<TextStyle>;
        drawerActiveTintColor: string | undefined;
        drawerInactiveTintColor: string | undefined;
    }
    screen: {
        headerStyle: StyleProp<ViewStyle>;
        headerTintColor: string | undefined;
        headerTitleStyle: StyleProp<TextStyle>;
    }
}

export const navBarStyles: NavBarStyles = {
    navigator: {
        drawerStyle: {
            backgroundColor: theme.color.primary.black,
          },
          drawerLabelStyle: {
            fontFamily: theme.fontFamily.blackCastle
          },
          drawerActiveTintColor: theme.color.primary.purple,
          drawerInactiveTintColor: theme.color.primary.lightGray
    },
    screen:{
        headerStyle:{
            backgroundColor: theme.color.primary.backgroundColor
        },
        headerTintColor: theme.color.primary.white,
        headerTitleStyle:{
            fontFamily: theme.fontFamily.blackCastle
        }
    }
}