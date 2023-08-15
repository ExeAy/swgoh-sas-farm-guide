import { Character } from "../model/character";
import type {
  FarmGuideDataPart,
  FarmGuideTeam,
  FarmGuideTeamMember,
  OptionalTeams,
  FarmGuideDataSubPart,
} from "../model/farm-guide";
import { Player } from "../model/player";

export interface CharacterRecommendationParams {
  part: FarmGuideDataPart;
  recommendedCharacters?: FarmGuideTeamMember[];
  player: Player;
}

const MAX_RECOMMENDED_CHARACTERS = 3;

const isTeamMemberFinished = (
  member: FarmGuideTeamMember,
  params: CharacterRecommendationParams
): boolean => {
  if (member.id === "OPTIONAL") return true;

  const playerCharacter = params.player.units.find(
    (unit) => unit.base_id === member.id
  );

  console.log("playerCharacter", playerCharacter);
  console.log("member", member);

  if (!playerCharacter) return false;
  if (playerCharacter.rarity < 7) return false;
  if (member.gear !== undefined && playerCharacter.gear_level < member.gear)
    return false;
  if (member.relic !== undefined && playerCharacter.relic_tier < member.relic)
    return false;

  return true;
};

const isTeamFinished = (
  team: FarmGuideTeam,
  params: CharacterRecommendationParams
): boolean => {
  return !team.members?.some((member) => !isTeamMemberFinished(member, params));
};

const getRecommendedCharactersFromOptionalTeams = (
  optionalTeams: OptionalTeams,
  params: CharacterRecommendationParams
): FarmGuideTeamMember[] => {
  const { recommendedCharacters } = params;

  console.log("optionalTeams", optionalTeams);

  let numberOfFinishedTeams = 0;
  for (const optionalTeam of optionalTeams.teams) {
    if (numberOfFinishedTeams >= optionalTeams.minimumTeamsToFarm) break;

    console.log("optionalTeam", optionalTeam);
    if (isTeamFinished(optionalTeam, params)) {
      console.log("team is finished", optionalTeam);
      numberOfFinishedTeams++;
      continue;
    }
    console.log("team is not finished", optionalTeam);
  }

  console.log("numberOfFinishedTeams", numberOfFinishedTeams);
  if (numberOfFinishedTeams >= optionalTeams.minimumTeamsToFarm) {
    return recommendedCharacters ?? [];
  }

  let newRecommendedCharacters: FarmGuideTeamMember[] = [
    ...(recommendedCharacters ?? []),
  ];
  const preferredTeamsToFarm = optionalTeams.preferredTeamsToFarm ?? [];
  console.log("preferredTeamsToFarm", preferredTeamsToFarm);
  preferredTeamsToFarm.forEach((teamId) => {
    console.log("teamId", teamId);
    const team = optionalTeams.teams.find((team) => team.id === teamId);
    console.log("team", team);
    if (team) {
      newRecommendedCharacters = getRecommendedCharactersFromTeam(team, params);
      if (newRecommendedCharacters.length >= MAX_RECOMMENDED_CHARACTERS)
        console.log(
          "returning newRecommendedCharacters",
          newRecommendedCharacters
        );
      return newRecommendedCharacters;
    }
  });

  return newRecommendedCharacters;
};

const getRecommendedCharactersFromTeam = (
  team: FarmGuideTeam,
  params: CharacterRecommendationParams
): FarmGuideTeamMember[] => {
  const { recommendedCharacters } = params;

  const newRecommendedCharacters: FarmGuideTeamMember[] = [
    ...(recommendedCharacters ?? []),
  ];

  if (team.members) {
    console.log("team has members", team.members);
    for (const member of team.members) {
      console.log("checking member", member);
      if (!isTeamMemberFinished(member, params)) {
        console.log("member is not finished", member);
        newRecommendedCharacters.push(member);

        if (newRecommendedCharacters.length >= MAX_RECOMMENDED_CHARACTERS)
          return newRecommendedCharacters;
      } else {
        console.log("member is finished", member);
      }
    }
  } else if (team.optionalTeams) {
    return getRecommendedCharactersFromOptionalTeams(team.optionalTeams, {
      ...params,
      recommendedCharacters: newRecommendedCharacters,
    });
  }

  return newRecommendedCharacters;
};

const getRecommendedCharacterFromPart = (
  params: CharacterRecommendationParams
): FarmGuideTeamMember[] => {
  const { part, recommendedCharacters, player } = params;

  if (
    !!recommendedCharacters &&
    recommendedCharacters.length >= MAX_RECOMMENDED_CHARACTERS
  ) {
    console.log(
      "returning recommended characters from part",
      recommendedCharacters
    );
    return recommendedCharacters;
  }

  let newRecommendedCharacters: FarmGuideTeamMember[] = [
    ...(recommendedCharacters ?? []),
  ];

  part.teamParts.forEach((team) => {
    if (Object.keys(team).includes("subParts")) {
      console.log("teams is data part");
      // (team as FarmGuideDataSubPart).subParts.forEach((subPart) => {
      //   console.log("subPart", subPart);
      //   newRecommendedCharacters = getRecommendedCharacterFromPart({
      //     part: subPart,
      //     recommendedCharacters: newRecommendedCharacters,
      //     player,
      //   });
      //   console.log(
      //     "newRecommendedCharacters for subPart",
      //     subPart.id,
      //     newRecommendedCharacters
      //   );

      //   if (newRecommendedCharacters.length >= MAX_RECOMMENDED_CHARACTERS)
      //     return newRecommendedCharacters;
      // });
    } else {
      newRecommendedCharacters = getRecommendedCharactersFromTeam(
        team as FarmGuideTeam,
        {
          ...params,
          recommendedCharacters: newRecommendedCharacters,
        }
      );
      console.log(
        "newRecommendedCharacters for teamPart",
        team,
        newRecommendedCharacters
      );
    }
  });

  return newRecommendedCharacters;
};

export const getRecommendedCharacters = (
  player: Player,
  farmGuideData: FarmGuideDataPart[]
): FarmGuideTeamMember[] => {
  let recommendedCharacters: FarmGuideTeamMember[] = [];
  for (const part of farmGuideData) {
    console.log("looking at part", part.name);
    recommendedCharacters = getRecommendedCharacterFromPart({
      recommendedCharacters,
      part,
      player,
    });

    if (recommendedCharacters.length >= MAX_RECOMMENDED_CHARACTERS) break;
  }

  return recommendedCharacters;
};
