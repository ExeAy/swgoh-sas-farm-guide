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
import { characterIsGalacticLegend, getPlayerGLs } from "./character.utils.";

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

  console.log(
    "playerCharacter, gear",
    playerCharacter?.name,
    playerCharacter?.gear_level
  );

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

const filterGLTeamsFromPart = (
  parts: FarmGuideDataPart[],
  params: CharacterRecommendationParams
): FarmGuideDataPart[] => {
  let newParts: FarmGuideDataPart[] = [];
  for (const part of parts) {
    const newTeams: FarmGuideTeam[] = [];
    for (const t of part.teamParts) {
      const team = t as FarmGuideTeam;
      if (team.members) {
        if (
          !team.members.some((member) =>
            characterIsGalacticLegend(
              params.characters.find((c) => c.base_id === member.id)
            )
          )
        ) {
          newTeams.push(team);
        }
      } else if (team.optionalTeams) {
        const newOptionalTeams: OptionalTeams = {
          ...team.optionalTeams,
          teams: [],
        };
        for (const optionalTeam of team.optionalTeams.teams) {
          if (
            !optionalTeam.members?.some((member) =>
              characterIsGalacticLegend(
                params.characters.find((c) => c.base_id === member.id)
              )
            )
          ) {
            newOptionalTeams.teams.push(optionalTeam);
          }
        }
        newTeams.push({
          ...team,
          optionalTeams: newOptionalTeams,
        });
      }
    }
    newParts.push({
      ...part,
      teamParts: newTeams,
    });
  }
  return newParts;
};

const getFinishedTeamsFromPartsWithNoSubParts = (
  partsWithPlayerGLs: FarmGuideDataPart[],
  params: CharacterRecommendationParams
): FarmGuideTeam[] => {
  let finishedTeams: FarmGuideTeam[] = [];
  for (const part of partsWithPlayerGLs) {
    for (const t of part.teamParts) {
      const team = t as FarmGuideTeam;
      if (team.members) {
        if (isTeamFinished(team, params)) {
          finishedTeams.push(team);
        }
      } else if (team.optionalTeams) {
        for (const optionalTeam of team.optionalTeams.teams) {
          if (isTeamFinished(optionalTeam, params)) {
            finishedTeams.push(optionalTeam);
          }
        }
      }
    }
  }
  return finishedTeams;
};

const getUnFinishedTeamsFromPartsWithNoSubParts = (
  partsWithPlayerGLs: FarmGuideDataPart[],
  params: CharacterRecommendationParams
): FarmGuideTeam[] => {
  let unFinishedTeams: FarmGuideTeam[] = [];
  for (const part of partsWithPlayerGLs) {
    for (const t of part.teamParts) {
      const team = t as FarmGuideTeam;
      if (team.members) {
        if (!isTeamFinished(team, params)) {
          unFinishedTeams.push(team);
        }
      } else if (team.optionalTeams) {
        for (const optionalTeam of team.optionalTeams.teams) {
          if (!isTeamFinished(optionalTeam, params)) {
            unFinishedTeams.push(optionalTeam);
          }
        }
      }
    }
  }
  return unFinishedTeams;
};

