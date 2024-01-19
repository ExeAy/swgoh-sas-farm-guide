import { Character, PlayerCharacter } from "../model/character"
import { Player } from "../model/player"

export const characterIsGalacticLegend = (character?: Character): boolean => {
  if (!character) return false
  return character.categories.includes("Galactic Legend")
}

export const getPlayerGLs = (player: Player): PlayerCharacter[] => {
  return player.units.filter((unit) => unit.isGalacticLegend)
}
