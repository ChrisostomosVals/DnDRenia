import { View, Text } from "react-native"
import { MainStatContainerProps } from "./MainStatContainerProps"
import { mainStatContainerStyle } from "./MainStatContainer.style"

export const Container = ({
    title
}: MainStatContainerProps) =>{

    return(
        <View >
            <Text style={mainStatContainerStyle.text}>{title}</Text>
        </View>
    )
}

