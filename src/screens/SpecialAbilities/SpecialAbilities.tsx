import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Text, View } from "react-native";
import { SpecialAbility } from "../../blocks/SpecialAbility/SpecialAbility";
import { specialAbilitiesStyles } from "./SpecialAbilities.style";

export const SpecialAbilities: FC = () => {

    const specialAbilities: string[] = useSelector((state: RootState) => state.account.character?.specialAbilities ?? []);
    return(
        <View style={specialAbilitiesStyles.container(!!specialAbilities.length ? 'flex-start' : 'center')}>
            {!!specialAbilities.length ? 
            specialAbilities.map((specialAbility: string, index: number ) => (
                <Fragment key={specialAbility + index}>
                    <SpecialAbility name={specialAbility}/>
                    <View
                        style={specialAbilitiesStyles.lineBreak}
                    />
                </Fragment>
            ))
            : <Text style={specialAbilitiesStyles.text}>No Special Abilities</Text>  
        }
        </View>
    )
};
