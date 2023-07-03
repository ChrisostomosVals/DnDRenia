import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Text, View } from "react-native";
import { Feat } from "../../blocks/Feat/Feat";
import { featsStyles } from "./Feats.style";

export const Feats: FC = () => {

    const feats: string[] = useSelector((state: RootState) => state.account.character?.feats ?? []);
    return(
        <View style={featsStyles.container(!!feats.length ? 'flex-start' : 'center')}>
            {!!feats.length ? 
            feats.map((feat: string, index: number ) => (
                <Fragment key={feat + index}>
                    <Feat name={feat}/>
                    <View
                        style={featsStyles.lineBreak}
                    />
                </Fragment>
            ))
            : <Text style={featsStyles.text}>No Feats</Text>  
        }
        </View>
    )
};
