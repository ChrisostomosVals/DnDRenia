import { FC } from "react";
import { EditStats } from "./Stats/EditStats";
import { EditSkills } from "./Skills/EditSkills";

export const EditSheet:FC<{type: 'stats' | 'skills' | 'gear' | 'feats' | 'special abilities'}> = ({type}) =>{

    switch(type){
        case 'stats':
        default:
            return(
                <EditStats />
            )
        case 'skills':
            return (
                <EditSkills />
            )
      }
}