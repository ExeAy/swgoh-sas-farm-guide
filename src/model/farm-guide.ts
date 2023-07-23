import type { PlayerCharacter } from './character'

export type OmiZetaRecommendation = 'required' | 'recommended'

export interface FarmGuideTeamMember {
  id: string
  gear: number
  relic: number
  zetas?: {
    id: string
    recommendation: string
  }[]
  omicrons?: {
    id: string
    recommendation: string
  }[]
}

export interface FarmGuideTeam {
  id: string
  name: string
  members: FarmGuideTeamMember[]
}

export interface FarmGuideDataPart {
  id: string
  name: string
  description: string
  teams: FarmGuideTeam[]
}
