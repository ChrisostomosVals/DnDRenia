import { Skill } from "../../blocks/Skill/Skill";
import { FC, Fragment, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { skillsStyles } from "./Skills.style";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import SkillModel from "../../dist/models/SkillModel";

export const Skills: FC = () =>{
  const skills: SkillModel[] = useSelector((state: RootState) => state.account.character?.skills || []);

    return(
        <ScrollView style={skillsStyles.container}>
            <View style={skillsStyles.header.row}>
                <View style={skillsStyles.header.leftContainer}>
                    <View/><View/>
                    </View>
                <View style={skillsStyles.header.rightContainer}>
                    <Text style={skillsStyles.text}>Total{'\n'}Bonus</Text>
                    <Text style={skillsStyles.text}>Ability{'\n'}Mod</Text>
                    <Text style={skillsStyles.text}>Ranks</Text>
                    <Text style={skillsStyles.text}>Misc.{'\n'}Mod</Text>
                </View>
            </View>
            {!!skills.length && skills.map((skill,index) =>( 
            <Fragment key={index + skill.name}>
                <Skill  {...skill}/>
                <View
                    style={skillsStyles.lineBreak}
                    />
            </Fragment>)
            )}
        </ScrollView>
    )
} 