import { Character, PlayerCharacter } from "../model/character";
import { Player } from "../model/player";

export const characterIsGL = (character: Character) => {
  return character.categories.includes("Galactic Legend");
};

export const getPlayerGLs = (player: Player): PlayerCharacter[] => {
  return player.units.filter((unit) => characterIsGL(unit));
};
