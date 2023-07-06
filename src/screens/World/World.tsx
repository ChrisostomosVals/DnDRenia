import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Location } from "../../blocks/Location/Location";
import LocationModel from "../../dist/models/LocationModel";
import { CharacterProps } from "../../blocks/Character/CharacterProps";
import { Character } from "../../blocks/Character/Character";
import WorldObjectModel from "../../dist/models/WorldObjectModel";
import { WorldObject } from "../../blocks/WorldObject/WorldObject";
import { WorldModal } from "../../components/Modal/WorldModal/WorldModal";
import { ScrollView, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../theme/theme";
import { worldStyles } from "./World.style";

export const World: FC = () => {
  const locations = useSelector((state: RootState) => state.map.locations);
  const worldObjects = useSelector(
    (state: RootState) => state.map.worldObjects
  );
  const characters = useSelector(
    (state: RootState) => state.characters.characters
  );
  const view = useSelector((state: RootState) => state.world.view);
  const races = useSelector((state: RootState) => state.characters.races);
  const classes = useSelector((state: RootState) => state.characters.classes);
  const charactersMapped = characters.map((character) => {
    const characterMapped: CharacterProps = {
      id: character.id!,
      name: character.name,
      characterClass: classes.find((cl) => cl.id === character.classId)?.name!,
      race: races.find((race) => race.id === character.raceId)?.name!,
      type: character.type,
      stats: character.stats ?? [],
    };
    return characterMapped;
  });
  const [worldVisible, setWorldVisible] = useState<boolean>(false);
  const [worldObject, setWorldObject] = useState<WorldObjectModel>();
  const [locationVisible, setLocationVisible] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationModel>();
  const [type, setType] = useState<"Create" | "Delete Event" | "Delete">(
    "Create"
  );
  const [transactionType, setTransactionType] = useState<"Edit" | "Delete">(
    "Edit"
  );
  const [event, setEvent] = useState<string>("");
  const handlePressWorld = (worldObject: WorldObjectModel, transactionType: "Edit" | "Delete"): void => {
    setTransactionType(transactionType)
    setWorldObject(worldObject);
    setWorldVisible(true);
  };
  const handleWorldVisiblity = (visible: boolean): void => {
    setWorldVisible(visible);
  };
  const handleLocationVisiblity = (visible: boolean): void => {
    setLocationVisible(visible);
  };
  const handleType = (type: "Create" | "Delete Event" | "Delete"): void => {
    setType(type);
  };
  const handleLongPressEvent = (ev: string, location: LocationModel): void => {
    handleLocationVisiblity(true);
    handleType("Delete Event");
    setEvent(ev);
    setLocation(location);
  };
  useEffect(() => {}, [locations, worldObjects, characters]);
  switch (view) {
    case "Locations":
    default:
      return (
        <>
          <ScrollView>
            {!!locations.length &&
              locations.map((location: LocationModel, index: number) => (
                <View key={location.id} style={worldStyles.locations.container}>
                  <View style={worldStyles.locations.icons}>
                    <MaterialCommunityIcons
                      name="note-plus"
                      color={theme.color.primary.white}
                      size={20}
                      onPress={() => {
                        setLocation(location);
                        handleLocationVisiblity(true);
                        handleType("Create");
                      }}
                    />
                    <MaterialCommunityIcons
                      name="delete"
                      color={theme.color.primary.white}
                      size={20}
                      onPress={() => {
                        setLocation(location);
                        handleLocationVisiblity(true);
                        handleType("Delete");
                      }}
                    />
                  </View>
                  <Location
                    onLongPress={handleLongPressEvent}
                    {...location}
                  />
                </View>
              ))}
          </ScrollView>
          <WorldModal.LocationModal
            id={location?.id ?? ""}
            date={location?.date ?? 0}
            season={location?.season ?? ""}
            time={location?.time ?? ""}
            year={location?.year ?? 0}
            events={location?.events ?? []}
            x={location?.x ?? ""}
            y={location?.y ?? ""}
            visible={locationVisible}
            handleVisiblity={handleLocationVisiblity}
            type={type}
            event={event}
          />
        </>
      );
    case "World-Objects":
      return (
        <>
          <ScrollView>
            {!!worldObjects.length &&
              worldObjects.map(
                (worldObject: WorldObjectModel, index: number) => (
                  <View key={worldObject.id} style={worldStyles.worldObjects.container}>
                    <View style={worldStyles.worldObjects.icons}>
                      <MaterialCommunityIcons
                        name="home-edit"
                        color={theme.color.primary.white}
                        size={20}
                        onPress={() => handlePressWorld(worldObject, 'Edit')}
                      />
                      <MaterialCommunityIcons
                        name="delete"
                        color={theme.color.primary.white}
                        size={20}
                        onPress={() => handlePressWorld(worldObject, 'Delete')}
                      />
                    </View>
                    <WorldObject {...worldObject} />
                  </View>
                )
              )}
          </ScrollView>
          <WorldModal.WorldObjectModal
            id={worldObject?.id ?? ""}
            description={worldObject?.description ?? ""}
            name={worldObject?.name ?? ""}
            properties={worldObject?.properties ?? []}
            type={worldObject?.type ?? ""}
            transactionType={transactionType}
            visible={worldVisible}
            handleVisiblity={handleWorldVisiblity}
          />
        </>
      );
    case "Characters":
      return (
        <ScrollView>
          {!!charactersMapped.length &&
            charactersMapped.map((character: CharacterProps, index: number) => (
              <Character key={character.id} {...character} />
            ))}
        </ScrollView>
      );
  }
};
