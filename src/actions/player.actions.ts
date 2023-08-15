"use server";

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
    categories: string[];
  };
}

export async function getPlayerData(allyCode: string): Promise<Player> {
  console.log("getPlayerData", allyCode);
  const formattedAllyCode = allyCode.toString().replace(/-/g, "");

  try {
    const response = await fetch(
      `http://api.swgoh.gg/player/${formattedAllyCode}`
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
  return getRecommendedCharacters(player, FarmGuideData);
}
