import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

export type SkillStyles = {
    row: StyleProp<ViewStyle>;
    leftContainer: StyleProp<ViewStyle>;
    rightContainer: StyleProp<ViewStyle>;
    checkbox: {
        container: StyleProp<ViewStyle>;
        inner: StyleProp<ViewStyle>;
        color: string | undefined;
    };
    name: StyleProp<ViewStyle>;
    number(color: string): StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
}

export const skillStyles: SkillStyles = {
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
    },
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    checkbox: {
        container: { 
            backgroundColor: theme.color.primary.backgroundColor,
            alignSelf: 'center'
        },
        inner:{
            borderRadius: 360
        },
        color: theme.color.primary.purple
    },
    name: {
        backgroundColor: theme.color.primary.darkBlueGray,
        borderWidth: 5,
        borderColor: theme.color.primary.lightGray,
        shadowColor: theme.color.primary.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        justifyContent: 'center',
        width: '60%',
        height: 50,
        borderRadius: 360
    },
    number: (color: string) => ({
        backgroundColor: theme.color.primary[`${color}`],
        shadowColor: theme.color.primary.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        justifyContent: 'center',
        width: '20%',
        height: 25,
        borderRadius: 360,
        alignSelf: 'center'
    }),
    text: {
        fontFamily: theme.fontFamily.blackCastle,
        color: theme.color.primary.white,
        textAlign: 'center',
        fontSize: theme.fontSize.small
    }
}