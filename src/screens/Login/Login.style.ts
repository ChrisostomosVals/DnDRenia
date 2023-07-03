import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type LoginStyles = {
    container: StyleProp<ViewStyle>;
    textInput: {
        text: StyleProp<TextStyle>;
        placeholderColor: string |undefined;
    },
    button: StyleProp<ViewStyle>;
    title:{
        text: StyleProp<TextStyle>;
    }
}

export const loginStyles: LoginStyles = {
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.color.primary.backgroundColor
    },
    textInput:{
        text:{
            fontFamily: theme.fontFamily.blackCastle,
            color: theme.color.primary.white,
            borderRadius: 360,
            borderWidth: 7,
            margin: 10,
            textAlign: 'center',
            borderColor: theme.color.primary.lightGray,
            backgroundColor: theme.color.primary.darkPurple
        },
       
        placeholderColor: theme.color.primary.white
    },
    button:{
        alignItems: 'center',
        margin: 20,
    },
    title:{
        text:{
            fontFamily: theme.fontFamily.blackCastle,
            color: theme.color.primary.white,
            fontSize: theme.fontSize.large,
            textAlign: 'center',
            bottom: '20%'
        }
    }
    
}