import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

export type ChangeCharacterStyles = {
    container: StyleProp<ViewStyle>;
    picker: {
        container: StyleProp<ViewStyle>;
        main: StyleProp<ViewStyle>;
        selectedItem: StyleProp<ViewStyle>;
        item: StyleProp<ViewStyle>;
        dropDownContainerStyle: StyleProp<ViewStyle>;
        modalContentContainerStyle: StyleProp<ViewStyle>;
        arrowIconContainerStyle: StyleProp<ViewStyle>;
    }
    text: StyleProp<TextStyle>;
}

export const changeCharacterStyles: ChangeCharacterStyles = {
    container:{
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20
    },
    picker:{
        container:{
            zIndex: 10,
        },
        main:{
            borderColor: theme.color.primary.lightGray,
            backgroundColor: theme.color.primary.darkPurple,
            borderRadius: 360,
            borderWidth: 7,
        },
        dropDownContainerStyle:{
            backgroundColor: theme.color.primary.darkBlueGray,
            borderRadius: 5,
        },
        modalContentContainerStyle:{
            backgroundColor: theme.color.primary.darkBlueGray,
            borderRadius: 5,
        },
        item:{
            backgroundColor: theme.color.primary.darkPurple,
            borderColor: theme.color.primary.lightGray,
            borderRadius: 360,
            borderWidth: 7,
            margin: 2,
        },
        selectedItem:{
            backgroundColor: theme.color.primary.purple,
        },
        arrowIconContainerStyle:{ display: "none" }
    },
    text:{
        fontFamily: theme.fontFamily.blackCastle,
        color: theme.color.primary.white,
        backgroundColor: theme.color.primary.darkPurple,
        textAlign: 'center',
        borderRadius: 360,
    }
}