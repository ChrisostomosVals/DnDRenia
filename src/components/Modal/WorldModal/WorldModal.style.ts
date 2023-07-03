import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../../theme/theme";

type WorldModalStyles = {
    container: StyleProp<ViewStyle>;
    textInput: {
        text: StyleProp<TextStyle>;
        placeholderColor: string |undefined;
    },
    button: StyleProp<ViewStyle>;
    title:{
        text: StyleProp<TextStyle>;
    }
    footer:{
        container: StyleProp<ViewStyle>;
    },
    date:{
        text: StyleProp<TextStyle>;
        container: StyleProp<ViewStyle>;
    }
}

export const worldModalStyles: WorldModalStyles = {
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.color.primary.backgroundColor
    },
    textInput:{
        text:{
            fontFamily: theme.fontFamily.luminari,
            color: theme.color.primary.white,
            borderRadius: 360,
            borderWidth: 7,
            margin: 10,
            textAlign: 'center',
            borderColor: theme.color.primary.lightGray,
            backgroundColor: theme.color.primary.darkPurple,
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
    },
    footer:{
        container:{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            margin: 15,
        }
    },
    date:{
        text:{
            fontFamily: theme.fontFamily.luminari,
            color: theme.color.primary.white,
            textAlign: 'center',
        },
        container:{
            borderRadius: 360,
            borderWidth: 7,
            margin: 10,
            borderColor: theme.color.primary.lightGray,
            backgroundColor: theme.color.primary.darkPurple,
        }
    }
}