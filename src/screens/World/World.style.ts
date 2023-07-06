import { StyleProp, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type WorldStyles = {
    locations: {
        container: StyleProp<ViewStyle>;
        icons: StyleProp<ViewStyle>;
    }
    worldObjects: {
        container: StyleProp<ViewStyle>;
        icons: StyleProp<ViewStyle>;

    }
}

export const worldStyles: WorldStyles = {
    locations:{
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
        icons:{
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    },
    worldObjects:{
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
        icons:{
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    }
}