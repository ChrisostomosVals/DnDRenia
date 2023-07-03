import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type ChapterStyles = {
    container: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
}

export const chapterStyles: ChapterStyles ={
    container: {
        width: '80%',
        backgroundColor: theme.color.primary.darkBlueGray,
        borderWidth: 5,
        borderRadius: 25,
        padding: 10,
        margin: 10,
        alignSelf: 'center',
        borderColor: theme.color.primary.lightGray,
    },
    text:{
        fontFamily: theme.fontFamily.luminari,
        fontSize: theme.fontSize.medium,
        color: theme.color.primary.white,
        textAlign: 'center',
    }
}