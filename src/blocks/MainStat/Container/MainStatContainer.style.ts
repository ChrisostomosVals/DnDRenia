import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { theme } from "../../../theme/theme";

export type MainStatContainerStyles = {
    container : StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>
}

export const mainStatContainerStyle : MainStatContainerStyles = {
    container: {
        width: '30%',
        height: '35%',
        marginTop: '10%',
        marginBottom: '10%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.color.primary.darkBlueGray,
        borderWidth: 5,
        borderRadius: 15,
        borderColor: theme.color.primary.lightGray,
        shadowColor:  theme.color.primary.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      },
      text:{
        fontFamily: theme.fontFamily.blackCastle,
        color: theme.color.primary.white,
        textAlign: 'center',
        fontSize: theme.fontSize.large
      }
}

