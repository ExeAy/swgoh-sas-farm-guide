export type OmiZetaRecommendation = "required" | "recommended";

export type Notes = {
  header?: string;
  texts: string[];
};

export type FarmGuideAbility = {
  id: string;
  recommendation: string;
};

export interface FarmGuideTeamMember {
  id: string;
  name?: string;
  gear?: number;
  relic?: number;
  zetas?: FarmGuideAbility[];
  omicrons?: FarmGuideAbility[];
}

export interface OptionalTeams {
  minimumTeamsToFarm: number;
  preferredTeamsToFarm?: string[];
  teams: FarmGuideTeam[];
}

export interface FarmGuideTeam {
  id: string;
  name: string;
  highlight?: boolean;
  withArrowAfter?: boolean;
  members?: FarmGuideTeamMember[];
  optionalTeams?: OptionalTeams;
  notes?: Notes;
}

export interface FarmGuideDataPart {
  id: string;
  name: string;
  color: string;
  description?: string;
  notes?: Notes;
  teamParts: (FarmGuideTeam | FarmGuideDataPart[])[];
}
