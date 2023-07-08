import { FC } from "react";
import { EditStats } from "./Stats/EditStats";
import { EditSkills } from "./Skills/EditSkills";
import { EditGear } from "./Gear/EditGear";

export const EditSheet: FC<{
  type: "stats" | "skills" | "gear" | "feats" | "special abilities";
}> = ({ type }) => {
  switch (type) {
    case "stats":
    default:
      return <EditStats />;
    case "skills":
      return <EditSkills />;
    case "gear":
      return <EditGear />;
    case "feats":
        return <EditGear />;
  }
};
