import { FC, Fragment, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { CharacterProps } from "./CharacterProps";
import { characterStyles } from "./Character.style";
import { LineBreak } from "../../components/LineBreak/LineBreak";
import { theme } from "../../theme/theme";
import StatModel from "../../dist/models/StatModel";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

export const Character: FC<CharacterProps> = ({
  id,
  name,
  stats,
  type,
  characterClass,
  race,
}) => {
    const [show, setShow] = useState<boolean>(false);
  return (
    <View style={characterStyles.container}>
      <View style={characterStyles.textContainer}>
        <Text
          style={characterStyles.text(
            theme.fontSize.medium,
            theme.color.primary.purple ?? "white"
          )}
        >
          {name}
        </Text>
      </View>
      <LineBreak color={theme.color.primary.lightGray ?? "white"} />
      <View style={characterStyles.statsContainer}>
        <Text
          style={characterStyles.text(
            theme.fontSize.small,
            theme.color.primary.white ?? "white"
          )}
        >
          Class
        </Text>
        <Text
          style={characterStyles.text(
            theme.fontSize.small,
            theme.color.primary.white ?? "white"
          )}
        >
          {characterClass}
        </Text>
      </View>
      <LineBreak color={theme.color.primary.lightGray ?? "white"} />
      <View style={characterStyles.statsContainer}>
        <Text
          style={characterStyles.text(
            theme.fontSize.small,
            theme.color.primary.white ?? "white"
          )}
        >
          Race
        </Text>
        <Text
          style={characterStyles.text(
            theme.fontSize.small,
            theme.color.primary.white ?? "white"
          )}
        >
          {race}
        </Text>
      </View>
      <LineBreak color={theme.color.primary.lightGray ?? "white"} />
      <View style={characterStyles.statsContainer}>
        <Text
          style={characterStyles.text(
            theme.fontSize.small,
            theme.color.primary.white ?? "white"
          )}
        >
          Type
        </Text>
        <Text
          style={characterStyles.text(
            theme.fontSize.small,
            theme.color.primary.white ?? "white"
          )}
        >
          {type}
        </Text>
      </View>
      <LineBreak color={theme.color.primary.lightGray ?? "white"} />
      <TouchableOpacity onPress={() => setShow(!show)} style={characterStyles.textContainer}>
        <Text
          style={characterStyles.text(
            theme.fontSize.small,
            theme.color.primary.white ?? "white"
          )}
        >
          Stats <SimpleLineIcons name={show ? 'arrow-up' : 'arrow-down'} />
        </Text>
      </TouchableOpacity>
      {(!!stats.length && show) &&
       
        stats.map((stat: StatModel, index: number) => (
          <Fragment key={id + stat.name + index}>
            <View style={characterStyles.statsContainer}>
              <Text
                style={characterStyles.text(
                  theme.fontSize.small,
                  theme.color.primary.white ?? "white"
                )}
              >
                {stat.name}
              </Text>
              <Text
                style={characterStyles.text(
                  theme.fontSize.small,
                  theme.color.primary.white ?? "white"
                )}
              >
                {stat.value}
              </Text>
            </View>
            <LineBreak color={theme.color.primary.lightGray ?? "white"} />
          </Fragment>
        ))}
    </View>
  );
};
