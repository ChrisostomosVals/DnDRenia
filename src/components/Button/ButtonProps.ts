import { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";
export type ButtonProps = {
    title: string;
    extentedStyles?: StyleProp<ViewStyle>;
} & TouchableOpacityProps