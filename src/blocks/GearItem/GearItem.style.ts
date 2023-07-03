import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type GeatItemStyles = {
    row: StyleProp<ViewStyle>;
    container: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
}

export const gearItemStyles: GeatItemStyles = {
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5
    },
    container:{
        borderWidth: 5,
        borderRadius: 360,
        borderColor: theme.color.primary.lightGray,
        alignSelf: 'center',
        backgroundColor: theme.color.primary.darkBlueGray,
        width: '30%'
    },
    text: {
        fontFamily: theme.fontFamily.blackCastle,
        color: theme.color.primary.white,
        fontSize: theme.fontSize.small,
        textAlign: 'center',
        alignSelf: 'center'
    }
}