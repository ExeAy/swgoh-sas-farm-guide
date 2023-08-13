import { Player } from "../../../model/player";
import usePrioritizedCharacters from "../../../hooks/usePrioCharacters";
import SquadMember from "../../squad/squad-member";

interface CharactersSuggestionsProps {
  player?: Player;
}

const CharactersSuggestions: React.FC<CharactersSuggestionsProps> = (props) => {
  const { player } = props;

  const charactersToFarm = usePrioritizedCharacters(player);

  if (!player) {
    return null;
  }

  return (
    <div className="p-4 bg-indigo-300 w-fit rounded">
      <h2 className="text-2xl font-bold">Farmförslag för {player.name}</h2>
      <div className="flex flex-col gap-2">
        {charactersToFarm.map((character) => (
          <SquadMember key={character.id} farmGuideTeamMember={character} />
        ))}
      </div>
    </div>
  );
};

export default CharactersSuggestions;
