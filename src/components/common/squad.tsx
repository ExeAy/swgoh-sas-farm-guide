import { useContext, useEffect, useState } from 'react'
import type { Character } from '../../model/character'
import type { FarmGuideTeam } from '../../model/farm-guide'
import { CharacterContext } from '../../contexts/CharactersContext'
import SquadMember from '../squad/squad-member'

interface SquadProps {
  team: FarmGuideTeam
}

const Squad: React.FC<SquadProps> = (props) => {
  const [teamMembers, setTeamMembers] = useState<Character[]>([])
  const characters = useContext(CharacterContext)
  const { team } = props

  useEffect(() => {
    const members = team.members!.map(
      (member) =>
        characters.find((character) => character.base_id === member.id)!,
    )
    setTeamMembers(members)
  }, [team])

  return (
    <div className="bg-white p-2 flex flex-col gap-2 w-squad">
      <h4 className="font-bold text-center text-xl">{team.name}</h4>
      {teamMembers.map((member) => (
        <SquadMember key={member?.base_id} character={member} team={team} />
      ))}
      {team.notes && <p className="text-xs">{team.notes}</p>}
    </div>
  )
}

export default Squad
