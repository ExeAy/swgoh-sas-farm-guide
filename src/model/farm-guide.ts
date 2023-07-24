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
  members?: FarmGuideTeamMember[]
  subTeams?: FarmGuideTeam[]
  notes?: string
}

export interface FarmGuideDataPart {
  id: string
  name: string
  color: string
  description: string
  teams: FarmGuideTeam[]
}
