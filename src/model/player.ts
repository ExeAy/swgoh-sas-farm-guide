import type { PlayerCharacter } from './character'

export interface Player {
  allyCode: string
  units: PlayerCharacter[]
}
