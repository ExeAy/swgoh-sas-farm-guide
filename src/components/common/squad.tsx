import { useContext, useEffect, useState } from 'react'
import type { Character } from '../../model/character'
import type { FarmGuideTeam } from '../../model/farm-guide'
import { CharacterContext } from '../../contexts/CharactersContext'

interface SquadProps {
  team: FarmGuideTeam
}

const Squad: React.FC<SquadProps> = (props) => {
  const [teamMembers, setTeamMembers] = useState<Character[]>([])
  const characters = useContext(CharacterContext)
  const { team } = props

  useEffect(() => {
    const members = characters.filter((character) =>
      team.members.some((member) => member.id === character.base_id),
    )
    setTeamMembers(members)
  }, [team])

  return (
    <div className="bg-white p-2 flex flex-col">
      {teamMembers.map((member) => (
        <div className="flex gap-1">
          <img src={member.image} alt={member.name} />
          <span>{member.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Squad
