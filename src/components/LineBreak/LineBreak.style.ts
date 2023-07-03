import { StyleProp, StyleSheet, ViewStyle } from "react-native"

type LineBreakStyles = {
    lineBreak (color: string): StyleProp<ViewStyle>
}

export const lineBreakStyles : LineBreakStyles ={
    lineBreak: (color: string) => ({
        borderBottomColor: color,
        borderBottomWidth: StyleSheet.hairlineWidth
    })
}