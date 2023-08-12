export type OmiZetaRecommendation = 'required' | 'recommended'

export type FarmGuideAbility = {
  id: string
  recommendation: string
}

export interface FarmGuideTeamMember {
  id: string
  name?: string
  gear?: number
  relic?: number
  zetas?: FarmGuideAbility[]
  omicrons?: FarmGuideAbility[]
}

export interface FarmGuideTeam {
  id: string
  name: string
  highlight?: boolean
  withArrowAfter?: boolean
  members?: FarmGuideTeamMember[]
  optionalTeams?: FarmGuideTeam[]
  notes?: string
}

export interface FarmGuideDataPart {
  id: string
  name: string
  color: string
  description: string
  notes: string
  teamParts: (FarmGuideTeam | FarmGuideDataPart[])[]
}
