import { FC } from "react";
import { View } from "react-native";
import { lineBreakStyles } from "./LineBreak.style";

export const LineBreak: FC<{color: string}> = ({color}) => {
  return <View style={lineBreakStyles.lineBreak(color)} />;
};
