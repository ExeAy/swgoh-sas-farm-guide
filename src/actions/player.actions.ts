"use server";

import { Characters } from "../contexts/CharactersContext";
import { FarmGuideData } from "../contexts/FarmDataContext";
import { FarmGuideTeamMember } from "../model/farm-guide";
import { Player } from "../model/player";
import { getRecommendedCharacters } from "../utils/farm-guide.utils";

interface UnitResponse {
  data: {
    base_id: string;
    gear_level: number;
    name: string;
    omicron_abilities: string[];
    relic_tier: number;
    url: string;
    zeta_abilities: string[];
    rarity: number;
    is_galactic_legend: boolean;
  };
}

export async function getPlayerData(allyCode: string): Promise<Player> {
  const formattedAllyCode = allyCode.toString().replace(/-/g, "");

  try {
    const response = await fetch(
      `https://swgoh.gg/api/player/${formattedAllyCode}`,
      { next: { revalidate: 3600 } }
    );
    const responseData = await response.json();

    if (!responseData.data) {
      throw new Error("No player data found");
    }

    return {
      allyCode: responseData.data.ally_code,
      name: responseData.data.name,
      units: responseData.units.map((unit: UnitResponse) => ({
        base_id: unit.data.base_id,
        gear_level: unit.data.gear_level,
        name: unit.data.name,
        omicron_abilities: unit.data.omicron_abilities,
        relic_tier: unit.data.relic_tier,
        url: unit.data.url,
        zeta_abilities: unit.data.zeta_abilities,
        rarity: unit.data.rarity,
        isGalacticLegend: unit.data.is_galactic_legend,
      })),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCharacterRecommendation(
  allyCode: string
): Promise<FarmGuideTeamMember[]> {
  const player = await getPlayerData(allyCode);
  return getRecommendedCharacters(player, FarmGuideData, Characters);
}
