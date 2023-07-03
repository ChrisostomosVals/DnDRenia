import { FC, Fragment, useState } from "react";
import WorldObjectModel from "../../dist/models/WorldObjectModel";
import { worldObjectStyles } from "./WorldObject.style";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../theme/theme";
import WorldObjectPropModel from "../../dist/models/WorldObjectPropModel";
import { LineBreak } from "../../components/LineBreak/LineBreak";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

export const WorldObject: FC<WorldObjectModel> = ({
  id,
  name,
  description,
  type,
  properties,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const propertiesMapped: WorldObjectPropModel[] = properties?.filter(property => 
    (property.name !=='latitude' && property.name !=='longitude')) ?? [];
  return (
    <View style={worldObjectStyles.textContainer}>
      <Text
        style={worldObjectStyles.text(
          theme.color.primary.purple ?? "white",
          theme.fontSize.medium
        )}
      >
        {name}
      </Text>
      <Text
        style={worldObjectStyles.text(
          theme.color.primary.white ?? "white",
          theme.fontSize.small
        )}
      >
        {description}
      </Text>
      <Text
        style={worldObjectStyles.text(
          theme.color.primary.white ?? "white",
          theme.fontSize.small
        )}
      >
        {type}
      </Text>
      <TouchableOpacity onPress={() => setShow(!show)}>
        <Text
          style={worldObjectStyles.text(
            theme.color.primary.white ?? "white",
            theme.fontSize.small
          )}
        >
          Properties <SimpleLineIcons name={show ? "arrow-up" : "arrow-down"} />
        </Text>
      </TouchableOpacity>
      {!!propertiesMapped?.length &&
        show &&
        propertiesMapped.map((prop: WorldObjectPropModel, index: number) => (
          <Fragment key={index + prop.name + prop.value}>
            <View style={worldObjectStyles.propertiesContainer}>
              <Text
                style={worldObjectStyles.text(
                  theme.color.primary.white ?? "white",
                  theme.fontSize.small
                )}
              >
                {prop.name}
              </Text>
              <Text
                style={worldObjectStyles.text(
                  theme.color.primary.white ?? "white",
                  theme.fontSize.small
                )}
              >
                {prop.value}
              </Text>
            </View>
            <LineBreak color={theme.color.primary.lightGray ?? "white"} />
          </Fragment>
        ))}
    </View>
  );
};