const getRecommendedCharactersFromOptionalTeams = (
  optionalTeams: OptionalTeams,
  params: CharacterRecommendationParams
): FarmGuideTeamMember[] => {
  const { recommendedCharacters } = params;

  let numberOfFinishedTeams = 0;
  for (const optionalTeam of optionalTeams.teams) {
    if (numberOfFinishedTeams >= optionalTeams.minimumTeamsToFarm) break;

    if (isTeamFinished(optionalTeam, params)) {
      numberOfFinishedTeams++;
      continue;
    }
  }

  if (numberOfFinishedTeams >= optionalTeams.minimumTeamsToFarm) {
    return recommendedCharacters ?? [];
  }

  let newRecommendedCharacters: FarmGuideTeamMember[] = [
    ...(recommendedCharacters ?? []),
  ];
  const preferredTeamsToFarm = optionalTeams.teams.filter((t) => t.isPreferred);

  preferredTeamsToFarm.forEach((team) => {
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
    console.log(
      "team has members",
      team.members.map((member) => member.id)
    );
    for (const member of team.members) {
      if (!isTeamMemberFinished(member, params)) {
        newRecommendedCharacters.push(member);

        if (newRecommendedCharacters.length >= MAX_RECOMMENDED_CHARACTERS)
          return newRecommendedCharacters;
      } else {
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
  return (
    subPart.subParts.filter((p) => {
      return (
        p.teamParts.findIndex((tp) => {
          const team = tp as FarmGuideTeam;

          return (
            team.isPreferred &&
            team.members?.some((member) => {
              const char = characters.find((c) => c.base_id === member.id);
              if (!char) return false;
              return characterIsGalacticLegend(char);
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
  console.log(
    "getPartsWithPlayerGLs playerGLs",
    playerGLs.map((gl) => gl.name)
  );
  return subPart.subParts.filter((p) => {
    return (
      p.teamParts.findIndex((tp) => {
        const team = tp as FarmGuideTeam;

        const inTeam = team.members?.some((member) => {
          return playerGLs.some((c) => c.base_id === member.id);
        });

        if (inTeam) return true;

        if (team.optionalTeams) {
          return team.optionalTeams.teams.some((t) => {
            return t.members?.some((member) => {
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
      recommendedCharacters.map((char) => char.id)
    );
    return recommendedCharacters;
  }

  let newRecommendedCharacters: FarmGuideTeamMember[] = [
    ...(recommendedCharacters ?? []),
  ];

  for (const team of part.teamParts) {
    if (Object.keys(team).includes("subParts")) {
      const subPart = team as FarmGuideDataSubPart;
      const selectionMode = subPart.selectionMode as SubPartSelectionMode;
      if (selectionMode === "findFirstNonFinishedTeam") {
        for (const subPart of (team as FarmGuideDataSubPart).subParts) {
          newRecommendedCharacters = getRecommendedCharacterFromPart({
            ...params,
            part: subPart,
            recommendedCharacters: newRecommendedCharacters,
          });
          console.log(
            "newRecommendedCharacters for subPart",
            subPart.id,
            newRecommendedCharacters.map((char) => char.id)
          );
          if (newRecommendedCharacters.length >= MAX_RECOMMENDED_CHARACTERS)
            break;
        }
      } else if (selectionMode === "pickExistingGL") {
        const playerGLs = getPlayerGLs(player);
        console.log(
          "playerGLs",
          playerGLs.map((gl) => gl.name)
        );

        if (!playerGLs || playerGLs.length === 0) {
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
          console.log(
            "partsWithPlayerGLs",
            partsWithPlayerGLs.map((p) => p.name)
          );

          const partsWithoutGLs = filterGLTeamsFromPart(
            partsWithPlayerGLs,
            params
          );
          console.log(
            "partsWithoutGLs",
            partsWithoutGLs.map((p) => p.teamParts.map)
          );

          if (partsWithoutGLs.length > 0) {
            // Check if any raid team is finished
            const finishedTeams: FarmGuideTeam[] =
              getFinishedTeamsFromPartsWithNoSubParts(partsWithoutGLs, params);
            console.log(
              "finishedTeams in raid section",
              finishedTeams.map((t) => t.id)
            );

            if (finishedTeams.length > 0) break;

            const unfinishedTeams: FarmGuideTeam[] =
              getUnFinishedTeamsFromPartsWithNoSubParts(
                partsWithoutGLs,
                params
              );
            console.log(
              "Looking after unfinished teams",
              unfinishedTeams.map((t) => t.id)
            );

            const preferredTeam = unfinishedTeams.find((t) => t.isPreferred);

            if (preferredTeam)
              return getRecommendedCharactersFromTeam(preferredTeam, params);

            return getRecommendedCharactersFromTeam(unfinishedTeams[0], params);
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
        team.id,
        newRecommendedCharacters.map((char) => char.id)
      );
    }
    if (newRecommendedCharacters.length >= MAX_RECOMMENDED_CHARACTERS) break;
  }

  return newRecommendedCharacters;
};

export const getRecommendedCharacters = (
  player: Player,
  farmGuideData: FarmGuideDataPart[],
  characters: Character[]
): FarmGuideTeamMember[] => {
  let recommendedCharacters: FarmGuideTeamMember[] = [];
  for (const part of farmGuideData) {
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
