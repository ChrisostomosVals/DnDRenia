import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

export type ModalStyle = {
    body:{
        container: StyleProp<ViewStyle>;
    }
    title:{
        container: StyleProp<ViewStyle>;
        text: StyleProp<TextStyle>;
    },
    subtitle:{
        text: StyleProp<TextStyle>;
        container: StyleProp<ViewStyle>;
    }
    footer:{
        container: StyleProp<ViewStyle>;
    }
}

export const modalStyles: ModalStyle ={
    body:{
        container:{
            flex: 0.5, 
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: theme.color.primary.darkBlueGray,
            borderRadius: 15,
            marginTop: 'auto',
            marginBottom: 'auto'
        }
    },
    title:{
        text:{
            fontFamily: theme.fontFamily.blackCastle,
            fontSize: theme.fontSize.large,
            color: theme.color.primary.white
        },
        container:{
            alignItems: 'center',
            margin: 15,
        }
    },
    subtitle:{
        text: {
            fontFamily: theme.fontFamily.blackCastle,
            fontSize: theme.fontSize.medium,
            color: theme.color.primary.white
        },
        container:{
            alignItems: 'center',
            margin: 45,
        }
    },
    footer:{
        container:{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            margin: 15,
        }
    }
}