import { FC } from "react";
import { Text, View } from "react-native";
import { featStyles } from "./Feat.style";

export const Feat: FC<{name: string}> = ({name}) => {
  return (
    <View>
      <Text style={featStyles.text}>{name}</Text>
    </View>
  );
};
