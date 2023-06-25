export type SkillType = {
    name: string;
    abilityMod: number;
    trained: boolean;
    ranks: number;
    miscMod: number;
    totalBonus: number;
}

export type SkillState = {
    skills: SkillType[];
    loading: boolean;
    initialised: boolean;
}