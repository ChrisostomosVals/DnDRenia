import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import { theme } from "../../theme/theme";

type ImagesStyles = {
    container: StyleProp<ViewStyle>;
    image(width: number, height: number): StyleProp<ImageStyle>;
    imagesContainer: StyleProp<ViewStyle>;
    header:{
        container: StyleProp<ViewStyle>;
        text: StyleProp<TextStyle>;
    },
    deleteIcon: StyleProp<ViewStyle>;
    buttons: StyleProp<ViewStyle>;
}

export const imagesStyles: ImagesStyles = {
    container:{
        alignItems: 'center',
        gap: 20
    },
    image: (width: number, height:number)=>({ 
        width: width, 
        height: height,
        alignSelf: 'center',
        borderRadius: 7,
        margin: 5
    }),
    imagesContainer:{
        alignItems: "center",
        justifyContent: "center",
    },
    header:{
        container:{
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
        },
        text:{
            fontFamily: theme.fontFamily.blackCastle,
            fontSize: theme.fontSize.medium,
            color: theme.color.primary.white
        }
    },
    buttons: {
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 20
    },
    deleteIcon:{
        position: 'absolute',
        top: 20,
        right: 20
    }
}