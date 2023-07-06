import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native"
import { theme } from "../../theme/theme";

type CharacterStyles = {
    container: StyleProp<ViewStyle>;
    text(size: number, color: string): StyleProp<TextStyle>;
    textContainer: StyleProp<ViewStyle>;
    statsContainer: StyleProp<ViewStyle>;
    image(width: number, height: number): StyleProp<ImageStyle>;
}

export const characterStyles: CharacterStyles = {
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
    text: (size: number, color: string) =>({
        fontFamily: theme.fontFamily.blackCastle,
        fontSize: size,
        color: color,
    }),
    textContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        margin:5,
    },
    statsContainer:{
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
        borderRadius: 7,
        margin: 5
    })
}