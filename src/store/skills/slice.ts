import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SkillState, SkillType } from "./types";

const initialState: SkillState = {
    skills: [],
    loading: false,
    initialised: false,
  };

  export const skillSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {
        initializeSkills: (state, { payload }: PayloadAction<SkillType[]>) =>{
            state.skills = payload;
            state.initialised = true;
            state.skills.forEach(skill => skill.totalBonus = skill.abilityMod + skill.miscMod + skill.ranks)
        },
        changeValue: (state, { payload }: PayloadAction<SkillType>) =>{
            const item = state.skills.find((item) => item.name === payload.name);
            if (item) {
                item.abilityMod = payload.abilityMod;
                item.trained = payload.trained;
                item.ranks = payload.ranks;
                item.miscMod = payload.miscMod;
                item.totalBonus = item.abilityMod + item.miscMod + item.ranks;
            }
        }
    }
  })