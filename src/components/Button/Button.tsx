
import { TouchableOpacity, Text, StyleProp, ViewStyle, StyleSheet } from "react-native"
import { ButtonProps } from "./ButtonProps"
import { buttonStyles } from "./Button.style"

const Primary = ({
    title,
    onPress,
    disabled,
    extentedStyles
}: ButtonProps) =>
    (<TouchableOpacity style={style('primary', extentedStyles)} onPress={onPress} disabled={disabled}>
        <Text style={buttonStyles.primary.text}>{title}</Text>
    </TouchableOpacity>)


const Secondary = ({
    title,
    onPress,
    disabled,
    extentedStyles
}: ButtonProps) =>
    (<TouchableOpacity style={style('secondary', extentedStyles)} onPress={onPress} disabled={disabled}>
        <Text style={buttonStyles.secondary.text}>{title}</Text>
    </TouchableOpacity>)



export const Button = {
    Primary,
    Secondary
}

const style = ( type: 'primary' | 'secondary', extentedStyles?: StyleProp<ViewStyle>): StyleProp<ViewStyle> => {
    switch (type){
        case 'primary':
        default:
            if(extentedStyles)
                    return StyleSheet.compose(buttonStyles.primary.container, extentedStyles);
            return buttonStyles.primary.container;
        case 'secondary':
            if(extentedStyles)
                    return StyleSheet.compose(buttonStyles.secondary.container, extentedStyles);
            return buttonStyles.secondary.container;
    }
    
}
