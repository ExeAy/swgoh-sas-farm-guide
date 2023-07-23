import { useContext, useEffect, useState } from 'react'
import type { Character } from '../../model/character'
import type { FarmGuideTeam } from '../../model/farm-guide'
import { CharacterContext } from '../../contexts/CharactersContext'
import SquadMember from '../squad/squad-member'

interface SquadProps {
  team: FarmGuideTeam
  color: string
}

const Squad: React.FC<SquadProps> = (props) => {
  const [teamMembers, setTeamMembers] = useState<Character[]>([])
  const characters = useContext(CharacterContext)
  const { team, color } = props

  useEffect(() => {
    const members = characters.filter((character) =>
      team.members.some((member) => member.id === character.base_id),
    )
    setTeamMembers(members)
  }, [team])

  return (
    <div className="bg-white p-2 flex flex-col gap-2">
      {teamMembers.map((member) => (
        <SquadMember
          key={member.base_id}
          character={member}
          team={team}
          color={color}
        />
      ))}
    </div>
  )
}

export default Squad
