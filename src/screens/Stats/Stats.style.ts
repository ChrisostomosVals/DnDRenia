import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type StatsStyles = {
    text: StyleProp<TextStyle>;
    mainStats: StyleProp<ViewStyle>;
    generalStats: StyleProp<ViewStyle>;
}


export const statsStyles: StatsStyles = {
    text:{
        fontFamily: theme.fontFamily.blackCastle,
        fontSize: theme.fontSize.medium,
        color: theme.color.primary.white,
        textAlign: 'center'
    },
    mainStats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        flex: 1,
        marginBottom: '20%',
        marginTop: 'auto',
        minHeight: 300
    },
    generalStats:{
        flex: 0.2,
    }
}
