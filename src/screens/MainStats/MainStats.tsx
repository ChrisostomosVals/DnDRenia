import { View } from "react-native";
import { MainStatType } from "../../store/mainStats/types";
import { MainStat } from "../../blocks/MainStat/MainStat";
import { FC, useMemo } from "react";
import { useSelector } from 'react-redux';
import { RootState } from "../../store/store";
import { mainStatsStyles } from "./MainStats.style";

export const MainStats: FC = () =>{
  const mainStats: MainStatType[] = useSelector((state: RootState) => state.mainStats.mainStats);
  
  const abilityMod = useMemo(() => {
    return (stat: MainStatType): string => {
      return Math.floor((Number(stat.value) - 10) / 2).toString();
    };
  }, [mainStats]);
  
  return (
      <View style={mainStatsStyles.container}>
      {!!mainStats.length && 
      mainStats.map((stat: MainStatType, index: number) => (
        <MainStat 
          key={index}
          middleTitle={abilityMod(stat)}
          topTitle={stat.name}
          bottomTitle={stat.value}
          />
      ))}
      </View>
    );
}
