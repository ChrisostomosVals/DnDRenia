import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { MainStat } from "../../blocks/MainStat/MainStat";
import { FC, Fragment, useEffect, useMemo } from "react";
import { RootState } from "../../store/store";
import { statsStyles } from "./Stats.style";
import StatModel from "../../dist/models/StatModel";
import { useSelector } from "react-redux";
import CharacterModel from "../../dist/models/CharacterModel";
import { GeneralStat } from "../../blocks/GeneralStat/GeneralStat";

export const Stats: FC = () => {
  const account = useSelector((state: RootState) => state.account);
  const character: CharacterModel | null = useSelector(
    (state: RootState) => state.account.character
  );
  const mainStats: StatModel[] =
    character?.stats?.filter((stat) => mainStatsNames.includes(stat.name)) ??
    [];
  const stats: StatModel[] =
    character?.stats?.filter((stat) => !mainStatsNames.includes(stat.name)) ??
    [];
  const abilityMod = useMemo(() => {
    return (stat: StatModel): string => {
      if (isNaN(Number(stat.value))) return "0";
      return Math.floor((Number(stat.value) - 10) / 2).toString();
    };
  }, [mainStats]);
  useEffect(() =>{}, [character]);
  if (!account.initialised)
    return <ActivityIndicator size={50} style={statsStyles.mainStats}/>;
  return (
    <ScrollView>
          <Fragment>
            <Text style={statsStyles.text}>Main Stats</Text>
            <View style={statsStyles.mainStats}>
              {!!mainStats.length && mainStats.map((stat: StatModel, index: number) => (
                <MainStat
                  key={index + stat.name}
                  middleTitle={abilityMod(stat)}
                  topTitle={stat.name}
                  bottomTitle={stat.value}
                />
              ))}
            </View>
            <Text style={statsStyles.text}>General Stats</Text>
            <View style={statsStyles.generalStats}>
              {!!stats.length && stats.map((stat: StatModel, index: number) => (
                <GeneralStat
                  key={index + stat.name}
                  name={stat.name}
                  value={stat.value}
                />
              ))}
            </View>
          </Fragment>
    </ScrollView>
  );
};
const mainStatsNames: string[] = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
];
