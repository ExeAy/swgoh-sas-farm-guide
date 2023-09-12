import SubPart from "../components/sub-part";
import { Character } from "../model/character";
import type {
  FarmGuideDataPart,
  FarmGuideTeam,
  FarmGuideTeamMember,
  OptionalTeams,
  FarmGuideDataSubPart,
  SubPartSelectionMode,
} from "../model/farm-guide";
import { Player } from "../model/player";
import { getPlayerGLs } from "./characterutils.";

export interface CharacterRecommendationParams {
  part: FarmGuideDataPart;
  characters: Character[];
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
  const preferredTeamsToFarm = optionalTeams.teams.filter((t) => t.isPreferred);
  console.log("preferredTeamsToFarm", preferredTeamsToFarm);
  preferredTeamsToFarm.forEach((team) => {
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

const getPartsWithRecommendedGL = (
  subPart: FarmGuideDataSubPart,
  characters: Character[]
): FarmGuideDataPart[] => {
  console.log("getPartsWithRecommendedGL subPart", subPart);
  return (
    subPart.subParts.filter((p) => {
      return (
        p.teamParts.findIndex((tp) => {
          const team = tp as FarmGuideTeam;
          console.log("teamPart team", team);
          return (
            team.isPreferred &&
            team.members?.some((member) => {
              const char = characters.find((c) => c.base_id === member.id);
              return char?.isGalacticLegend ?? false;
            })
          );
        }) !== -1
      );
    }) ?? subPart.subParts[0]
  );
};

const getPartsWithPlayerGLs = (
  subPart: FarmGuideDataSubPart,
  player: Player
): FarmGuideDataPart[] => {
  const playerGLs = getPlayerGLs(player);
  console.log("getPartsWithPlayerGLs playerGLs", playerGLs);
  return subPart.subParts.filter((p) => {
    return (
      p.teamParts.findIndex((tp) => {
        const team = tp as FarmGuideTeam;
        console.log("team", team);
        const inTeam = team.members?.some((member) => {
          return playerGLs.some((c) => c.base_id === member.id);
        });

        if (inTeam) return true;
        console.log("Not in team, checking optional teams");

        if (team.optionalTeams) {
          return team.optionalTeams.teams.some((t) => {
            return t.members?.some((member) => {
              console.log("Chekcing member in optional team", member);
              return playerGLs.some((c) => c.base_id === member.id);
            });
          });
        }

        return false;
      }) !== -1
    );
  });
};

const getRecommendedCharacterFromPart = (
  params: CharacterRecommendationParams
): FarmGuideTeamMember[] => {
  const { part, recommendedCharacters, player, characters } = params;

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
      console.log("teams is sub part");
      const subPart = team as FarmGuideDataSubPart;
      const selectionMode = subPart.selectionMode as SubPartSelectionMode;
      if (selectionMode === "findFirstNonFinishedTeam") {
        console.log("selectionMode is findFirstNonFinishedTeam");
        (team as FarmGuideDataSubPart).subParts.forEach((subPart) => {
          console.log("subPart", subPart);
          newRecommendedCharacters = getRecommendedCharacterFromPart({
            ...params,
            part: subPart,
            recommendedCharacters: newRecommendedCharacters,
          });
          console.log(
            "newRecommendedCharacters for subPart",
            subPart.id,
            newRecommendedCharacters
          );

          if (newRecommendedCharacters.length >= MAX_RECOMMENDED_CHARACTERS)
            return newRecommendedCharacters;
        });
      } else if (selectionMode === "pickExistingGL") {
        console.log("selectionMode is pickExistingGL");
        const playerGLs = getPlayerGLs(player);
        console.log("playerGLs", playerGLs);

        if (!playerGLs) {
          const partWithRecommendedGL = getPartsWithRecommendedGL(
            subPart,
            characters
          )[0];

          return getRecommendedCharacterFromPart({
            ...params,
            part: partWithRecommendedGL,
            recommendedCharacters: newRecommendedCharacters,
          });
        } else {
          const partsWithPlayerGLs = getPartsWithPlayerGLs(subPart, player);

          if (partsWithPlayerGLs.length > 0) {
            for (const partWithPlayerGLs of partsWithPlayerGLs) {
              newRecommendedCharacters = getRecommendedCharacterFromPart({
                ...params,
                part: partWithPlayerGLs,
                recommendedCharacters: newRecommendedCharacters,
              });

              if (newRecommendedCharacters.length >= MAX_RECOMMENDED_CHARACTERS)
                return newRecommendedCharacters;
            }
          }
        }
      }
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
  farmGuideData: FarmGuideDataPart[],
  characters: Character[]
): FarmGuideTeamMember[] => {
  let recommendedCharacters: FarmGuideTeamMember[] = [];
  for (const part of farmGuideData) {
    console.log("looking at part", part.name);
    recommendedCharacters = getRecommendedCharacterFromPart({
      recommendedCharacters,
      part,
      player,
      characters,
    });

    if (recommendedCharacters.length >= MAX_RECOMMENDED_CHARACTERS) break;
  }

  return recommendedCharacters;
};
