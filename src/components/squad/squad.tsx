import type { FarmGuideTeam } from "../../model/farm-guide";
import SquadMember from "./squad-member";
import NoteBlock from "../common/notes";

interface SquadProps {
  team: FarmGuideTeam;
}

const Squad: React.FC<SquadProps> = (props) => {
  const { team } = props;

  return (
    <div
      className={`bg-white p-2 flex flex-col gap-2 w-squad rounded-lg ${
        team.highlight && "border-4 border-green-400"
      }`}
    >
      <h4 className="font-bold text-center text-xl">{team.name}</h4>
      {team.members?.map((teamMember) => (
        <SquadMember
          key={teamMember.id + teamMember.name}
          farmGuideTeamMember={teamMember}
        />
      ))}
      {team.notes && <NoteBlock notes={team.notes} />}
    </div>
  );
};

export default Squad;
