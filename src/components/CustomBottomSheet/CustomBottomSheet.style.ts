import { StyleProp, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type CustomBottomSheetStyles = {
    body: StyleProp<ViewStyle>;
}

export const customBottomSheetStyles: CustomBottomSheetStyles ={
    body:{
        backgroundColor: theme.color.primary.backgroundColor,
        borderColor: theme.color.primary.lightGray,
        borderWidth: 7
    }
}