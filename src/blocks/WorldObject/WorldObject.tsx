import { FC, Fragment, useEffect, useState } from "react";
import WorldObjectModel from "../../dist/models/WorldObjectModel";
import { worldObjectStyles } from "./WorldObject.style";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme/theme";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ImageInfoModel } from "../../dist/models/ImageInfoModel";

export const WorldObject: FC<WorldObjectModel> = ({
  id,
  name,
  description,
  type,
  properties,
}) => {
  const images = useSelector(
    (state: RootState) => state.images.images.find((im) => im.id === id)?.images
  );
  const [show, setShow] = useState<boolean>(false);
  
  useEffect(() => {
  }, [id]);
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
          Images <SimpleLineIcons name={show ? "arrow-up" : "arrow-down"} />
        </Text>
      </TouchableOpacity>
      {!!images?.length &&
        show &&
        images.map((image: ImageInfoModel, index: number) => (
          <Image
            key={image.url + id}
            source={{ uri: image.url }}
            style={worldObjectStyles.image(image.width / 3, image.height / 3)}
          />
        ))}
    </View>
  );
};
