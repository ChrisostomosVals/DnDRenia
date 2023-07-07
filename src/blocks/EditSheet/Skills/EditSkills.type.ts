import SkillModel from "../../../dist/models/SkillModel"

export type SkillsFormData = {
    skills: SkillModel[];
}

export type FieldProps = {
    onChange: (value: number) => void;
    value?: number;
  };