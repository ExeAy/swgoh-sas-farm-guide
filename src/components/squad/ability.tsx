import { Tooltip } from "@mui/material";
import Image from "next/image";
import { useContext, useMemo } from "react";
import { AbilitiesContext } from "../../contexts/AbilitiesContext";
import type { FarmGuideAbility } from "../../model/farm-guide";

interface AbilityProps {
  farmGuideAbility: FarmGuideAbility;
  type: "zeta" | "omicron";
}

const Ability: React.FC<AbilityProps> = (props) => {
  const { farmGuideAbility, type } = props;

  const abilities = useContext(AbilitiesContext);

  const ability = useMemo(
    () => abilities.find((ability) => ability.base_id === farmGuideAbility.id),
    [abilities, farmGuideAbility]
  );
  const color = useMemo<string>(() => {
    if (ability?.is_zeta) {
      if (farmGuideAbility.recommendation === "required") return "indigo-800";
      else return "indigo-400";
    } else if (ability?.is_omicron) {
      if (farmGuideAbility.recommendation === "required") return "slate-800";
      else return "slate-400";
    }
    return "gray-800";
  }, [ability, farmGuideAbility]);

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
