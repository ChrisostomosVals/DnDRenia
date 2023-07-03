import { FC } from "react";
import { View } from "react-native-animatable";
import { GeneralStatProp } from "./GeneralStatProp";
import { generalStatStyles } from "./GeneralStat.style";
import { Text } from "react-native";

export const GeneralStat: FC<GeneralStatProp> = ({ name, value }) => {
  return (
    <View style={generalStatStyles.body}>
      <View style={generalStatStyles.name.container}>
        <Text style={generalStatStyles.name.text}>{name}</Text>
      </View>
      <View style={generalStatStyles.value.container}>
        <Text style={generalStatStyles.value.text}>{value}</Text>
      </View>
    </View>
  );
};
