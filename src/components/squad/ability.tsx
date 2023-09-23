import { Tooltip } from "@mui/material";
import Image from "next/image";
import { Abilities } from "../../contexts/AbilitiesContext";
import type { FarmGuideAbility } from "../../model/farm-guide";

interface AbilityProps {
  farmGuideAbility: FarmGuideAbility;
  type: "zeta" | "omicron";
}

const Ability: React.FC<AbilityProps> = (props) => {
  const { farmGuideAbility, type } = props;

  const ability = Abilities.find(
    (ability) => ability.base_id === farmGuideAbility.id
  );

  let color: string;
  if (ability?.is_zeta) {
    if (farmGuideAbility.recommendation === "required") color = "indigo-800";
    else color = "indigo-400";
  } else if (ability?.is_omicron) {
    if (farmGuideAbility.recommendation === "required") color = "slate-800";
    else color = "slate-400";
  } else {
    color = "gray-800";
  }

  if (!ability) {
    return null;
  }

  return (
    <Tooltip title={ability.description}>
      <span
        key={ability.base_id}
        className={`leading-none text-xs text-${color} `}
      >
        {farmGuideAbility.recommendation === "recommended" ? "(" : null}
        {ability.is_zeta && type === "zeta" && (
          <Image
            src="https://game-assets.swgoh.gg/tex.skill_zeta.png"
            alt="Ability Material Zeta"
            className="inline"
            width={10}
            height={10}
          ></Image>
        )}
        {ability.is_omicron && type === "omicron" && (
          <Image
            src="https://game-assets.swgoh.gg/tex.skill_hexagon_white.png"
            alt="Ability Omicron Material"
            className="inline"
            width={10}
            height={10}
          ></Image>
        )}{" "}
        {ability.name}
        {farmGuideAbility.recommendation === "recommended" ? ")" : null}
      </span>
    </Tooltip>
  );
};

export default Ability;
