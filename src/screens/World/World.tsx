import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Location } from "../../blocks/Location/Location";
import LocationModel from "../../dist/models/LocationModel";
import { ScrollView } from "react-native-gesture-handler";

export const World: FC = () => {
  const locations = useSelector((state: RootState) => state.map.locations);
  useEffect(()=>{

  },[locations])
  return (
    <ScrollView>
      {!!locations.length &&
        locations.map((location: LocationModel, index: number) => (
          <Location key={location.id} {...location} />
        ))}
        
    </ScrollView>
  );
};
