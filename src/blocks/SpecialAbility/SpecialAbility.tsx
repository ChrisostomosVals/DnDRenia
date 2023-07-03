import { FC } from "react";
import { Text, View } from "react-native";
import { specialAbilityStyles } from "./SpecialAbility.style";

export const SpecialAbility: FC<{name: string}> = ({name}) => {
  return (
    <View>
      <Text style={specialAbilityStyles.text}>{name}</Text>
    </View>
  );
};
