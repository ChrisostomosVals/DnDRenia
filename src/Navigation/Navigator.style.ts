import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../theme/theme";

type NavigatorStyles = {
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
    },
    mapHeader: StyleProp<ViewStyle>;
    chapterHeader: StyleProp<ViewStyle>;
    switch: StyleProp<ViewStyle>;
}

export const navigatorStyles: NavigatorStyles = {
    navigator: {
        drawerStyle: {
            backgroundColor: theme.color.primary.black,
          },
          drawerLabelStyle: {
            fontFamily: theme.fontFamily.blackCastle,
            fontSize: theme.fontSize.medium
          },
          drawerActiveTintColor: theme.color.primary.purple,
          drawerInactiveTintColor: theme.color.primary.lightGray
    },
    screen:{
        headerStyle:{
            backgroundColor: theme.color.primary.backgroundColor,
        },
        headerTintColor: theme.color.primary.white,
        headerTitleStyle:{
            fontFamily: theme.fontFamily.blackCastle,
            fontSize: theme.fontSize.medium,
        }
    },
    mapHeader: {
        flexDirection: 'row',
        right: '240%',
        alignItems: 'center',
        justifyContent:'center',
    },
    chapterHeader:{
        flexDirection: 'row',
        right: '300%',
        justifyContent:'center',
    },
    switch:{
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    }
}