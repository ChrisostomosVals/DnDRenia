import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native"
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
    },
    button: StyleProp<ViewStyle>;
    calloutContent:{
        text: StyleProp<TextStyle>;
        container: StyleProp<ViewStyle>;
        lineBreak: StyleProp<ViewStyle>;
    },
    logoutModal:{
        container(height: number): StyleProp<ViewStyle>;
    },
    worldObjectModal:{
        container(height: number): StyleProp<ViewStyle>;
        picker: {
            container: StyleProp<ViewStyle>;
            main: StyleProp<ViewStyle>;
            selectedItem: StyleProp<ViewStyle>;
            item: StyleProp<ViewStyle>;
            dropDownContainerStyle: StyleProp<ViewStyle>;
        }
        text: StyleProp<TextStyle>;
    },
    errorText: StyleProp<TextStyle>;
}

export const modalStyles: ModalStyle = {
    body:{
        container:{
            flex: 0.5, 
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: theme.color.primary.darkBlueGray,
            borderRadius: 15,
            marginTop: 'auto',
            marginBottom: 'auto',
            width: '90%',
            zIndex: 100
        }
    },
    title:{
        text:{
            fontFamily: theme.fontFamily.blackCastle,
            fontSize: theme.fontSize.medium,
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
    },
    button:{
        alignItems: 'center',
    },
    calloutContent:{
        text: {
            fontFamily: theme.fontFamily.blackCastle,
            fontSize: theme.fontSize.small,
            color: theme.color.primary.white
        },
        container:{
            alignItems: 'center',
            margin: 15,
        },
        lineBreak: {
            borderBottomColor: theme.color.primary.white,
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
    },
    logoutModal:{
        container:(height: number)=>({
            height: height, 
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: theme.color.primary.darkBlueGray,
            borderRadius: 15,
            marginTop: 'auto',
            marginBottom: 'auto',
            width: '90%'
        })
    },
    worldObjectModal:{
        container:(height: number)=>({
            height: height, 
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: theme.color.primary.darkBlueGray,
            borderRadius: 15,
            marginTop: 'auto',
            marginBottom: 'auto',
            width: '90%'
        }),
        picker:{
            container:{
                zIndex: 10,
                alignSelf: 'center'
            },
            main:{
                borderColor: theme.color.primary.lightGray,
                backgroundColor: theme.color.primary.darkPurple,
                borderRadius: 360,
                borderWidth: 7,
                width: '95%'
            },
            dropDownContainerStyle:{
                backgroundColor: theme.color.primary.darkBlueGray,
                borderRadius: 5,
                width: '95%',
                minHeight: '110%'
            },
            item:{
                backgroundColor: theme.color.primary.darkPurple,
                borderColor: theme.color.primary.lightGray,
                borderRadius: 360,
                borderWidth: 7,
                margin: 2
            },
            selectedItem:{
                backgroundColor: theme.color.primary.purple,
            }
        },
        text:{
            fontFamily: theme.fontFamily.blackCastle,
            color: theme.color.primary.white,
            backgroundColor: theme.color.primary.darkPurple,
            textAlign: 'center',
            borderRadius: 360,
        }
    },
    errorText:{
        fontFamily: theme.fontFamily.blackCastle,
        color: theme.color.primary.error,
        fontSize: theme.fontSize.tiny,
        textAlign: 'center',
    },
}