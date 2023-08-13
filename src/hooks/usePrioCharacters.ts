import { useContext, useMemo } from "react";
import { FarmDataContext } from "../contexts/FarmDataContext";
import { CharacterContext } from "../contexts/CharactersContext";
import { getCharacterFromPart } from "../utils/farm-guide.utils";
import { FarmGuideTeamMember } from "../model/farm-guide";
import { Player } from "../model/player";

const usePrioritizedCharacters = (player?: Player): FarmGuideTeamMember[] => {
  const farmGuide = useContext(FarmDataContext);
  const characters = useContext(CharacterContext);

  return useMemo<FarmGuideTeamMember[]>(() => {
    if (!player) {
      return [];
    }

    const playerHasCharacter = (character: FarmGuideTeamMember): boolean => {
      const index = player!.units.findIndex(
        (unit) => unit.base_id === character.id
      );
      return index >= 0;
    };

    const playerHasCharacterAtSevenStars = (
      character: FarmGuideTeamMember
    ): boolean => {
      const index = player!.units.findIndex(
        (unit) => unit.base_id === character.id
      );
      const playerCharacter = player!.units[index];

      return playerCharacter?.rarity === 7;
    };

    const playerCharacterIsLowGear = (
      character: FarmGuideTeamMember
    ): boolean => {
      if (!character.gear && !character.relic) return false;

      const playerCharacter = player!.units.find(
        (unit) => unit.base_id === character.id
      );

      return (
        playerCharacter!.gear_level < (character.gear ?? 0) ||
        playerCharacter!.relic_tier < (character.relic ?? 0)
      );
    };

    const allCharactersToFarm: FarmGuideTeamMember[] = [];
    const charactersToFarm: FarmGuideTeamMember[] = [];

    farmGuide.forEach((farmGuidePart) => {
      allCharactersToFarm.push(...getCharacterFromPart(farmGuidePart));
    });

    for (const characterToFarm of allCharactersToFarm) {
      if (
        !characters.findIndex(
          (character) => character.base_id === characterToFarm.id
        )
      ) {
        continue;
      }
      if (charactersToFarm.length >= 3) {
        break;
      }

      if (
        playerHasCharacter(characterToFarm) &&
        playerHasCharacterAtSevenStars(characterToFarm) &&
        !playerCharacterIsLowGear(characterToFarm)
      ) {
        continue;
      }
      charactersToFarm.push(characterToFarm);
    }

    return charactersToFarm;
  }, [player, farmGuide, characters]);
};

export default usePrioritizedCharacters;
