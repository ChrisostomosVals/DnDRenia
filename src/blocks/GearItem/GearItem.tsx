import { Text, View } from "react-native";
import GearModel from "../../dist/models/GearModel";
import { FC } from "react";
import { gearItemStyles } from "./GearItem.style";

export const GearItem: FC<GearModel> = ({ name, quantity, weight }) => {
  return (
    <View style={gearItemStyles.row}>
      <View style={gearItemStyles.container}>
        <Text style={gearItemStyles.text}>{name}</Text>
      </View>
      <View style={gearItemStyles.container}>
        <Text style={gearItemStyles.text}>{quantity}</Text>
      </View>
      <View style={gearItemStyles.container}>
        <Text style={gearItemStyles.text}>{weight}</Text>
      </View>
    </View>
  );
};
