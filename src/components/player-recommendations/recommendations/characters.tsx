import { useEffect, useState } from "react"
import { Player } from "../../../model/player"
import { FarmGuideTeamMember } from "../../../model/farm-guide"
import { getCharacterRecommendation } from "../../../actions/player.actions"
import SquadMember from "../../squad/squad-member"

interface CharactersSuggestionsProps {
  player?: Player
}

const CharactersSuggestions: React.FC<CharactersSuggestionsProps> = (props) => {
  const { player } = props
  const [recommendedCharacters, setRecommendedCharacters] = useState<
    FarmGuideTeamMember[]
  >([])

  useEffect(() => {
    const getRecommendedCharacters = async () => {
      if (!player) return

      const chars = await getCharacterRecommendation(player.allyCode)
      setRecommendedCharacters(chars)
    }

    getRecommendedCharacters()
  }, [player])

  if (!player) {
    return null
  }

  return (
    <div className="p-4 bg-indigo-300 w-fit rounded">
      <h2 className="text-2xl font-bold">Farmförslag för {player.name}</h2>
      <div className="flex flex-col gap-2">
        {" "}
        {recommendedCharacters.map((character) => (
          <SquadMember key={character.id} farmGuideTeamMember={character} />
        ))}
      </div>
    </div>
  )
}

export default CharactersSuggestions
