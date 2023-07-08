import { FC, Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import GearModel from "../../dist/models/GearModel";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { GearItem } from "../../blocks/GearItem/GearItem";
import { gearStyles } from "./Gear.style";
import { MoneyType } from "./Gear.types";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export const Gear: FC = () => {
  const gear: GearModel[] = useSelector(
    (state: RootState) => state.account.character?.gear ?? []
  );
  const totalwWeight: string = useMemo(()=>{
    let total = 0;  
    gear.forEach((item)=> {
        const itemSplit = item.weight?.split(' ');
        if(itemSplit && !isNaN(Number(itemSplit[0]))){
            total += (Number(itemSplit[0]) * Number(item.quantity));
        }
    })
    return (total.toString() + " lbs.")
  }, [gear])
  const money: MoneyType = useMemo(() =>{
    const moneyItem = gear.find((item) => {
        if (item.name === "Money") {
                return item;
            }
            return null;
        })
        if(moneyItem){
          let moneyArr = moneyItem.quantity.toFixed(2);
          const gold = moneyArr.split(".")[0];
          const silver = moneyArr.split(".")[1]![0];
          const copper = moneyArr.split(".")[1]![1];
          const moneyObject: MoneyType ={
            id: moneyItem.id!,
            gold: gold!,
            silver: silver!,
            copper: copper!,
          }
          return moneyObject;
        }
        return {
          id: '',
          gold: '0',
          silver: '0',
          copper: '0',
        };
  }, [gear])
  return (
    <ScrollView>
      <View>
            <Text style={gearStyles.text}>
            {money.gold} <FontAwesome5 name="coins" color="gold" />{" "}
            {money.silver} <FontAwesome5 name="coins" color="silver" />{" "}
            {money.copper} <FontAwesome5 name="coins" color="#b87333" />
            </Text>
          </View>
      {!!gear.length ? (
        <Fragment>
          <View style={gearStyles.row}>
            <View style={gearStyles.container}>
              <Text style={gearStyles.text}>Name</Text>
            </View>
            <View style={gearStyles.container}>
              <Text style={gearStyles.text}>Quantity</Text>
            </View>
            <View style={gearStyles.container}>
              <Text style={gearStyles.text}>Weight</Text>
            </View>
          </View>
          {gear.map((item, index) => (
            <Fragment key={item.id + item.name + index}>
              <GearItem {...item} />
              <View
                    style={gearStyles.lineBreak}
                    />
            </Fragment>
          ))}
          <View>
            <Text style={gearStyles.text}>Total Weight {totalwWeight}</Text>
          </View>
        </Fragment>
      ) : (
        <ActivityIndicator size={50} />
      )}
    </ScrollView>
  );
};
