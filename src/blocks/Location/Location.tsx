import { FC, Fragment, useState } from "react";
import LocationModel from "../../dist/models/LocationModel";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import { locationStyles } from "./Location.style";
import { WorldModal } from "../../components/Modal/WorldModal/WorldModal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../theme/theme";
import { LineBreak } from "../../components/LineBreak/LineBreak";

export const Location: FC<LocationModel> = ({
  id,
  date,
  season,
  time,
  year,
  events,
  x,
  y,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [type, setType] = useState<"Create" | "Delete">("Create");
  const [event, setEvent] = useState<string>('');
  const handleVisiblity = (vis: boolean): void => {
    setVisible(vis);
  };
  const handleType = (type: "Create" | "Delete"): void => {
    setType(type);
  };
  return (
    <View>
      <View style={locationStyles.container}>
        <MaterialCommunityIcons
          name="note-plus"
          color={theme.color.primary.white}
          size={20}
          onPress={() => {
            handleVisiblity(true);
            handleType("Create");
          }}
        />
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
                  onLongPress={() => {
                    handleVisiblity(true);
                    handleType("Delete");
                    setEvent(ev);
                  }}
                >
                  <Text style={locationStyles.textEvents}>{ev}</Text>
                </TouchableOpacity>
                <LineBreak color={theme.color.primary.lightGray ?? "white"} />
              </Fragment>
            ))}
          </>
        )}
      </View>
      <WorldModal.LocationModal
        id={id}
        date={date}
        season={season}
        time={time}
        year={year}
        events={events}
        x={x}
        y={y}
        visible={visible}
        handleVisiblity={handleVisiblity}
        type={type}
        event={event}
      />
    </View>
  );
};
