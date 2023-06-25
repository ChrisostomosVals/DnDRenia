import { SkillProps } from "../../blocks/Skill/SkillProps";
import { Skill } from "../../blocks/Skill/Skill";
import { FC, Fragment, useMemo } from "react";
import { ScrollView, View } from "react-native";
import { skillsStyles } from "./Skills.style";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export const Skills: FC = () =>{
  const skills: SkillProps[] = useSelector((state: RootState) => state.skills.skills);

    return(
        <ScrollView style={skillsStyles.container}>
            {skills.map((skill,index) =>( 
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