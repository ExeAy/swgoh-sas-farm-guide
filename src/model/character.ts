export interface Character {
  name: string;
  base_id: string;
  url: string;
  image: string;
}

export interface PlayerCharacter extends Character {
  gear_level: number;
  relic_tier: number;
  zeta_abilities: string[];
  omicron_abilities: string[];
  rarity: number;
}
