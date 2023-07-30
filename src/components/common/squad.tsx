import { useContext, useEffect, useState } from 'react'
import type { Character } from '../../model/character'
import type { FarmGuideTeam } from '../../model/farm-guide'
import { CharacterContext } from '../../contexts/CharactersContext'
import SquadMember from '../squad/squad-member'

interface SquadProps {
  team: FarmGuideTeam
}

const Squad: React.FC<SquadProps> = (props) => {
  const { team } = props

  return (
    <div
      className={`bg-white p-2 flex flex-col gap-2 w-squad rounded-lg ${
        team.highlight && 'border-4 border-green-400'
      }`}
    >
      <h4 className="font-bold text-center text-xl">{team.name}</h4>
      {team.members?.map((teamMember) => (
        <SquadMember key={teamMember.id} farmGuideTeamMember={teamMember} />
      ))}
      {team.notes && <p className="text-sm">{team.notes}</p>}
    </div>
  )
}

export default Squad
