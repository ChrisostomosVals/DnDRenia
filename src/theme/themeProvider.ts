import { DefaultTheme, Theme } from "@react-navigation/native";
import { theme } from "./theme";
import { StyleProp, ViewStyle } from "react-native";

export const appTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#111519',
      background: '#111519'
    },
  };
export const applicationTheme: StyleProp<ViewStyle> = {
  backgroundColor: theme.color.primary.backgroundColor,
  flex: 1,
}