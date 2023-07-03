import { FC, useState } from "react";
import LocationModel from "../../dist/models/LocationModel";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Callout, CalloutPressEvent } from "react-native-maps";
import { customCalloutStyles } from "./CustomCallout.style";
import { CustomModal } from "../../components/Modal/Modal";
import { useDispatch } from "react-redux";
import modalActions from "../../store/modal/actions";
import WorldObjectModel from "../../dist/models/WorldObjectModel";

export const CustomCallout: FC<LocationModel> = ({
  id,
  date,
  season,
  time,
  year,
  events,
}) => {
  const { width, height } = Dimensions.get("window");
  const dispatch = useDispatch();
  const handlePress = (event: CalloutPressEvent) => {
    dispatch(
      modalActions.setCalloutContent({
        title: "Events",
        subTitle: null,
        events: events ?? [],
      })
    );
    dispatch(modalActions.setCalloutVisibility(true));
  };
  
  return (
    <Callout
      style={customCalloutStyles.callout(width / 2)}
      onPress={handlePress}
      tooltip={true}
    >
      <View style={customCalloutStyles.container}>
        <Text style={customCalloutStyles.text}>
          Date: {date} Time: {time}
        </Text>
        <Text style={customCalloutStyles.text}>
          Year: {year} Season: {season}
        </Text>
      </View>
      <CustomModal.CalloutModal />
    </Callout>
  );
};

export const CustomCalloutWorld: FC<WorldObjectModel> = ({
  id,
  name,
  type,
  description,
}) => {
  const { width, height } = Dimensions.get("window");

  return (
    <Callout style={customCalloutStyles.callout(width / 2)} tooltip={true}>
      <View style={customCalloutStyles.container}>
        <Text style={customCalloutStyles.text}>{name}</Text>
        <Text style={customCalloutStyles.text}>{type}</Text>
        {!!description && (
          <Text style={customCalloutStyles.text}>{description}</Text>
        )}
      </View>
    </Callout>
  );
};
