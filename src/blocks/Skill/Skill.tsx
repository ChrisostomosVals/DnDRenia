import { FC } from "react";
import { Text, View } from "react-native";
import { skillStyles } from "./Skill.style";
import Checkbox from "expo-checkbox";
import SkillModel from "../../dist/models/SkillModel";

export const Skill: FC<SkillModel> = ({
  name,
  abilityMod,
  trained,
  ranks,
  miscMod
}) => (
  <View style={skillStyles.row}>
    <View style={skillStyles.leftContainer}>
      <View style={skillStyles.checkbox.container}>
        <Checkbox
          value={trained}
          color={skillStyles.checkbox.color}
          style={skillStyles.checkbox.inner}
        />
      </View>
      <View style={skillStyles.name}>
        <Text style={skillStyles.text}>{name}</Text>
      </View>
    </View>
    <View style={skillStyles.rightContainer}>
      <View style={skillStyles.number("purple")}>
        <Text style={skillStyles.text}>{abilityMod + ranks + miscMod}</Text>
      </View>
      <View style={skillStyles.number("darkBlueGray")}>
        <Text style={skillStyles.text}>{abilityMod}</Text>
      </View>
      <View style={skillStyles.number("darkBlueGray")}>
        <Text style={skillStyles.text}>{ranks}</Text>
      </View>
      <View style={skillStyles.number("darkBlueGray")}>
        <Text style={skillStyles.text}>{miscMod}</Text>
      </View>
    </View>
  </View>
);
