import type { PlayerCharacter } from './character'

export type OmiZetaRecommendation = 'required' | 'recommended'

export type FarmGuideAbility = {
  id: string
  recommendation: string
}

export interface FarmGuideTeamMember {
  id: string
  gear: number
  relic?: number
  zetas?: FarmGuideAbility[]
  omicrons?: FarmGuideAbility[]
}

export interface FarmGuideTeam {
  id: string
  name: string
  members: FarmGuideTeamMember[]
  notes?: string
}

export interface FarmGuideDataPart {
  id: string
  name: string
  description: string
  teams: FarmGuideTeam[]
}
