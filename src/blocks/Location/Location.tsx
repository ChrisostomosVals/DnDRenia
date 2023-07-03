import { FC, Fragment, useState } from "react";
import LocationModel from "../../dist/models/LocationModel";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import { locationStyles } from "./Location.style";
import { theme } from "../../theme/theme";
import { LineBreak } from "../../components/LineBreak/LineBreak";

export const Location: FC<
  LocationModel & { onLongPress: (ev: string, location: LocationModel) => void }
> = ({ id, date, season, time, year, events, x, y, onLongPress }) => {
  return (
    <View>
      <Text style={locationStyles.text}>Time: {time}</Text>
      <Text style={locationStyles.text}>Date: {date}</Text>
      <Text style={locationStyles.text}>Year: {year}</Text>
      <Text style={locationStyles.text}>Season: {season}</Text>

      {!!events?.length && (
        <>
          <Text style={locationStyles.text}>Events</Text>
          {events.map((ev: string, index: number) => (
            <Fragment key={id + index}>
              <TouchableOpacity
                onLongPress={() =>
                  onLongPress(ev, {
                    id,
                    date,
                    season,
                    time,
                    year,
                    events,
                    x,
                    y,
                  })
                }
              >
                <Text style={locationStyles.textEvents}>{ev}</Text>
              </TouchableOpacity>
              <LineBreak color={theme.color.primary.lightGray ?? "white"} />
            </Fragment>
          ))}
        </>
      )}
    </View>
  );
};
