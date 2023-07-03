import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type GeneralStatStyles = {
    body: StyleProp<ViewStyle>;
    name: {
        container: StyleProp<ViewStyle>;
        text: StyleProp<TextStyle>;
    },
    value: {
        container: StyleProp<ViewStyle>;
        text: StyleProp<TextStyle>;
    }
}

export const generalStatStyles: GeneralStatStyles = {
    body: {
        alignSelf: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '95%',
        marginTop: 5,
        marginBottom: 5
    },
    name: {
        container: {
            width: '45%',
            backgroundColor: theme.color.primary.darkBlueGray,
            borderWidth: 5,
            borderRadius: 360,
            borderColor: theme.color.primary.lightGray,
        },
        text: {
            fontFamily: theme.fontFamily.blackCastle,
            color: theme.color.primary.white,
            fontSize: theme.fontSize.medium,
            textAlign: 'center',
            justifyContent: 'center'
        }
    },
    value: {
        container: {
            backgroundColor: theme.color.primary.darkBlueGray,
            width: '45%',
            borderWidth: 5,
            borderRadius: 360,
            borderColor: theme.color.primary.lightGray,
            justifyContent: 'center'
        },
        text: {
            fontFamily: theme.fontFamily.blackCastle,
            fontSize: theme.fontSize.medium,
            color: theme.color.primary.white,
            textAlign: 'center'
        }
    }
}