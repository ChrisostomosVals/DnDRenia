import { View, Text } from "react-native"
import { MainStatCircleProps } from "./MainStatCircleProp"
import { mainStatCircleStyle } from "./MainStatCircle.style"
export const TopCircle = ({
    title
}: MainStatCircleProps) =>{
    return (
        <View style={mainStatCircleStyle.top}>
            <Text style={mainStatCircleStyle.text}>{title}</Text>
        </View>
    )
}
export const BottomCircle = ({
    title
    }: MainStatCircleProps) =>{
        return (
            <View style={mainStatCircleStyle.bottom}>
                <Text style={mainStatCircleStyle.text}>{title}</Text>
            </View>
        )
    }