import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { FarmGuideDataPart, FarmGuideTeam } from "../model/farm-guide";
import Squad from "./squad/squad";
import NoteBlock from "./common/notes";

interface TeamGroupProps {
  team: FarmGuideTeam;
  allTeams: (FarmGuideTeam | FarmGuideDataPart[])[];
  color: string;
  index: number;
}

const TeamGroup = (props: TeamGroupProps) => {
  const { team, index, color, allTeams } = props;

  if (!team.members && !team.optionalTeams && team.notes) {
    return (
      <div className="m-3 p-3 bg-white rounded-lg w-squad">
        {team.name && <h2 className="font-bold text-xl">{team.name}</h2>}
        <NoteBlock notes={team.notes} />
      </div>
    );
  }

  const elements: JSX.Element[] = [];

  if (index !== 0 && !Array.isArray(allTeams[index - 1])) {
    const previousTeam = allTeams[index - 1] as FarmGuideTeam;

    if (
      previousTeam.withArrowAfter !== false &&
      (previousTeam.optionalTeams || previousTeam.members)
    )
      elements.push(
        <ArrowForwardIcon key={`arrow-${team.id}`} sx={{ fontSize: 50 }} />
      );
  }

  if (team.optionalTeams) {
    elements.push(
      <div
        key={team.id}
        className={`flex flex-col p-4 gap-2 bg-${color}-500 rounded-md w-fit`}
      >
        <h4 className="font-bold text-center text-xl text-white">
          {team.name}
        </h4>
        <div className="grid grid-rows-2 gap-2 grid-flow-col">
          {team.optionalTeams.map((subTeam) => (
            <Squad key={subTeam.id} team={subTeam} />
          ))}
        </div>
        <div>
          <div
            className={`text-white ${
              team.optionalTeams.length > 2
                ? "max-w-squad-container-text"
                : "max-w-squad-card-text"
            }`}
          >
            <NoteBlock notes={team.notes} />
          </div>
        </div>
      </div>
    );
  } else {
    elements.push(<Squad key={team.id} team={team} />);
  }

  if (team.withArrowAfter) {
    elements.push(
      <ArrowForwardIcon key={`arrow-${team.id}-after`} sx={{ fontSize: 50 }} />
    );
  }

  return <div className="flex items-center gap-1">{elements}</div>;
};

export default TeamGroup;
