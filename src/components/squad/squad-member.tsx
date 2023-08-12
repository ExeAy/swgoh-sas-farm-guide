import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import type { Character } from "../../model/character";
import type {
  FarmGuideTeam,
  FarmGuideTeamMember,
} from "../../model/farm-guide";
import Ability from "./ability";
import RequiredGear from "./gear";
import { CharacterContext } from "../../contexts/CharactersContext";

interface SquadMemberProps {
  farmGuideTeamMember: FarmGuideTeamMember;
}

const SquadMember: React.FC<SquadMemberProps> = (props) => {
  const { farmGuideTeamMember } = props;

  const characters = useContext(CharacterContext);

  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    const character = characters.find(
      (char) => char.base_id === farmGuideTeamMember.id
    );
    setCharacter(character);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!farmGuideTeamMember) {
    return null;
  }

  if (farmGuideTeamMember.id === "OPTIONAL") {
    return (
      <div className="flex gap-1 items-center">
        <PermIdentityOutlinedIcon sx={{ fontSize: 50 }} />
        <span className="mb-1 leading-none text-sm">
          {farmGuideTeamMember?.name}
        </span>
      </div>
    );
  }

  if (!character) {
    return null;
  }

  return (
    <div className="flex gap-1 items-center">
      <Link href={character.url}>
        <Image
          src={character.image}
          alt={character.name}
          width={50}
          height={50}
        />
      </Link>
      <div className="flex flex-col justify-start">
        <span className="mb-1 leading-none text-sm">{character.name}</span>
        <RequiredGear teamMember={farmGuideTeamMember} />
        {farmGuideTeamMember.zetas?.length
          ? farmGuideTeamMember.zetas.map((zeta) => (
              <Ability
                farmGuideAbility={zeta}
                type="zeta"
                key={`zeta-${zeta.id}`}
              />
            ))
          : null}
        {farmGuideTeamMember.omicrons?.length
          ? farmGuideTeamMember.omicrons.map((omi) => (
              <Ability
                farmGuideAbility={omi}
                type="omicron"
                key={`omi-${omi.id}`}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default SquadMember;
