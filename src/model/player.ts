import type { PlayerCharacter } from "./character"

export interface Player {
  allyCode: string
  name: string
  units: PlayerCharacter[]
}
