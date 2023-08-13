import {
  FarmGuideDataPart,
  FarmGuideTeam,
  FarmGuideTeamMember,
} from "../model/farm-guide";

const getCharactersFromTeam = (team: FarmGuideTeam): FarmGuideTeamMember[] => {
  const characters: FarmGuideTeamMember[] = [];

  if (team.members) {
    team.members.forEach((member) => {
      if (member.id !== "OPTIONAL") {
        characters.push(member);
      }
    });
  }

  if (team.optionalTeams) {
    team.optionalTeams.forEach((optionalTeam) => {
      characters.push(...getCharactersFromTeam(optionalTeam));
    });
  }

  return characters;
};

export const getCharacterFromPart = (
  part: FarmGuideDataPart
): FarmGuideTeamMember[] => {
  const characterIds: FarmGuideTeamMember[] = [];

  part.teamParts.forEach((teamOrPart) => {
    if (Array.isArray(teamOrPart)) {
      teamOrPart.forEach((part) => {
        characterIds.push(...getCharactersFromTeam(part));
      });
    } else {
      characterIds.push(...getCharactersFromTeam(teamOrPart));
    }
  });

  return characterIds;
};
