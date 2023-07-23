import { useState, useEffect } from 'react'
import type { Character } from '../../model/character'
import type { FarmGuideTeam, FarmGuideTeamMember } from '../../model/farm-guide'
import Ability from './ability'
import RequiredGear from './gear'

interface SquadMemberProps {
  character: Character
  team: FarmGuideTeam
  color: string
}

const SquadMember: React.FC<SquadMemberProps> = (props) => {
  const { character, team, color } = props
  const [farmGuideTeamMember, setFarmGuideTeamMember] =
    useState<FarmGuideTeamMember>()

  useEffect(() => {
    const member = team.members.find(
      (member) => member.id === character.base_id,
    )
    setFarmGuideTeamMember(member)
  }, [team, character])

  if (!farmGuideTeamMember) {
    return null
  }

  return (
    <div className="flex gap-1 items-center">
      <a href={character.url}>
        <img src={character.image} alt={character.name} className="w-15" />
      </a>
      <div className="flex flex-col justify-start">
        <span className="mb-1 leading-none">{character.name}</span>
        <RequiredGear teamMember={farmGuideTeamMember} />
        {farmGuideTeamMember.zetas?.length
          ? farmGuideTeamMember.zetas.map((zeta) => (
              <Ability farmGuideAbility={zeta} />
            ))
          : null}
        {farmGuideTeamMember.omicrons?.length
          ? farmGuideTeamMember.omicrons.map((omi) => (
              <Ability farmGuideAbility={omi} />
            ))
          : null}
      </div>
    </div>
  )
}

export default SquadMember
