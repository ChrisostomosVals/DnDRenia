import { View } from "react-native";
import { MainStatComponents } from "./MainStatComponents";
import { mainStatContainerStyle } from "./Container/MainStatContainer.style";
import { FC } from "react";
type MainStatProps = {
  topTitle: string;
  middleTitle: string;
  bottomTitle: string;
};

export const MainStat: FC<MainStatProps> = ({
  topTitle,
  middleTitle,
  bottomTitle,
}) => {
  return (
    <View style={mainStatContainerStyle.container}>
      <MainStatComponents.TopCircle title={topTitle} />
      <MainStatComponents.Container title={middleTitle} />
      <MainStatComponents.BottomCircle title={bottomTitle} />
    </View>
  );
};
