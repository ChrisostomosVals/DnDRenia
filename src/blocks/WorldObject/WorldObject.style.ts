import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import { theme } from "../../theme/theme";

type WorldObjectStyles = {
    text(color: string, size: number): StyleProp<TextStyle>;
    textContainer: StyleProp<ViewStyle>;
    propertiesContainer: StyleProp<ViewStyle>;
    image(width: number, height: number): StyleProp<ImageStyle>;
}

export const worldObjectStyles: WorldObjectStyles = {
    textContainer:{
        gap: 10
    },
    text: (color: string, size: number) =>({
        fontFamily: theme.fontFamily.blackCastle,
        fontSize: size,
        color: color,
        textAlign: 'center',
    }),
    propertiesContainer:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        margin:5,
        width: '80%'
    },
    image: (width: number, height:number)=>({ 
        width: width, 
        height: height,
        alignSelf: 'center',
    })
}