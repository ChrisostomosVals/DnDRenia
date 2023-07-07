import { FC, Fragment, useEffect, useState } from "react";
import { EditSheet } from "../../blocks/EditSheet/EditSheet";
import { theme } from "../../theme/theme";
import Icon from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import { characterSheetStyles } from "./CharacterSheet.style";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

export const CharacterSheet: FC = () => {
  const [type, setType] = useState<
    "stats" | "skills" | "gear" | "feats" | "special abilities"
  >("stats");
  return (
    <Fragment>
      <View style={characterSheetStyles.icons}>
        <Icon
          name="stats-chart"
          size={30}
          color={
            type === "stats"
              ? theme.color.primary.purple
              : theme.color.primary.lightGray
          }
          onPress={() => setType('stats')}
        />
        <MaterialIcon
              name="brain"
              size={30}
              color={
                type === "skills"
                  ? theme.color.primary.purple
                  : theme.color.primary.lightGray
              }
          onPress={() => setType('skills')}
          />
      </View>

      <EditSheet type={type} />
    </Fragment>
  );
};
