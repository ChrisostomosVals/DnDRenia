
import { TouchableOpacity, Text } from "react-native"
import { ButtonProps } from "./ButtonProps"
import { buttonStyles } from "./Button.style"

const Primary = ({
    title,
    onPress,
    disabled
}: ButtonProps) =>
    (<TouchableOpacity style={buttonStyles.primary.container} onPress={onPress} disabled={disabled}>
        <Text style={buttonStyles.primary.text}>{title}</Text>
    </TouchableOpacity>)


const Secondary = ({
    title,
    onPress,
    disabled
}: ButtonProps) =>
    (<TouchableOpacity style={buttonStyles.secondary.container} onPress={onPress} disabled={disabled}>
        <Text style={buttonStyles.secondary.text}>{title}</Text>
    </TouchableOpacity>)



export const Button = {
    Primary,
    Secondary
}