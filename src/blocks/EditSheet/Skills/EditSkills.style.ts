import { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";
import { theme } from "../../../theme/theme";

type EditSkillsStyles = {
    container: StyleProp<ViewStyle>;
    text(size: number): StyleProp<TextStyle>;
    numbers: {
        text: StyleProp<TextStyle>;
        container: StyleProp<ViewStyle>;
    },
    row: StyleProp<ViewStyle>;
    button: StyleProp<ViewStyle>;
    header: {
        row: StyleProp<ViewStyle>;
        leftContainer: StyleProp<ViewStyle>;
        rightContainer: StyleProp<ViewStyle>;
    }
    skills: {
        leftContainer: StyleProp<ViewStyle>;
        rightContainer: StyleProp<ViewStyle>;
    }
}

export const editSkillsStyles: EditSkillsStyles = {
    row: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    container: {

    },
    text: (size: number) => ({
        fontFamily: theme.fontFamily.blackCastle,
        fontSize: size,
        color: theme.color.primary.white,
    }),
    numbers: {
        text: {
            fontFamily: theme.fontFamily.blackCastle,
            color: theme.color.primary.white,
            textAlign: 'center',
            fontSize: theme.fontSize.small,
        },
        container: {
            backgroundColor: theme.color.primary.darkBlueGray,
            shadowColor: theme.color.primary.black,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 2,
            justifyContent: 'center',
            height: 25,
            borderRadius: 360,
            alignSelf: 'center'
        }
    },
    button: {
        alignItems: 'center',
    },
    header: {
        row: {
            flexDirection: 'row',
        },
        leftContainer: {
            flex: 1.05
        },
        rightContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 20,
            alignItems: 'center'
        },
    },
    skills: {
        rightContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 20,
            alignItems: 'center',
            width: '60%',
        },
        leftContainer: {
            justifyContent: 'flex-start',
            flexShrink: 1,
            width: '40%'
        }
    }
}
