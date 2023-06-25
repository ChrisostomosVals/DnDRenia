import { StyleProp, ViewStyle } from "react-native"

type MainStatsStyles = {
    container: StyleProp<ViewStyle>;
}


export const mainStatsStyles: MainStatsStyles = {
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        flex: 0.7,
        marginBottom: 'auto',
        marginTop: 'auto'
    }
}
